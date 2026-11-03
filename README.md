# TrustGrid Lean AI — Outcome-First Platform & Simulation Suite

> **Turn Operational Complexity Into Measurable Business Value.**  
> *S0 Frame → S1 Baseline → S2 Model → S3 Prove → S4 Bank → S5 Assure*

This repository hosts the redesigned, enterprise-ready digital platform for **TrustGrid Lean AI**, combining Lean Six Sigma, Industrial Engineering, Artificial Intelligence, and Discrete-Event Simulation.

---

## 🧭 1. Website Structure & Navigation

The primary navigation follows the requested order:
1. **Outcomes** (`#/outcomes`): Complete directory of 8 core business outcomes, KPI definitions, and interactive modeling workspace.
2. **Industries** (`#/industries`): 8 targeted industry sectors with real operational challenges, Lean methods, and assurance considerations.
3. **Services** (`#/services`): Value-oriented engineering services mapped to the 6-stage value creation cycle.
4. **Use Cases** (`#/usecases`): Evidence-based use cases following the 7-step sequence: *Problem → Baseline → Intervention → Simulation / Pilot → KPI Comparison → Financial Impact → Assurance*.
5. **About Us** (`#/about`): Core operational tenets, the approved 6-stage cycle, and discovery workshop scheduling.

### Direct Simulation Tools Launcher (Top Bar & Hero)
- **Lean Sigma Calculator** (`#/calculator`)
- **Value Stream Mapping Analytics** (`#/vsm`)
- **Value Stream Discrete Simulator** (`#/simulator`)

---

## 📊 2. Eight Core Business Outcomes & KPI Experience

