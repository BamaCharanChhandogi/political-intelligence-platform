# 🏛️ Political Intelligence Platform (Hyderabad Parliamentary Constituency)
### Technical Assessment Submission for **Corporate Chanakya, Hyderabad**

> An enterprise-grade, data-driven political intelligence dashboard providing deep-dive electoral analytics, retrospective assembly segment profiling, demographic mapping, and behavioral insights for the **Hyderabad Parliamentary Constituency (Telangana)**.

- **Live Production URL:** [https://client-inky-six-10.vercel.app](https://client-inky-six-10.vercel.app)
- **GitHub Repository:** [https://github.com/BamaCharanChhandogi/political-intelligence-platform](https://github.com/BamaCharanChhandogi/political-intelligence-platform)

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Highlights & Feature Matrix](#-key-highlights--feature-matrix)
3. [Technology Stack & Dependencies](#-technology-stack--dependencies)
4. [Environment Configuration](#-environment-configuration)
5. [Database Setup & Schema Migration](#-database-setup--schema-migration)
6. [Installation & Execution Steps](#-installation--execution-steps)
7. [Data Sources & Ingestion Pipeline](#-data-sources--ingestion-pipeline)
8. [Analytical Methodology & Calculations](#-analytical-methodology--calculations)
9. [Security & Performance Optimizations](#-security--performance-optimizations)
10. [Repository Directory Structure](#-repository-directory-structure)

---

## 🌟 Project Overview

The **Political Intelligence Platform** is built to equip election strategists, campaign leadership, and political consulting analysts with empirical decision-making tools. Focused on the **Hyderabad Parliamentary Constituency (PC #9, Telangana)**, it models longitudinal voter behavior across four general election cycles (2009, 2014, 2019, 2024) and audits all 7 underlying Assembly Constituencies (Vidhan Sabha segments).

---

## 🎯 Key Highlights & Feature Matrix

- **Executive Intelligence Dashboard:** Top-level KPIs featuring current MP tenure, margin resilience, turnout trajectory, and assembly segment alignment.
- **Historical Parliamentary Results (2009–2024):** Candidate-level EVM/Postal vote counts, party performance, NOTA trends, and interactive vote share donut visualizer.
- **Assembly Constituencies Retrospective Analysis:** Granular segment-by-segment audit of all 7 Vidhan Sabha seats (*Malakpet, Karwan, Goshamahal, Charminar, Chandrayangutta, Yakutpura, Bahadurpura*) cross-referencing 2024 Lok Sabha leads with 2023 Telangana State Assembly outcomes.
- **Demographic & Socio-Economic Profiling:** Official Census of India breakdown covering religion, social categories (General/Minority/SC/ST), literacy gender parity, and urban density.
- **Strategic Political Intelligence & Swing Analysis:** Multi-election swing matrix, Old City turnout asymmetry analysis, Goshamahal anomaly audit, and third-pole (BRS/Congress) attrition dynamics.
- **Elite Modern UI/UX:** Dual theme support (War Room Obsidian `#090D16` and Institutional Light `#F8FAFC`), Geist Sans typography, Recharts SVG graphics, and responsive mobile/tablet/desktop layouts.

---

## 🛠️ Technology Stack & Dependencies

| Layer | Technologies & Dependencies | Purpose |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Framer Motion | Modern, zero-latency reactive dashboard |
| **Backend** | Node.js, Express.js, TypeScript, Helmet, express-rate-limit, CORS, compression, pg | Scalable REST API with enterprise security |
| **Database** | PostgreSQL (Neon Serverless Cloud & Local Support), connection pool (`pg.Pool`) | Relational electoral schema & aggregations |
| **Data Processing** | Python 3.11, Pandas, Psycopg2, JSON/CSV automated ETL pipeline | ECI Form 20 and Census PCA normalization |
| **Hosting & Cloud** | Vercel (Edge Serverless Functions + Global CDN) | Production high-availability deployment |

---

## ⚙️ Environment Configuration

Create a `.env` file in the `server/` directory (or configure Vercel Environment Variables):

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:npg_vAHoMILkxZ53@ep-shiny-mountain-b5iatoxl-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

*(Note: The platform features a zero-break hybrid architecture. If a database is unreachable, the client and server seamlessly fallback to pre-bundled audited datasets without any service interruption).*

---

## 🗄️ Database Setup & Schema Migration

The repository includes complete, reproducible SQL migration and seeding scripts:

1. **Schema Definition:** Located at [`scripts/db/schema.sql`](file:///scripts/db/schema.sql), defining 7 relational tables:
   - `polintel_parties`
   - `polintel_parliamentary_constituencies`
   - `polintel_assembly_segments`
   - `polintel_elections`
   - `polintel_candidate_results`
   - `polintel_demographics`
   - `polintel_insights`

2. **Automated Migration & Seeding:**
```bash
python scripts/db/migrate_and_seed.py
```
This script connects to the target PostgreSQL database, applies schema definitions with indexes, and populates verified datasets for all historical elections.

---

## 🚀 Installation & Execution Steps

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Python**: 3.9+ (optional, for running ETL or DB migration scripts)

### 1. Clone the Repository
```bash
git clone https://github.com/BamaCharanChhandogi/political-intelligence-platform.git
cd political-intelligence-platform
```

### 2. Start the Backend REST API Server
```bash
cd server
npm install
npm run dev
```
> The API server boots at `http://localhost:5000`. Test endpoint: `http://localhost:5000/api/v1/overview`.

### 3. Start the Frontend Client
In a new terminal:
```bash
cd client
npm install
npm run dev
```
> The dashboard will open at `http://localhost:3000` (or `http://localhost:5173`).

---

## 📊 Data Sources & Ingestion Pipeline

All electoral figures and demographic baselines originate from official, authoritative sources:
1. **Election Commission of India (ECI):** Statistical Reports for General Elections to Lok Sabha (2009, 2014, 2019, 2024).
2. **Chief Electoral Officer (CEO), Telangana:** Form 20 final result sheets detailing booth-level and Assembly segment totals for Hyderabad PC.
3. **Office of the Registrar General & Census Commissioner of India:** Primary Census Abstract (PCA) 2011 for Hyderabad District.

### Data Cleaning and Transformation Process
- **Automated Pipeline:** Defined in [`scripts/etl/clean_and_export.py`](file:///scripts/etl/clean_and_export.py).
- **Vote Disaggregation:** Separated EVM votes from Postal ballot counts.
- **Normalization:** Standardized party nomenclature (e.g., TRS to BRS re-alignment, TDP/BJP coalition indexing).
- **Derived Metrics:** Automated computation of Turnout %, Vote Share %, Winning Margin %, and multi-election Swing Deltas.

---

## 📐 Analytical Methodology & Calculations

- **Turnout Percentage:**
  $$\text{Turnout \%} = \left(\frac{\text{Total Valid Votes Polled}}{\text{Total Registered Electors}}\right) \times 100$$
- **Vote Share Percentage:**
  $$\text{Vote Share \%} = \left(\frac{\text{Candidate Votes}}{\text{Total Valid Votes}}\right) \times 100$$
- **Margin of Victory:**
  $$\text{Margin \%} = \text{Winner Vote Share \%} - \text{Runner-up Vote Share \%}$$
- **Inter-Election Swing Analysis:**
  $$\text{Swing}_{(t_2 - t_1)} = \text{Vote Share \%}_{(t_2)} - \text{Vote Share \%}_{(t_1)}$$

---

## 🔒 Security & Performance Optimizations

1. **Hardened HTTP Headers:** `helmet` middleware enforces CSP, X-Frame-Options, and XSS filtering.
2. **Rate Limiting:** `express-rate-limit` prevents volumetric DoS attacks (150 requests / 15-minute window).
3. **Optimized SVG Visualizations:** Vector-based Recharts rendering without heavy WebGL/Canvas overhead.
4. **Stable Layout:** `scrollbar-gutter: stable` prevents page shaking and layout shifts across tab changes.

---

## 📂 Repository Directory Structure

```
political-intelligence-platform/
├── client/                     # React 19 + TypeScript Frontend
│   ├── api/                    # Vercel Serverless Function entrypoint
│   ├── src/
│   │   ├── components/         # Executive, Parliamentary, Assembly, Demographics Tabs
│   │   ├── data/               # High-availability verified datasets
│   │   ├── types/              # Comprehensive TypeScript interfaces
│   │   ├── App.tsx             # Main dashboard controller
│   │   └── main.tsx
├── server/                     # Express.js + TypeScript REST API Server
│   ├── src/
│   │   ├── controllers/        # Request handling and routing logic
│   │   ├── routes/             # REST API routing definitions
│   │   ├── services/           # Aggregation & business logic
│   │   └── index.ts            # Server entrypoint with security middleware
├── data/
│   ├── raw/                    # Audited source CSV datasets
│   └── processed/              # Normalized JSON datasets
├── scripts/
│   ├── db/                     # PostgreSQL schema.sql & migrate_and_seed.py
│   └── etl/                    # Python ETL transformation pipeline
├── docs/
│   └── TECHNICAL_DOCUMENTATION.md # Comprehensive engineering and architectural documentation
└── README.md
```

---

## 👨‍💻 Candidate Submission Information
- **Candidate:** Bama Charan Chhandogi
- **Company:** Corporate Chanakya, Hyderabad
- **Constituency Analyzed:** Hyderabad Parliamentary Constituency (Telangana)
- **Status:** Complete, Tested, Production-Ready
