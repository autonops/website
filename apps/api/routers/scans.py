"""
Scans Router

CRUD operations for scan results.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import Scan, ToolType, ScanStatus
from services.auth import get_current_user_id

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class ScanSummary(BaseModel):
    """Scan summary statistics."""
    resources_scanned: int = 0
    issues_found: int = 0
    critical: int = 0
    high: int = 0
    medium: int = 0
    low: int = 0


class Finding(BaseModel):
    """A single finding from a scan."""
    id: str
    resource_type: str
    resource_id: str
    issue: str
    severity: str
    remediation: str


class ScanResponse(BaseModel):
    """Scan response model."""
    id: str
    tool: str
    provider: str
    region: Optional[str]
    status: str
    summary: ScanSummary
    findings: List[Finding]
    project_id: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class ScanListResponse(BaseModel):
    """Paginated scan list response."""
    scans: List[ScanResponse]
    total: int
    limit: int
    offset: int


# =============================================================================
# Endpoints
# =============================================================================

@router.get("", response_model=ScanListResponse)
async def list_scans(
    tool: Optional[str] = Query(None, description="Filter by tool"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    List all scans for the current user.
    
    Supports filtering by tool and pagination.
    """
    # Build query
    query = select(Scan).where(Scan.user_id == user_id)
    
    if tool:
        try:
            tool_type = ToolType(tool)
            query = query.where(Scan.tool == tool_type)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid tool: {tool}")
    
    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query)
    
    # Get paginated results
    query = query.order_by(Scan.created_at.desc()).limit(limit).offset(offset)
    result = await db.execute(query)
    scans = result.scalars().all()
    
    return ScanListResponse(
        scans=[ScanResponse.model_validate(s) for s in scans],
        total=total or 0,
        limit=limit,
        offset=offset,
    )


@router.get("/{scan_id}", response_model=ScanResponse)
async def get_scan(
    scan_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Get a single scan by ID."""
    query = select(Scan).where(Scan.id == scan_id, Scan.user_id == user_id)
    result = await db.execute(query)
    scan = result.scalar_one_or_none()
    
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    return ScanResponse.model_validate(scan)


@router.delete("/{scan_id}")
async def delete_scan(
    scan_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Delete a scan."""
    query = select(Scan).where(Scan.id == scan_id, Scan.user_id == user_id)
    result = await db.execute(query)
    scan = result.scalar_one_or_none()
    
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    await db.delete(scan)
    await db.commit()
    
    return {"message": "Scan deleted"}
