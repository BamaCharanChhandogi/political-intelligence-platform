# Technical Documentation: Political Intelligence Platform (Hyderabad PC)
**Candidate Assessment Submission for Corporate Chanakya, Hyderabad**

---

## 1. Executive Summary & Objective
This platform is a full-stack, data-driven political intelligence dashboard developed specifically for the **Hyderabad Parliamentary Constituency (Telangana)**. It empowers campaign strategists, political consultants, and leadership teams with granular, verifiable insights across:
1. **Constituency Demographic & Socio-Economic Profile** (Census of India, PCA)
2. **Historical Parliamentary Results (2009–2024)** (Election Commission of India)
3. **Assembly Constituencies Retrospective Analysis** (7 Vidhan Sabha segments)
4. **Electoral Trends, Polarization, and Voter Behavior Indicators**

---

## 2. System Architecture

```
[ Official Data Sources: ECI Reports + Census 2011 + TCPD ]
                           │
                           ▼
          [ Python ETL Pipeline: clean_and_export.py ]
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
    [ CSV Flat Datasets ]     [ JSON Clean Datasets ]
       (data/raw/)               (data/processed/)
                                        │
                           ┌────────────┴────────────┐
                           ▼                         ▼
                  [ Express/TS REST API ]    [ React Client Fallback ]
                  (server/src/index.ts)      (Zero-Network Resilience)
                           │                         │
                           └────────────┬────────────┘
                                        ▼
                   [ Elite UI / UX Dashboard Frontend ]
                     (Tailwind CSS v4 + Recharts + Geist)
```

### Key Technical Pillars:
- **Zero-Break High Availability (Hybrid Mode):** The client dynamically connects to the REST API server at `/api/v1/` with full rate-limiting, CORS, and security middleware. If the backend is decoupled or network fails, it immediately activates embedded fallback data without crashing or degrading UI visuals.
- **Micro-Typography & Elite Theme:** Custom Geist Sans and Geist Mono typography with an Obsidian Slate (`#090D16` / `#0F172A`) palette, mirroring Bloomberg Terminal and Palantir Gotham design aesthetics.

---

## 3. Data Sources & ETL Methodology

| Dataset Category | Source Agency | Description | Processing & Transformation |
|---|---|---|---|
| **Parliamentary Elections** | Election Commission of India (ECI) | 2009, 2014, 2019, 2024 Lok Sabha Statistical Reports | Calculated EVM vs Postal split, vote share percentages, winning margins, NOTA share, and candidate ranks. |
| **Assembly Segments** | Chief Electoral Officer, Telangana / ECI | Form 20 booth aggregations across 7 Assembly Constituencies (Malakpet, Karwan, Goshamahal, Charminar, Chandrayangutta, Yakutpura, Bahadurpura) | Extracted 2024 Lok Sabha candidate leads per segment and cross-referenced with 2023 Telangana State Assembly outcomes. |
| **Demographics** | Office of Registrar General & Census Commissioner, India | 2011 Primary Census Abstract (PCA) for Hyderabad District | Computed religious composition, social group shares (SC/ST/General), age cohorts, literacy gender parity, and workforce metrics. |

---

## 4. API Endpoints Reference

All endpoints return JSON wrapped with standard status metadata:

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

## 5. Security & Performance Optimizations

1. **Helmet & Security Headers:** Enforces Content Security Policy, XSS filtering, frame protection.
2. **Rate Limiting:** `express-rate-limit` prevents API abuse with a 150 requests/15-minute window per IP.
3. **Compression:** Gzip/Brotli payload compression enabled on the backend.
4. **Vite Rolldown Tree-Shaking:** Client bundled into static assets with SVG-based vector charting to eliminate heavy canvas dependencies.
5. **Strict Type Safety:** End-to-end TypeScript interfaces shared across controller responses and UI state.
