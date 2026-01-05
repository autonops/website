"""
Users Router

Handles user creation and retrieval.
Called by dashboard after Clerk authentication.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta, timezone
import secrets

from database import get_db
from models import User

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class UserMeRequest(BaseModel):
    """Request body for creating/updating current user."""
    clerk_id: str
    email: str
    name: Optional[str] = None


class UserMeResponse(BaseModel):
    """Response for current user."""
    id: str
    clerk_id: str
    email: str
    name: Optional[str]
    api_key: str
    tier: str
    trial_started_at: Optional[datetime]
    trial_ends_at: Optional[datetime]
    trial_days_remaining: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# =============================================================================
# Helper Functions
# =============================================================================

def generate_api_key() -> str:
    """Generate a secure API key."""
    return f"iq_{secrets.token_urlsafe(32)}"


# =============================================================================
# Endpoints
# =============================================================================

@router.post("/me", response_model=UserMeResponse)
async def upsert_current_user(
    request: UserMeRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Create or update the current user.
    
    Called by the dashboard after Clerk sign-in.
    If user exists, returns existing data.
    If new user, creates with trial and API key.
    """
    # Check if user exists by clerk_id
    query = select(User).where(User.clerk_id == request.clerk_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if user:
        # Update email/name if changed
        if user.email != request.email:
            user.email = request.email
        if request.name and user.name != request.name:
            user.name = request.name
        await db.commit()
        await db.refresh(user)
    else:
        # Create new user with trial (timezone-aware)
        now = datetime.now(timezone.utc)
        user = User(
            clerk_id=request.clerk_id,
            email=request.email,
            name=request.name,
            api_key=generate_api_key(),
            tier="trial",
            trial_started_at=now,
            trial_ends_at=now + timedelta(days=30),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    return UserMeResponse(
        id=str(user.id),
        clerk_id=user.clerk_id,
        email=user.email,
        name=user.name,
        api_key=user.api_key,
        tier=user.tier,
        trial_started_at=user.trial_started_at,
        trial_ends_at=user.trial_ends_at,
        trial_days_remaining=user.trial_days_remaining,
        created_at=user.created_at,
    )


@router.get("/me", response_model=UserMeResponse)
async def get_current_user(
    clerk_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get the current user by Clerk ID.
    
    Used by dashboard to fetch user data.
    """
    query = select(User).where(User.clerk_id == clerk_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserMeResponse(
        id=str(user.id),
        clerk_id=user.clerk_id,
        email=user.email,
        name=user.name,
        api_key=user.api_key,
        tier=user.tier,
        trial_started_at=user.trial_started_at,
        trial_ends_at=user.trial_ends_at,
        trial_days_remaining=user.trial_days_remaining,
        created_at=user.created_at,
    )
