"""
Project Model

Represents a project that groups related scans and work.
"""

from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


class Project(Base):
    """
    Project model.
    
    Groups related scans and artifacts together.
    """
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True)  # Clerk user ID
    
    # Project details
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Related scans
    scans = relationship("Scan", back_populates="project", lazy="selectin")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Project {self.id} ({self.name})>"
