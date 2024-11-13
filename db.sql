BEGIN;
CREATE SCHEMA marvel_app;
GRANT USAGE ON SCHEMA marvel_app TO postgres;

-- Set search path
SET search_path TO marvel_app, public;

-- Create tables in the marvel_app schema
CREATE TABLE marvel_characters (
   id INT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description TEXT,
   modified TIMESTAMP,
   thumbnail VARCHAR(255),
   comics JSONB,
   series JSONB,
   stories JSONB,
   events JSONB,
   urls JSONB,
   resource_uri VARCHAR(255)
);

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password_hash VARCHAR(255)
);

CREATE TABLE teams (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES users(id) ON DELETE CASCADE,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE character_role AS ENUM ('leader', 'enforcer', 'operative', 'innovator');
CREATE TABLE character_teams (
  id SERIAL PRIMARY KEY,
  team_id INT REFERENCES teams(id) ON DELETE CASCADE,
  character_id INT REFERENCES marvel_characters(id) ON DELETE CASCADE,
  type character_role NOT NULL;
);

-- Grant privileges and set default privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA marvel_app TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA marvel_app TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA marvel_app GRANT ALL PRIVILEGES ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA marvel_app GRANT ALL PRIVILEGES ON SEQUENCES TO postgres;

COMMIT;