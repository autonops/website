"""
User Model

Stores additional user metadata not in Clerk.
Synced via Clerk webhooks.
"""

from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.sql import func

from database import Base


class User(Base):
    """
    User model.
    
    Stores user data synced from Clerk plus InfraIQ-specific data.
    """
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)  # Clerk user ID
    email = Column(String(255), nullable=False, unique=True, index=True)
    
    # Profile info from Clerk
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    
    # InfraIQ-specific
    license_key = Column(String(50), nullable=True, index=True)
    license_tier = Column(String(20), nullable=True)  # trial, pro, team, enterprise
    
    # Preferences
    preferences = Column(JSON, nullable=False, default=dict)
    # Expected structure:
    # {
    #     "default_provider": "aws",
    #     "default_region": "us-east-1",
    #     "theme": "dark",
    #     "notifications": {
    #         "email_on_scan": true,
    #         "email_on_critical": true
    #     }
    # }
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User {self.id} ({self.email})>"
