"""
InfraIQ API Server

Backend API for the InfraIQ Web Dashboard.
Handles scan data, projects, licensing, and Stripe webhooks.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from config import settings
from database import init_db
from routers import scans, projects, license, sync, webhooks, dashboard

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events.
    Runs on startup and shutdown.
    """
    # Startup
    logger.info("Starting InfraIQ API...")
    await init_db()
    logger.info("Database initialized")
    
    yield
    
    # Shutdown
    logger.info("Shutting down InfraIQ API...")


# Create FastAPI application
app = FastAPI(
    title="InfraIQ API",
    description="Backend API for the InfraIQ Web Dashboard",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.environment == "development" else None,
    redoc_url="/redoc" if settings.environment == "development" else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment": settings.environment,
    }


# Include routers
app.include_router(scans.router, prefix="/api/scans", tags=["scans"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(license.router, prefix="/api/license", tags=["license"])
app.include_router(sync.router, prefix="/api/sync", tags=["sync"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.environment == "development",
    )
