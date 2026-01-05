"""
License Router

Handles license-related operations for user accounts.
Receives updates from License Server when users purchase licenses.
"""

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
import os
import secrets
import logging

from database import get_db
from models import User

logger = logging.getLogger(__name__)
router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class LicenseUpdateRequest(BaseModel):
    """Request from License Server when a license is created/updated."""
    email: str
    license_key: str
    tier: str  # pro, team, enterprise
    expires_at: Optional[str] = None


class LicenseStatusResponse(BaseModel):
    """Response with user's license status."""
    email: str
    tier: str
    license_key: Optional[str] = None
    expires_at: Optional[str] = None
    is_active: bool


# =============================================================================
# Internal Auth
# =============================================================================

def verify_internal_key(x_internal_key: Optional[str] = Header(None)) -> bool:
    """Verify the internal API key from License Server."""
    expected_key = os.environ.get("INTERNAL_SERVICE_KEY")
    if not expected_key:
        logger.warning("INTERNAL_SERVICE_KEY not configured")
        return False
    if not x_internal_key:
        return False
    return secrets.compare_digest(x_internal_key, expected_key)


# =============================================================================
# Endpoints
# =============================================================================

@router.post("/license-update")
async def receive_license_update(
    request: LicenseUpdateRequest,
    x_internal_key: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """
    Receive license update from License Server.
    
    Called by License Server's Stripe webhook after a purchase.
    Updates the user's tier in our database.
    """
    if not verify_internal_key(x_internal_key):
        raise HTTPException(status_code=401, detail="Invalid internal key")
    
    # Find user by email (case-insensitive)
    email = request.email.lower()
    query = select(User).where(User.email == email)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        # User doesn't exist yet - they'll get updated on first dashboard sign-in
        # We could store pending upgrades in a separate table, but for now just log
        logger.info(f"License update for unknown user: {email} -> {request.tier}")
        return {
            "status": "pending",
            "message": "User not found - will be updated on first sign-in",
            "email": email,
            "tier": request.tier
        }
    
    # Update user's tier
    old_tier = user.tier
    user.tier = request.tier
    
    # Clear trial dates since they now have a paid license
    user.trial_started_at = None
    user.trial_ends_at = None
    
    await db.commit()
    await db.refresh(user)
    
    logger.info(f"Updated user {email}: {old_tier} -> {request.tier}, license={request.license_key}")
    
    return {
        "status": "updated",
        "email": email,
        "tier": request.tier,
        "previous_tier": old_tier,
        "user_id": str(user.id)
    }


@router.get("/license-status")
async def get_license_status(
    email: str,
    x_internal_key: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """
    Get a user's license status.
    
    Can be called by License Server to check if a user exists
    and what their current tier is.
    """
    if not verify_internal_key(x_internal_key):
        raise HTTPException(status_code=401, detail="Invalid internal key")
    
    # Find user by email (case-insensitive)
    query = select(User).where(User.email == email.lower())
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Determine if license is active
    is_active = False
    if user.tier in ("pro", "team", "enterprise"):
        is_active = True
    elif user.tier == "trial" and user.is_trial_active:
        is_active = True
    
    return LicenseStatusResponse(
        email=user.email,
        tier=user.tier,
        license_key=None,  # We don't store the key, just the tier
        expires_at=user.trial_ends_at.isoformat() if user.trial_ends_at else None,
        is_active=is_active
    )
