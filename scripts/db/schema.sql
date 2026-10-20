-- Political Intelligence Platform Database Schema
-- Dedicated schema prefix: polintel_* to avoid collision with existing database tables

-- 1. Political Parties Table
CREATE TABLE IF NOT EXISTS polintel_parties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(50) NOT NULL UNIQUE,
    alliance VARCHAR(50),
    color VARCHAR(20),
    symbol VARCHAR(100),
    founded INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Parliamentary Constituencies Table
CREATE TABLE IF NOT EXISTS polintel_parliamentary_constituencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    state_code VARCHAR(10) NOT NULL,
    category VARCHAR(20) DEFAULT 'GEN',
    total_electors_2024 BIGINT,
    total_electors_2019 BIGINT,
    total_electors_2014 BIGINT,
    total_electors_2009 BIGINT,
    assembly_segments_count INTEGER DEFAULT 7,
    historical_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Assembly Constituencies (Segments) Table
CREATE TABLE IF NOT EXISTS polintel_assembly_segments (
    id SERIAL PRIMARY KEY,
    pc_id INTEGER REFERENCES polintel_parliamentary_constituencies(id) ON DELETE CASCADE,
    ac_no INTEGER NOT NULL UNIQUE,
    ac_name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    electors_2024 BIGINT,
    turnout_2024 NUMERIC(5,2),
    aimim_votes_2024 BIGINT,
    bjp_votes_2024 BIGINT,
    inc_votes_2024 BIGINT,
    leading_party_2024 VARCHAR(50),
    lead_margin_2024 BIGINT,
    winner_assembly_2023 VARCHAR(255),
    party_assembly_2023 VARCHAR(50),
    assembly_margin_2023 BIGINT,
    dominant_community TEXT,
    strategic_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Parliamentary Elections Table
CREATE TABLE IF NOT EXISTS polintel_elections (
    id SERIAL PRIMARY KEY,
    pc_id INTEGER REFERENCES polintel_parliamentary_constituencies(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    election_date DATE,
    counting_date DATE,
    total_electors BIGINT,
    total_votes_polled BIGINT,
    voter_turnout_percent NUMERIC(5,2),
    valid_votes BIGINT,
    nota_votes BIGINT,
    nota_percent NUMERIC(5,2),
    winning_margin BIGINT,
    winning_margin_percent NUMERIC(5,2),
    winner_party VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT polintel_unique_pc_year UNIQUE (pc_id, year)
);

-- 5. Candidate Results Table
CREATE TABLE IF NOT EXISTS polintel_candidate_results (
    id SERIAL PRIMARY KEY,
    election_id INTEGER REFERENCES polintel_elections(id) ON DELETE CASCADE,
    candidate_name VARCHAR(255) NOT NULL,
    party VARCHAR(50) NOT NULL,
    party_color VARCHAR(20),
    evm_votes BIGINT DEFAULT 0,
    postal_votes BIGINT DEFAULT 0,
    total_votes BIGINT NOT NULL,
    vote_share_percent NUMERIC(5,2),
    position INTEGER NOT NULL,
    is_winner BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Demographics Profile Table
CREATE TABLE IF NOT EXISTS polintel_demographics (
    id SERIAL PRIMARY KEY,
    pc_id INTEGER REFERENCES polintel_parliamentary_constituencies(id) ON DELETE CASCADE UNIQUE,
    census_year INTEGER DEFAULT 2011,
    total_population BIGINT,
    male_population BIGINT,
    female_population BIGINT,
    sex_ratio INTEGER,
    population_density_per_sq_km INTEGER,
    literacy_rate NUMERIC(5,2),
    male_literacy NUMERIC(5,2),
    female_literacy NUMERIC(5,2),
    urban_population_percent NUMERIC(5,2) DEFAULT 100.0,
    rural_population_percent NUMERIC(5,2) DEFAULT 0.0,
    religious_composition JSONB,
    social_category_composition JSONB,
    age_demographics JSONB,
    socio_economic_indicators JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Strategic Insights Table
CREATE TABLE IF NOT EXISTS polintel_insights (
    id SERIAL PRIMARY KEY,
    pc_id INTEGER REFERENCES polintel_parliamentary_constituencies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    observation TEXT NOT NULL,
    type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast aggregations and analytical queries
CREATE INDEX IF NOT EXISTS idx_polintel_candidates_election ON polintel_candidate_results(election_id);
CREATE INDEX IF NOT EXISTS idx_polintel_elections_year ON polintel_elections(year);
CREATE INDEX IF NOT EXISTS idx_polintel_ac_pc ON polintel_assembly_segments(pc_id);
