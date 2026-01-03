-- ==============================================================================
-- InfraIQ Database Initialization
-- ==============================================================================
-- This script runs when the PostgreSQL container starts for the first time.
-- It creates the database schema and any initial data.
-- ==============================================================================

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: Tables are created by SQLAlchemy's Base.metadata.create_all()
-- This file is for any additional setup like indexes, functions, or initial data.

-- Create indexes for common queries
-- (These will be created after SQLAlchemy creates the tables)

-- Example: Create a function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'InfraIQ database initialized successfully';
END $$;
