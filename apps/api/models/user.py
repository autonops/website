"""
User Model

Matches the Phase 1 schema in infraiq-db.
"""

from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from datetime import datetime, timezone
import uuid as uuid_module

from database import Base


class User(Base):
    """
    User model - synced from Clerk with InfraIQ-specific data.
    """
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid_module.uuid4)
    clerk_id = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    name = Column(String(255), nullable=True)
    api_key = Column(String(64), unique=True, nullable=True, index=True)
    tier = Column(String(20), nullable=False, default="trial")  # trial, pro, team, enterprise
    trial_started_at = Column(DateTime(timezone=True), nullable=True)
    trial_ends_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User {self.clerk_id} ({self.email})>"
    
    @property
    def is_trial_active(self) -> bool:
        """Check if trial is still active."""
        if self.tier != "trial":
            return False
        if not self.trial_ends_at:
            return False
        return datetime.now(timezone.utc) < self.trial_ends_at
    
    @property
    def trial_days_remaining(self) -> int:
        """Get remaining trial days."""
        if not self.trial_ends_at:
            return 0
        remaining = self.trial_ends_at - datetime.now(timezone.utc)
        return max(0, remaining.days)