The platform answers three fundamental questions for business executives:
- **What We Improve:** Unit cost, system throughput, First Pass Yield (FPY), cycle times, bottleneck capacity, WIP working capital, and operational assurance.
- **How We Measure:** Mathematically validated formulas (PCE %, DPMO, Takt time, OEE, Little's Law, and Cpk).
- **How Value is Proven:** Digital simulation sandboxes before physical line changes, combined with audited financial reconciliations.

### Supported Business Outcome Domains:
1. **Cost Reduction:** Cost per Unit ($/u), Cost of Poor Quality (COPQ), and Operating Cost Savings ($/yr).
2. **Productivity & Throughput:** Good Units/Hour, Units per Labor Hour, and OEE (Availability × Performance × Quality).
3. **Quality & Defect Reduction:** Defect Rate (%), First Pass Yield (FPY %), and Six Sigma DPMO.
4. **Cycle Time & Lead Time:** Total Lead Time (Hours/Days), Process Cycle Efficiency (PCE %), and Takt Time pacing.
5. **Capacity & Asset Utilization:** Bottleneck Station Utilization (%) and Machine Availability (%).
6. **Working Capital & Inventory:** Work-in-Progress (WIP Units) and Days Inventory Outstanding (DIO).
7. **Customer Service & Delivery:** On-Time In-Full (OTIF %) and Expedited Premium Freight Costs.
8. **Risk, Reliability & Assurance:** Process Capability Index ($C_{pk}$) and Mean Time Between Failures (MTBF).

---

## 🔄 3. Approved Six-Stage AI Value Creation Cycle

1. **S0 — Frame:** Define the business problem, decision, owner, scope, and target value.
2. **S1 — Baseline:** Measure current performance using documented metrics, validated formulas, data sources, and dates.
3. **S2 — Model:** Evaluate the solution, potential benefits, costs, assumptions, and risks.
4. **S3 — Prove:** Test the proposed solution against predefined success criteria (pilot or simulation).
5. **S4 — Bank:** Implement the proven solution and verify realized business benefits with Finance sign-off.
6. **S5 — Assure:** Maintain governance, risk controls, model drift monitoring, and audit evidence.

*Continuous Assurance Principle: Assurance is enforced throughout all stages (S0–S5), not merely at the end.*

---

## 🏭 4. Eight Targeted Industry Practice Sectors

- **Manufacturing & Industrial Production:** Discrete CNC lines, thermal drift, SMED quick changeovers, and Poka-Yoke error proofing.
- **Retail, Wholesale & Consumer:** Omnichannel fulfillment, warehouse motion minimization, dynamic slotting, and RMA reduction.
- **Mobility, Logistics & Infrastructure:** Fleet utilization, cold chain telemetry drift, and demurrage avoidance.
- **Financial Services & Insurance:** Straight-Through Processing (STP), underwriting cycle time, and claims triage queues.
- **Healthcare & Life Sciences:** Clinical flow, operating room scheduling, and pharma batch release dwell times.
- **Energy, Utilities & Natural Resources:** Turbine forced outage prevention, RCM, and grid load balancing.
- **Technology, Media & Telecom:** CI/CD pipeline bottlenecks, DORA velocity metrics, and cloud autoscaling simulation.
- **Public Sector, Defense & Aerospace:** Depot repair turnaround cycles, fleet mission capability, and ITAR compliance.

---

## 🛠️ 5. Three Interactive Analytical & Simulation Tools

### A. Lean Sigma Analytical Calculator (`#/calculator`)
- Live computational model for Defect Rate, First Pass Yield, Effective Throughput, PCE %, Availability, DPMO, and Sigma Levels.
- Financial impact calculation: Scrap cost reduction, labor hours saved, net annual savings, ROI %, and payback period.
- Automotive sample dataset pre-loader, CSV data export, and printable reports.

### B. Value Stream Mapping Analytics (`#/vsm`)
- Visual process flow canvas with upstream Supplier, Workcells, Buffers, and downstream Customer Demand.
- Dynamic Takt time calculation, Little's Law lead time calculation ($WIP = Throughput \times Lead Time$), and primary bottleneck identification.
- Automated DOWNTIME 8-waste anomaly detection flags.
- In-place Step Data Editor (Add, Edit, Delete, Value-Added / Non-Value Added toggles) and Future-State before/after comparison.

### C. Value Stream Discrete-Event Simulator (`#/simulator`)
- Genuine discrete-event queueing model simulating physical part release and multi-station flow.
- Models **Downstream Blocking** (station finished but downstream buffer full) and **Starvation** (station idle with empty queue).
- Configurable speed multiplier ($1\times, 2\times, 5\times, 10\times$), live animated queue meters, and CSV telemetry export.

---

## 🚀 Running the Platform

### Development Mode
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

### Production Build Verification
```bash
npm run build
```
Compiled with zero TypeScript errors using Vite and Tailwind CSS.

---

## 📡 6. Google Apps Script Analytics Integration

VYNTRA sends analytics events to a Google Apps Script (GAS) webhook that writes
directly into a Google Spreadsheet — no third-party analytics service needed.

### Architecture

```
Browser (React/Vite)
  └─ analyticsService.ts   ← singleton, reads VITE_ANALYTICS_WEBHOOK_URL
       └─ fetch() POST JSON  ── CORS: GAS sets ACAO:* on "Anyone" deployments
            └─ doPost() in Code.gs
                 ├─ RAW_DATA sheet          ← every event
                 ├─ Live_Traffic_Events     ← every event
                 ├─ Page_Views              ← page_view
                 ├─ CTA_Clicks             ← cta_click / button_click
                 ├─ Sessions               ← session_start / session_end
                 ├─ Contact_Leads          ← contact_lead / form_submit
                 ├─ Run_Analytics_Events   ← tool_use / calculator_use / vsm_use / simulator_use
                 ├─ Dashboard_Events       ← nav_click / tab_click
                 ├─ Digital_Intelligence_Events ← all events (second copy)
                 └─ UTM_Data              ← when UTM params present
```

### 6a. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set `VITE_ANALYTICS_WEBHOOK_URL` to your deployed GAS Web App URL.
3. Restart the dev server: `npm run dev`

> **Never commit `.env`** — it is listed in `.gitignore`.

### 6b. Deploying / Verifying the Apps Script Endpoint

> ⚠️ **The most common error**: deploying as **"Me only"** instead of **"Anyone"**.
> The browser will get a 401/redirect and no events will be recorded.

**Steps to deploy correctly:**
1. Open [script.google.com](https://script.google.com) and open your VYNTRA project.
2. Click **Deploy → Manage deployments**.
3. Click the ✏️ pencil icon on your active deployment.
4. Set **"Who has access"** → **"Anyone"** (no Google sign-in required for doPost).
5. Click **Deploy** and copy the **Web app URL**.
6. Paste that URL into `.env` as `VITE_ANALYTICS_WEBHOOK_URL`.

**Verify the endpoint is live:**
```bash
# GET request — should return {"ok":true,"service":"VYNTRA Analytics Webhook",...}
Invoke-RestMethod -Uri "YOUR_WEBHOOK_URL" -Method GET
```

**Run the built-in validation tests (from the Apps Script editor):**
- `initializeSpreadsheet()` — creates all 23 sheet tabs with styled headers
- `runValidationTest()` — sends a `page_view` event and checks RAW_DATA
- `runContactLeadValidationTest()` — sends a `contact_lead` and checks Contact_Leads

### 6c. Events Tracked

| Event | Trigger | Target Sheet(s) |
|-------|---------|-----------------|
| `session_start` | App mount | Sessions, RAW_DATA, Live_Traffic_Events |
| `session_end` | `beforeunload` (via `sendBeacon`) | Sessions |
| `page_view` | Route change | Page_Views, RAW_DATA, Digital_Intelligence_Events |
| `nav_click` | Navbar / Footer link click | Dashboard_Events, RAW_DATA |
| `cta_click` | CTA buttons (Schedule Workshop, Simulators, etc.) | CTA_Clicks, RAW_DATA |
| `calculator_use` | Lean Sigma Calculator mount/unmount | Run_Analytics_Events, RAW_DATA |
| `vsm_use` | Value Stream Mapping mount/unmount | Run_Analytics_Events, RAW_DATA |
| `simulator_use` | Value Stream Simulator mount/unmount | Run_Analytics_Events, RAW_DATA |
| `contact_lead` | Workshop form submit (awaited) | Contact_Leads, RAW_DATA |

### 6d. Contact Form — Real Async Submission

The `ContactWorkshopForm` uses `analytics.trackContactLeadAsync()` which:
- **Awaits the real GAS response** — shows success only when `{ ok: true }` is received
- **Shows real error messages** on HTTP errors or GAS-returned error strings
- **Prevents duplicate submits** — button disabled while request is in flight
- **Shows a spinner** during submission

### 6e. CORS Behaviour

Google Apps Script deployed as **"Anyone"** sets:
```
Access-Control-Allow-Origin: *
```
Standard `fetch()` with `Content-Type: application/json` works from any origin.
We do **not** use `mode: 'no-cors'` — that would make the response body unreadable
and prevent the form from detecting success or failure.

> **Why PowerShell/curl tests return 401:**  
> PowerShell's `Invoke-RestMethod` / Windows `curl.exe` alias does not follow
> Google's OAuth redirect chain the same way browsers do. The real browser-to-GAS
> flow works correctly. To confirm, open the browser DevTools → Network tab and
> watch for a POST to `script.google.com/...` returning `{"ok":true,...}`.

### 6f. Verifying Events in the Spreadsheet

1. Open: `https://docs.google.com/spreadsheets/d/1K3mlBZIV3Im3U-DVKafl1eWpmE0LUzd5T7Uxzto3lYw`
2. Check **RAW_DATA** — every event appears here first.
3. Check **Live_Traffic_Events** — every event appears here too.
4. Navigate between pages in the app → new rows appear in **Page_Views**.
5. Click any CTA → rows appear in **CTA_Clicks** and **Dashboard_Events**.
6. Submit the workshop form → row appears in **Contact_Leads**.
7. Open the Calculator/VSM/Simulator → rows in **Run_Analytics_Events**.

### 6g. Refreshing Processed Analytics

Run `refreshAllProcessedAnalytics()` from the Apps Script editor (or set it on
an hourly time-based trigger) to aggregate RAW_DATA into:
- `Processed_Page_Analytics` — page-level view/duration/scroll averages  
- `Processed_CTA_Analytics` — CTA click counts  
- `Processed_Traffic_Analytics` — source/medium breakdown  
- `Processed_Device_Analytics` — device type breakdown  
- `Processed_Feature_Analytics` — tool usage stats  
- `Processed_Daily_Trends` — daily KPI rollup  
- `Processed_Session_Analytics` — session totals  
- `PROCESSED_ANALYTICS` — single-row executive summary  
