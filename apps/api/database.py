"""
Database Configuration

Async SQLAlchemy setup for PostgreSQL.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator

from config import settings


# Convert sync URL to async
def get_async_database_url(url: str) -> str:
    """Convert postgresql:// to postgresql+asyncpg://"""
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


# Create async engine
engine = create_async_engine(
    get_async_database_url(settings.database_url),
    echo=settings.environment == "development",
    pool_pre_ping=True,
)

# Session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# Base class for models
class Base(DeclarativeBase):
    """Base class for all database models."""
    pass


async def init_db():
    """Initialize database tables."""
    async with engine.begin() as conn:
        # Import models to register them
        from models import scan, project, user  # noqa
        
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency for getting database sessions.
    
    Usage:
        @app.get("/items")
        async def get_items(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
