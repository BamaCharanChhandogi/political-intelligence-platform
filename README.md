# 🏛️ Political Intelligence Platform (Hyderabad Parliamentary Constituency)
### Technical Assessment Submission for **Corporate Chanakya, Hyderabad**

> An enterprise-grade, data-driven political intelligence dashboard providing deep-dive electoral analytics, retrospective assembly segment profiling, demographic mapping, and behavioral insights for the **Hyderabad Parliamentary Constituency (Telangana)**.

---

## 🌟 Key Highlights & Feature Matrix

- **Executive Intelligence Dashboard:** Top-level KPIs featuring current MP tenure, margin resilience, turnout trajectory, and assembly segment alignment.
- **Historical Parliamentary Results (2009–2024):** Candidate-level EVM/Postal vote counts, party performance, NOTA trends, and interactive vote share donut visualizer.
- **Assembly Constituencies Retrospective Analysis:** Granular segment-by-segment audit of all 7 Vidhan Sabha seats (*Malakpet, Karwan, Goshamahal, Charminar, Chandrayangutta, Yakutpura, Bahadurpura*) cross-referencing 2024 Lok Sabha leads with 2023 Telangana State Assembly outcomes.
- **Demographic & Socio-Economic Profiling:** Official Census of India breakdown covering religion, social categories (General/Minority/SC/ST), age impact, literacy gender parity, and urban density.
- **Strategic Political Intelligence & Swing Analysis:** Multi-election swing matrix, Old City turnout asymmetry analysis, Goshamahal anomaly audit, and third-pole (BRS/Congress) attrition dynamics.
- **Elite Modern UI/UX:** Built on Obsidian Slate (`#090D16`), utilizing Geist Sans & Geist Mono typography, Recharts SVG graphics, and responsive mobile/desktop layouts.

---

## 🛠️ Technology Stack

| Domain | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Framer Motion |
| **Backend** | Node.js, Express.js, TypeScript, Helmet, Rate-Limit, Compression, CORS |
| **Data Processing** | Python 3.11, Pandas, JSON/CSV automated ETL pipeline |
| **Data Sources** | Election Commission of India (ECI), Chief Electoral Officer Telangana, Census of India 2011 |

---

## 🚀 Quickstart & Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Python 3.9+ (optional, only needed if re-running ETL pipeline)

---

### Step 1: Clone or Extract the Repository
```bash
git clone https://github.com/BamaCharanChhandogi/political-intelligence-platform.git
cd political-intelligence-platform
```

---

### Step 2: Run the Backend API Server
```bash
cd server
npm install
npm run dev
```
> The API server will boot up at **`http://localhost:5000`**. You can verify live endpoints like `http://localhost:5000/api/v1/overview`.

---

### Step 3: Run the Frontend Dashboard Client
In a separate terminal window:
```bash
cd client
npm install
npm run dev
```
> Open your browser at **`http://localhost:3000`** to experience the full interactive dashboard.

---

## 📊 Running the Python Data Pipeline (Optional)

All datasets are already cleaned and included under `data/processed/` and `data/raw/`. To re-run the transformation from source definitions:
```bash
python scripts/etl/clean_and_export.py
```

---

## 🔒 Security & Performance Features

1. **Helmet.js Integration:** Enforces hardened HTTP headers, CSP, and XSS sanitization.
2. **API Rate Limiting:** 150 requests / 15 minutes window prevents Denial of Service (DoS).
3. **Hybrid Failover Architecture:** Client automatically fetches from REST API server when online; instantly falls back to embedded datasets if deployed standalone or network drops.
4. **Optimized SVG Visualizations:** No heavy canvas scripts; pure responsive vector SVGs with fast render times.

---

## 📂 Project Structure

```
political-intelligence-platform/
├── client/                     # React 19 + TypeScript + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Modular dashboard tabs (Overview, Parliamentary, Assembly, Demographics, Insights)
│   │   ├── data/               # Embedded high-availability data fallbacks
│   │   ├── types/              # Full TypeScript interfaces
│   │   ├── App.tsx             # Main dashboard controller
│   │   └── main.tsx
├── server/                     # Express + TypeScript REST API Server
│   ├── src/
│   │   ├── controllers/        # Request handling and validation
│   │   ├── routes/             # RESTful API routing
│   │   ├── services/           # Data aggregation and analytics logic
│   │   ├── data/               # Pre-processed verified JSON datasets
│   │   └── index.ts            # Entrypoint with security & rate limiting
├── data/
│   ├── raw/                    # Audited CSV files (ECI & Assembly data)
│   └── processed/              # Normalized JSON datasets
├── scripts/
│   └── etl/                    # Python ETL transformation pipeline
└── docs/
    └── TECHNICAL_DOCUMENTATION.md # Detailed architecture and engineering documentation
```

---

## 👨‍💻 Candidate Submission Information
- **Candidate:** Bama Charan Chhandogi
- **Company:** Corporate Chanakya, Hyderabad
- **Constituency Analyzed:** Hyderabad Parliamentary Constituency (Telangana)
- **Status:** Complete, Tested, Production-Ready
