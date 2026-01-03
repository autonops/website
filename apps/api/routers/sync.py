"""
Sync Router

Handles scan data sync from the CLI.
This is the endpoint that receives data when users run `infraiq ... --sync`.
"""

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from database import get_db
from models import Scan, ToolType, ScanStatus

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class SyncFinding(BaseModel):
    """A finding in the sync payload."""
    id: str
    resource_type: str
    resource_id: str
    issue: str
    severity: str
    remediation: str


class SyncSummary(BaseModel):
    """Summary statistics in the sync payload."""
    resources_scanned: int = 0
    issues_found: int = 0
    critical: int = 0
    high: int = 0
    medium: int = 0
    low: int = 0


class SyncRequest(BaseModel):
    """
    Sync request from CLI.
    
    This is the payload sent by `infraiq ... --sync`.
    """
    tool: str
    provider: str
    region: Optional[str] = None
    status: str = "completed"
    summary: SyncSummary
    findings: List[SyncFinding] = []
    timestamp: Optional[datetime] = None


class SyncResponse(BaseModel):
    """Sync response."""
    scan_id: str
    message: str
    dashboard_url: str


# =============================================================================
# Endpoints
# =============================================================================

@router.post("", response_model=SyncResponse)
async def sync_scan(
    request: SyncRequest,
    authorization: str = Header(..., description="Bearer token with license key"),
    db: AsyncSession = Depends(get_db),
):
    """
    Receive scan data from the CLI.
    
    The CLI sends data here when the --sync flag is used.
    Authentication is via the license key in the Authorization header.
    """
    # Extract license key from Authorization header
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    license_key = authorization[7:]  # Remove "Bearer " prefix
    
    # TODO: Validate license key and get user_id
    # For now, we'll use the license key as a user identifier
    # In production, this should validate against the license server
    user_id = f"license:{license_key[:16]}"  # Temporary: use part of key as user ID
    
    # Validate tool type
    try:
        tool_type = ToolType(request.tool)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid tool: {request.tool}")
    
    # Validate status
    try:
        status = ScanStatus(request.status)
    except ValueError:
        status = ScanStatus.COMPLETED
    
    # Create scan record
    scan = Scan(
        user_id=user_id,
        tool=tool_type,
        provider=request.provider,
        region=request.region,
        status=status,
        summary=request.summary.model_dump(),
        findings=[f.model_dump() for f in request.findings],
    )
    
    db.add(scan)
    await db.commit()
    await db.refresh(scan)
    
    return SyncResponse(
        scan_id=scan.id,
        message="Scan synced successfully",
        dashboard_url=f"https://app.autonops.io/{request.tool}/{scan.id}",
    )


@router.get("/status")
async def sync_status():
    """
    Check sync endpoint status.
    
    Used by CLI to verify connectivity before syncing.
    """
    return {
        "status": "ok",
        "message": "Sync endpoint is available",
        "version": "0.1.0",
    }
