"""
Scan Model

Represents a scan result from the InfraIQ CLI.
"""

from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
import uuid

from database import Base


class ToolType(str, enum.Enum):
    """Available InfraIQ tools."""
    VERIFY = "verify"
    MIGRATE = "migrate"
    CODIFY = "codify"
    COMPLY = "comply"
    DATAIQ = "dataiq"
    SECUREIQ = "secureiq"
    TESSERA = "tessera"


class ScanStatus(str, enum.Enum):
    """Scan status."""
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


class Scan(Base):
    """
    Scan model.
    
    Stores scan results synced from the CLI.
    """
    __tablename__ = "scans"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True)  # Clerk user ID
    
    # Scan metadata
    tool = Column(Enum(ToolType), nullable=False, index=True)
    provider = Column(String, nullable=False)  # aws, gcp, heroku, etc.
    region = Column(String, nullable=True)
    status = Column(Enum(ScanStatus), default=ScanStatus.COMPLETED)
    
    # Summary statistics
    summary = Column(JSON, nullable=False, default=dict)
    # Expected structure:
    # {
    #     "resources_scanned": int,
    #     "issues_found": int,
    #     "critical": int,
    #     "high": int,
    #     "medium": int,
    #     "low": int
    # }
    
    # Detailed findings
    findings = Column(JSON, nullable=False, default=list)
    # Expected structure:
    # [
    #     {
    #         "id": str,
    #         "resource_type": str,
    #         "resource_id": str,
    #         "issue": str,
    #         "severity": str,
    #         "remediation": str
    #     }
    # ]
    
    # Project association (optional)
    project_id = Column(String, ForeignKey("projects.id"), nullable=True, index=True)
    project = relationship("Project", back_populates="scans")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Scan {self.id} ({self.tool.value} - {self.status.value})>"
