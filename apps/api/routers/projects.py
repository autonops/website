"""
Projects Router

CRUD operations for projects.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import Project
from services.auth import get_current_user_id

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class CreateProjectRequest(BaseModel):
    """Create project request."""
    name: str
    description: Optional[str] = None


class UpdateProjectRequest(BaseModel):
    """Update project request."""
    name: Optional[str] = None
    description: Optional[str] = None


class ProjectResponse(BaseModel):
    """Project response model."""
    id: str
    name: str
    description: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


# =============================================================================
# Endpoints
# =============================================================================

@router.get("", response_model=List[ProjectResponse])
async def list_projects(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """List all projects for the current user."""
    query = select(Project).where(Project.user_id == user_id).order_by(Project.created_at.desc())
    result = await db.execute(query)
    projects = result.scalars().all()
    
    return [ProjectResponse.model_validate(p) for p in projects]


@router.post("", response_model=ProjectResponse)
async def create_project(
    request: CreateProjectRequest,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Create a new project."""
    project = Project(
        user_id=user_id,
        name=request.name,
        description=request.description,
    )
    
    db.add(project)
    await db.commit()
    await db.refresh(project)
    
    return ProjectResponse.model_validate(project)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Get a single project by ID."""
    query = select(Project).where(Project.id == project_id, Project.user_id == user_id)
    result = await db.execute(query)
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return ProjectResponse.model_validate(project)


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    request: UpdateProjectRequest,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Update a project."""
    query = select(Project).where(Project.id == project_id, Project.user_id == user_id)
    result = await db.execute(query)
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if request.name is not None:
        project.name = request.name
    if request.description is not None:
        project.description = request.description
    
    await db.commit()
    await db.refresh(project)
    
    return ProjectResponse.model_validate(project)


@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Delete a project."""
    query = select(Project).where(Project.id == project_id, Project.user_id == user_id)
    result = await db.execute(query)
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await db.delete(project)
    await db.commit()
    
    return {"message": "Project deleted"}
