# Technical Documentation: Political Intelligence Platform (Hyderabad PC)
**Candidate Assessment Submission for Corporate Chanakya, Hyderabad**

---

## 1. Executive Summary & Objective

This platform is a full-stack, enterprise-grade political intelligence dashboard developed specifically for the **Hyderabad Parliamentary Constituency (Telangana)**. It empowers campaign strategists, political consultants, and leadership teams with granular, verifiable insights across:
1. **Constituency Demographic & Socio-Economic Profile** (Census of India, PCA)
2. **Historical Parliamentary Results (2009–2024)** (Election Commission of India)
3. **Assembly Constituencies Retrospective Analysis** (7 Vidhan Sabha segments)
4. **Electoral Trends, Polarization, and Voter Behavior Indicators**

---

## 2. Application Architecture

```
[ Official Data Sources: ECI Reports + Census 2011 + CEO Telangana ]
                               │
                               ▼
              [ Python ETL Pipeline: clean_and_export.py ]
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
      [ CSV Raw Datasets ]          [ JSON Clean Datasets ]
         (data/raw/)                   (data/processed/)
                                              │
                ┌─────────────────────────────┴─────────────────────────────┐
                ▼                                                           ▼
     [ PostgreSQL Database ]                                    [ Embedded Static Fallback ]
  (Neon Serverless / Cloud DB)                                   (Zero-Break Resilience)
                │                                                           │
                ▼                                                           │
     [ Express/Node REST API ]                                              │
     (server/ & client/api/)                                                │
                │                                                           │
                └─────────────────────────────┬─────────────────────────────┘
                                              ▼
                             [ React 19 Frontend Dashboard ]
                         (Vite + Tailwind CSS v4 + Recharts)
```

### Architectural Highlights
- **Zero-Break High Availability (Hybrid Mode):** The client connects to live cloud PostgreSQL API endpoints (`/api/v1/`) with automated fallback to verified pre-bundled datasets if the network or database is temporarily unreachable.
- **Micro-Typography & Elite Theme:** Custom Geist Sans and Geist Mono typography with an Obsidian Slate (`#090D16` / `#0F172A`) palette, mirroring Bloomberg Terminal and Palantir Gotham design aesthetics.

---

## 3. Frontend Implementation

- **Framework:** React 19 with TypeScript, bundled via Vite.
- **Styling:** Tailwind CSS v4 with custom color themes (War Room Dark `#090D16` and Institutional Light `#F8FAFC`).
- **Visualizations:** Recharts vector SVG components (Bar charts, Donut charts, Area charts) optimized for zero jank.
- **Layout Stabilization:** `scrollbar-gutter: stable` and pure CSS capsules prevent UI jitter during tab or year changes.
- **Component Hierarchy:**
  - `Navbar`: Frosted glass capsule navigation with year controller, export, and theme switcher.
  - `OverviewTab`: Executive intelligence summary, top KPIs, longitudinal vote share evolution.
  - `ParliamentaryTab`: Candidate-level results table, EVM vs Postal split, NOTA analysis, vote distribution donut.
  - `AssemblyTab`: 7 Vidhan Sabha segments retrospective analysis with interactive constituency dossiers.
  - `DemographicsTab`: Census demographic profiling, religious and social category compositions, swing matrix.

---

## 4. Backend Implementation

- **Framework:** Node.js with Express.js and TypeScript.
- **Middleware Pipeline:**
  - `helmet`: Hardens HTTP headers against injection and clickjacking.
  - `express-rate-limit`: Prevents abuse (150 requests per 15 minutes).
  - `cors`: Secure origin validation.
  - `compression`: Brotli/Gzip payload compression.
- **Serverless Parity:** Full Vercel Serverless Function implementation at `client/api/index.ts` allowing instant serverless execution without requiring a persistent container.

---

## 5. API Design & Integration

RESTful API specification with consistent JSON payload envelopes:

