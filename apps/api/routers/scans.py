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
import uuid

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


class ScanCreate(BaseModel):
    """Schema for creating a new scan."""
    tool: str
    provider: str
    region: Optional[str] = None
    status: str = "completed"
    summary: ScanSummary
    findings: List[Finding] = []
    project_id: Optional[str] = None


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

@router.post("", response_model=ScanResponse, status_code=201)
async def create_scan(
    scan_data: ScanCreate,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Create a new scan result.
    
    Used by the CLI to sync scan results to the dashboard.
    """
    # Validate tool type
    try:
        tool_type = ToolType(scan_data.tool)
    except ValueError:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid tool: {scan_data.tool}. Valid tools: {[t.value for t in ToolType]}"
        )
    
    # Validate status
    try:
        status = ScanStatus(scan_data.status)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status: {scan_data.status}. Valid statuses: {[s.value for s in ScanStatus]}"
        )
    
    # Create scan
    scan = Scan(
        id=str(uuid.uuid4()),
        user_id=user_id,
        tool=tool_type,
        provider=scan_data.provider,
        region=scan_data.region,
        status=status,
        summary=scan_data.summary.model_dump(),
        findings=[f.model_dump() for f in scan_data.findings],
        project_id=scan_data.project_id,
    )
    
    db.add(scan)
    await db.commit()
    await db.refresh(scan)
    
    return ScanResponse(
        id=scan.id,
        tool=scan.tool.value,
        provider=scan.provider,
        region=scan.region,
        status=scan.status.value,
        summary=ScanSummary(**scan.summary),
        findings=[Finding(**f) for f in scan.findings],
        project_id=scan.project_id,
        created_at=scan.created_at,
        updated_at=scan.updated_at,
    )


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
        scans=[
            ScanResponse(
                id=s.id,
                tool=s.tool.value,
                provider=s.provider,
                region=s.region,
                status=s.status.value,
                summary=ScanSummary(**s.summary) if s.summary else ScanSummary(),
                findings=[Finding(**f) for f in (s.findings or [])],
                project_id=s.project_id,
                created_at=s.created_at,
                updated_at=s.updated_at,
            )
            for s in scans
        ],
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
    
    return ScanResponse(
        id=scan.id,
        tool=scan.tool.value,
        provider=scan.provider,
        region=scan.region,
        status=scan.status.value,
        summary=ScanSummary(**scan.summary) if scan.summary else ScanSummary(),
        findings=[Finding(**f) for f in (scan.findings or [])],
        project_id=scan.project_id,
        created_at=scan.created_at,
        updated_at=scan.updated_at,
    )


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
