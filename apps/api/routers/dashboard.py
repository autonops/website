"""
Dashboard Router

Aggregated data for the dashboard home page.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta

from database import get_db
from models import Scan, ToolType
from services.auth import get_current_user_id

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class ComplianceStatus(BaseModel):
    """Compliance status for a framework."""
    framework: str
    status: str  # compliant, non_compliant, partial


class DashboardStats(BaseModel):
    """Dashboard statistics."""
    resources_monitored: int
    security_score: int
    security_grade: str
    compliance_status: List[ComplianceStatus]
    active_migrations: int
    scans_this_week: int
    issues_resolved: int


class Recommendation(BaseModel):
    """A recommended action."""
    id: str
    type: str  # security, compliance, migration, optimization
    title: str
    description: str
    severity: str
    tool: str
    action_url: str


# =============================================================================
# Endpoints
# =============================================================================

@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Get aggregated statistics for the dashboard.
    
    Calculates stats from recent scans.
    """
    # Get scans from the last week
    week_ago = datetime.utcnow() - timedelta(days=7)
    
    query = select(Scan).where(
        Scan.user_id == user_id,
        Scan.created_at >= week_ago,
    )
    result = await db.execute(query)
    recent_scans = result.scalars().all()
    
    # Calculate stats
    total_resources = 0
    total_issues = 0
    critical_issues = 0
    active_migrations = 0
    
    for scan in recent_scans:
        summary = scan.summary or {}
        total_resources += summary.get("resources_scanned", 0)
        total_issues += summary.get("issues_found", 0)
        critical_issues += summary.get("critical", 0)
        
        if scan.tool == ToolType.MIGRATE and scan.status.value == "in_progress":
            active_migrations += 1
    
    # Calculate security score (simple algorithm)
    if total_resources > 0:
        issue_ratio = total_issues / total_resources
        security_score = max(0, min(100, int((1 - issue_ratio) * 100)))
    else:
        security_score = 100
    
    # Determine grade
    if security_score >= 90:
        grade = "A"
    elif security_score >= 80:
        grade = "B+"
    elif security_score >= 70:
        grade = "B"
    elif security_score >= 60:
        grade = "C"
    else:
        grade = "D"
    
    return DashboardStats(
        resources_monitored=total_resources,
        security_score=security_score,
        security_grade=grade,
        compliance_status=[
            ComplianceStatus(framework="SOC2", status="compliant"),
        ],
        active_migrations=active_migrations,
        scans_this_week=len(recent_scans),
        issues_resolved=0,  # TODO: Track resolved issues
    )


@router.get("/recommendations", response_model=List[Recommendation])
async def get_recommendations(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """
    Get recommended actions based on recent scans.
    
    Analyzes scan results to suggest next steps.
    """
    recommendations = []
    
    # Get latest scan of each type
    for tool in ToolType:
        query = select(Scan).where(
            Scan.user_id == user_id,
            Scan.tool == tool,
        ).order_by(Scan.created_at.desc()).limit(1)
        
        result = await db.execute(query)
        scan = result.scalar_one_or_none()
        
        if scan:
            summary = scan.summary or {}
            critical = summary.get("critical", 0)
            
            if critical > 0:
                recommendations.append(Recommendation(
                    id=f"critical-{scan.id}",
                    type="security",
                    title=f"{critical} critical issues in {tool.value}",
                    description="These issues need immediate attention",
                    severity="critical",
                    tool=tool.value,
                    action_url=f"/{tool.value}/{scan.id}",
                ))
    
    # Add generic recommendations if no critical issues
    if not recommendations:
        recommendations.append(Recommendation(
            id="run-verify",
            type="security",
            title="Run a security scan",
            description="Keep your infrastructure secure with regular scans",
            severity="low",
            tool="verify",
            action_url="/verify",
        ))
    
    return recommendations[:5]  # Limit to 5 recommendations
