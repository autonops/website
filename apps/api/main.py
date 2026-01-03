"""
InfraIQ API Server

Backend API for the InfraIQ Web Dashboard.
Handles scan data, projects, licensing, and Stripe webhooks.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os

from config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Track if database is available
db_available = False


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events.
    Runs on startup and shutdown.
    """
    global db_available
    
    # Startup
    logger.info("Starting InfraIQ API...")
    
    # Only initialize DB if DATABASE_URL is set
    if os.getenv("DATABASE_URL"):
        try:
            from database import init_db
            await init_db()
            db_available = True
            logger.info("Database initialized")
        except Exception as e:
            logger.warning(f"Database initialization failed: {e}")
            logger.warning("API will run without database - some features unavailable")
    else:
        logger.info("DATABASE_URL not set - running without database")
    
    yield
    
    # Shutdown
    logger.info("Shutting down InfraIQ API...")


# Create FastAPI application
app = FastAPI(
    title="InfraIQ API",
    description="Backend API for the InfraIQ Web Dashboard",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
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
        "database": "connected" if db_available else "not configured",
    }


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "service": "InfraIQ API",
        "version": "0.1.0",
        "docs": "/docs",
    }


# Only include routers if database is configured
if os.getenv("DATABASE_URL"):
    from routers import scans, projects, license, sync, webhooks, dashboard
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
        port=int(os.getenv("PORT", 8000)),
        reload=settings.environment == "development",
    )