```
GET /api/v1/overview              -> Executive KPI summary, current MP, turnout delta, lead distribution
GET /api/v1/elections             -> Full historical parliamentary results (filter by ?year=2024)
GET /api/v1/trends/vote-share     -> Time-series vote share trends formatted for Recharts
GET /api/v1/assembly-segments     -> Assembly segment lead distribution, electors, margins, 2023 vs 2024
GET /api/v1/demographics          -> Population pyramid, literacy, religion, social categories
GET /api/v1/parties               -> Master list of political parties, alliances, colors, founded year
GET /api/v1/intelligence-insights -> Strategic takeaways, polarization notes, inter-election swing analysis
```

---

## 6. Database Design & Relational Schema

Implemented in PostgreSQL with indexed foreign keys and connection pooling (`pg.Pool`):

```sql
-- 1. Parties Master
polintel_parties (id, party_code, party_name, founded_year, abbrev, alliance, primary_color)

-- 2. Parliamentary Constituencies
polintel_parliamentary_constituencies (id, pc_no, pc_name, state, district, total_assembly_segments, category)

-- 3. Assembly Constituencies (7 Segments)
polintel_assembly_segments (id, pc_id, ac_no, ac_name, electors_2024, turnout_2024, aimim_votes_2024, bjp_votes_2024, inc_votes_2024, leading_party_2024, lead_margin_2024, winner_assembly_2023, party_assembly_2023, assembly_margin_2023, dominant_community, strategic_status)

-- 4. Parliamentary Elections
polintel_elections (id, pc_id, year, election_date, counting_date, total_electors, total_votes_polled, voter_turnout_percent, winning_margin, winning_margin_percent, nota_votes, nota_percent, winner_party)

-- 5. Candidate Results
polintel_candidate_results (id, election_id, candidate_name, party, evm_votes, postal_votes, total_votes, vote_share_percent, position, is_winner)

-- 6. Demographics Profile
polintel_demographics (id, pc_id, census_year, total_population, male_population, female_population, sex_ratio, population_density_per_sq_km, literacy_rate, male_literacy, female_literacy, religious_composition, social_category_composition)

-- 7. Intelligence Insights & Findings
polintel_insights (id, pc_id, title, observation, type, source)
```

---

## 7. Data Processing Workflow & ETL

1. **Extraction:** Raw ECI Form 20 and Census statistical documents collected into `data/raw/`.
2. **Cleaning & Transformation:** Python script `scripts/etl/clean_and_export.py` using Pandas cleans column formatting, parses integers, strips trailing whitespaces, and standardizes party nomenclature.
3. **Database Population:** `scripts/db/migrate_and_seed.py` creates tables, constraints, and inserts audited datasets into PostgreSQL.

---

## 8. Security Measures

- **Parameterized SQL Queries:** Protects against SQL Injection through parameterized queries (`$1, $2`).
- **HTTP Header Hardening:** `helmet` applies strict Content-Security-Policy (CSP) and HSTS.
- **Volumetric Throttling:** Rate limiter prevents brute force and DoS vulnerabilities.
- **Input Validation:** Route query params (`?year=`) sanitized before database execution.

---

## 9. Performance Optimization Techniques

- **Vector SVG Rendering:** SVG-based charts prevent memory leaks associated with Canvas rendering.
- **Pre-computed Aggregations:** Database queries leverage pre-calculated percentages rather than expensive run-time row scanning.
- **Connection Pooling:** `pg.Pool` maintains warm database connections with 5s timeout limits.
- **Tree-Shaking:** Vite bundles only used Lucide icons and Recharts primitives, minimizing bundle footprint.

---

## 10. Scalability Considerations

- **Multi-Constituency Scalability:** The database schema is fully normalized around `pc_id`. Adding any new Lok Sabha constituency (e.g., Secunderabad, Chevella, Malkajgiri) requires only a single new row in `polintel_parliamentary_constituencies` and corresponding election records.
- **Stateless Serverless Execution:** Express controllers and Vercel functions are 100% stateless, allowing infinite horizontal scaling across cloud edge instances.
- **Microservice Decoupling:** The ETL pipeline, REST API, and Frontend operate as decoupled services communicating over standard JSON interfaces.
