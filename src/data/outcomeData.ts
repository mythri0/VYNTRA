export interface BusinessOutcome {
  id: string;
  title: string;
  shortDesc: string;
  problem: string;
  primaryKPI: string;
  baselineRequirement: string;
  illustrativeTarget: string;
  validationMethod: string;
  category: 'cost' | 'quality' | 'speed' | 'throughput' | 'capacity' | 'capital' | 'service' | 'risk';
  kpis: {
    name: string;
    unit: string;
    definition: string;
    formula: string;
    requiredInputs: string[];
    calculationMethod: string;
    limitations: string;
    isFinancial: boolean;
  }[];
}

export const BUSINESS_OUTCOMES: BusinessOutcome[] = [
  {
    id: "cost-reduction",
    title: "Cost Reduction",
    shortDesc: "Cut operational friction, unit manufacturing cost, and scrap expenditure.",
    problem: "Rising labor and raw material input costs coupled with hidden scrap, rework cycles, and unbudgeted expedite expenses.",
    primaryKPI: "Cost per Unit ($/unit) & Cost of Poor Quality (COPQ)",
    baselineRequirement: "Historical 6–12 months unit production cost ledger, scrap logs, and rework labor time logs.",
    illustrativeTarget: "Illustrative example: 12–18% reduction in COPQ and 8% decrease in direct unit transformation cost.",
    validationMethod: "Monthly P&L cost variance reconciliation, audited work-order cost settlement, and general ledger credit audit.",
    category: "cost",
    kpis: [
      {
        name: "Cost Per Unit",
        unit: "$/unit",
        definition: "Total direct manufacturing and operating expenses divided by net good units produced in period.",
        formula: "Total Operating Cost ÷ Net Good Units Produced",
        requiredInputs: ["Total Operating Cost ($)", "Net Good Units Produced"],
        calculationMethod: "Direct arithmetic division using settled ledger actuals.",
        limitations: "Excludes corporate SG&A overhead allocations unless explicitly mapped into work-center cost pool.",
        isFinancial: true
      },
      {
        name: "Cost of Poor Quality (COPQ)",
        unit: "$",
        definition: "Total financial loss resulting from producing defective parts, scrap, rework labor, and customer warranty settlements.",
        formula: "Scrap Material Cost + Rework Labor Hours × Hourly Rate + Customer Warranty Credits",
        requiredInputs: ["Scrap Volume", "Scrap Material Rate", "Rework Hours", "Rework Labor Rate", "Warranty Claims"],
        calculationMethod: "Summation of direct non-conformance line items.",
        limitations: "Difficult to isolate indirect reputational damage and management firefighting overhead.",
        isFinancial: true
      },
      {
        name: "Operating Cost Savings",
        unit: "$/year",
        definition: "Annualized net cost reduction achieved through process streamlining and waste eradication.",
        formula: "(Baseline Annual Operating Cost - Post-Intervention Operating Cost) - Implementation Depreciation",
        requiredInputs: ["Baseline Cost", "Post-Intervention Cost", "Implementation Cost"],
        calculationMethod: "Before-and-after variance adjusted for production volume differences.",
        limitations: "Must be normalized if customer demand volume shifts significantly between baseline and measurement periods.",
        isFinancial: true
      }
    ]
  },
  {
    id: "productivity-throughput",
    title: "Productivity & Throughput",
    shortDesc: "Maximize good output per operating hour and labor touchpoint without capital-intensive line expansions.",
    problem: "Station starvation, operator idle buffers, and micro-stoppages throttling production output below plant nameplate capacity.",
    primaryKPI: "System Throughput (Units/Hour) & Overall Labor Productivity",
    baselineRequirement: "SCADA machine active timers, shift production tallies, and logged operator productive hours.",
    illustrativeTarget: "Illustrative example: 15–25% increase in throughput on bottleneck lines; 12% labor productivity uplift.",
    validationMethod: "Consecutive 30-day shift tally audits, MES cycle timestamp verification, and finished goods warehouse ingestion logs.",
    category: "throughput",
    kpis: [
      {
        name: "Production Throughput",
        unit: "Units/Hour",
        definition: "Good parts completed and transferred to downstream buffer per net operating hour.",
        formula: "Good Units Produced ÷ Productive Operating Hours",
        requiredInputs: ["Good Units Produced", "Productive Operating Hours"],
        calculationMethod: "Standard rate calculation at final quality sign-off gate.",
        limitations: "Sensitive to unrecorded micro-downtime and operator shift handoff delays.",
        isFinancial: false
      },
      {
        name: "Units per Labor Hour",
        unit: "Units/Labor-Hr",
        definition: "Total output volume normalized across all direct operator hours expended in workcell.",
        formula: "Total Good Units ÷ (Number of Operators × Shift Hours Worked)",
        requiredInputs: ["Total Good Units", "Active Operators Count", "Hours Worked"],
        calculationMethod: "Ratio of net good units to payroll production hours.",
        limitations: "Does not distinguish between automated robotic assembly assistance and purely manual hand assembly.",
        isFinancial: false
      },
      {
        name: "Overall Equipment Effectiveness (OEE)",
        unit: "%",
        definition: "Composite measure of operational effectiveness combining Availability, Performance rate, and Quality rate.",
        formula: "Availability (%) × Performance (%) × Quality (%)",
        requiredInputs: ["Operating Time vs Planned Time", "Actual Run Rate vs Ideal Rate", "Good Units vs Total Units"],
        calculationMethod: "Multiplication of three normalized decimal fractions expressed as a percentage.",
        limitations: "World-class benchmark is ~85%; requires reliable downtime logging to avoid inflated availability scores.",
        isFinancial: false
      }
    ]
  },
  {
    id: "quality-defect-reduction",
    title: "Quality & Defect Reduction",
    shortDesc: "Drive near-zero defect generation, stabilize tolerances, and raise First Pass Yield (FPY).",
    problem: "High variation in incoming supplier parts and machine drift generating repeated scrap and costly secondary rework loops.",
    primaryKPI: "Defect Rate (%) & Six Sigma DPMO",
    baselineRequirement: "Quality inspection logs, reject tag counts, automated optical inspection records, and scrap tickets.",
    illustrativeTarget: "Illustrative example: 40–60% defect reduction, shifting capability from 3.2σ to 4.5σ+.",
    validationMethod: "SPC control chart stability confirmation (p-charts, c-charts), Gauge R&R measurement verification, and 60-day customer RMA tracking.",
    category: "quality",
    kpis: [
      {
        name: "Defect Rate",
        unit: "%",
        definition: "The percentage of manufactured parts that fail inspection or non-conformance specifications on first attempt.",
        formula: "(Defective Units ÷ Total Units Produced) × 100",
        requiredInputs: ["Defective Units", "Total Units Produced"],
        calculationMethod: "Direct percentage ratio.",
        limitations: "Does not account for defect severity or whether the part is easily repairable versus irreversible scrap.",
        isFinancial: false
      },
      {
        name: "First Pass Yield (FPY)",
        unit: "%",
        definition: "The proportion of units that complete the entire process stream without requiring rework, repair, or adjustment.",
        formula: "(Total Units Produced - Defective Reworked Units) ÷ Total Units Produced × 100",
        requiredInputs: ["Total Units Entering Process", "Units Requiring Rework or Scrap"],
        calculationMethod: "Pure throughput yield calculation.",
        limitations: "Requires strict tracking of units that bypass official rework lanes through informal operator touchups.",
        isFinancial: false
      },
      {
        name: "Defects Per Million Opportunities (DPMO)",
        unit: "DPMO",
        definition: "Normalized Six Sigma quality metric calculating defects against the total potential defect opportunities.",
        formula: "[Total Defects ÷ (Total Units Produced × Opportunities Per Unit)] × 1,000,000",
        requiredInputs: ["Total Defects Count", "Total Units Inspected", "Defect Opportunities per Unit"],
        calculationMethod: "Six Sigma standard normalization.",
        limitations: "Opportunities per unit must be rigorously defined through failure mode engineering (FMEA) to prevent gaming.",
        isFinancial: false
      }
    ]
  },
  {
    id: "cycle-time-lead-time",
    title: "Cycle Time & Lead Time",
    shortDesc: "Compress order-to-delivery lead times and eradicate non-value-added waiting queues.",
    problem: "Excessive waiting in queue buffers, long changeovers, and asynchronous handoffs extending customer lead times.",
    primaryKPI: "Total Lead Time (Hours/Days) & Process Cycle Efficiency (PCE %)",
    baselineRequirement: "Process mining event logs, ERP order timestamp trails, and physical value stream time studies.",
    illustrativeTarget: "Illustrative example: 35–50% lead time compression; PCE increase from 6% to 22%.",
    validationMethod: "Little's Law flow verification, MES start-to-ship timestamp deltas, and OTIF fulfillment auditing.",
    category: "speed",
    kpis: [
      {
        name: "Total Lead Time",
        unit: "Hours or Days",
        definition: "The entire elapsed duration from when a customer order or raw material enters production until finished shipment.",
        formula: "Queue Waiting Time + Material Handling Transit Time + Workcell Processing Cycle Time",
        requiredInputs: ["Queue Duration", "Transit Duration", "Total Cycle Time"],
        calculationMethod: "Cumulative sum of step cycle times and intermediate queue buffer dwell times.",
        limitations: "Requires tracking batch staging time outside active working shifts.",
        isFinancial: false
      },
      {
        name: "Process Cycle Efficiency (PCE)",
        unit: "%",
        definition: "The proportion of total lead time that actually adds customer-recognized value to the product.",
        formula: "(Value-Added Transformation Time ÷ Total Lead Time) × 100",
        requiredInputs: ["Value-Added Time (min)", "Total Lead Time (min)"],
        calculationMethod: "Ratio of pure fabrication touch time to total elapsed factory dwell time.",
        limitations: "Commonly under 10% in un-streamlined manufacturing lines; requires clear criteria for value-added work.",
        isFinancial: false
      },
      {
        name: "Takt Time",
        unit: "Seconds/Unit",
        definition: "The required pace of production needed to match customer demand precisely without overproduction.",
        formula: "Net Available Operating Time ÷ Customer Demand Units",
        requiredInputs: ["Available Operating Seconds per Shift", "Customer Demand Units per Shift"],
        calculationMethod: "Direct pacing benchmark.",
        limitations: "Assumes level-loaded customer pull; volatile demand spikes require flexible buffering or Heijunka leveling.",
        isFinancial: false
      }
    ]
  },
  {
    id: "capacity-utilization",
    title: "Capacity & Asset Utilization",
    shortDesc: "Debottleneck constrained machinery and balance multi-station line capacity.",
    problem: "Capital-intensive CNC, autoclave, or testing stations sit idle due to upstream starving or downstream blocking.",
    primaryKPI: "Bottleneck Utilization (%) & Machine Availability (%)",
    baselineRequirement: "OEE telemetry, maintenance breakdown logs, changeover time records, and buffer capacity limits.",
    illustrativeTarget: "Illustrative example: 82% to 94% uptime on primary constraint stations; elimination of line blocking.",
    validationMethod: "Continuous SCADA telemetry log review, SMED video audits, and discrete-event simulation validation.",
    category: "capacity",
    kpis: [
      {
        name: "Bottleneck Utilization",
        unit: "%",
        definition: "The percentage of scheduled production time that the primary system constraint is actively processing parts.",
        formula: "(Active Processing Time at Constraint ÷ Total Planned Production Time) × 100",
        requiredInputs: ["Active Processing Hours at Constraint", "Planned Production Hours"],
        calculationMethod: "Utilization percentage derived from machine state timers.",
        limitations: "Must exclude uncoordinated processing of non-demanded work that simply builds unnecessary downstream inventory.",
        isFinancial: false
      },
      {
        name: "Availability",
        unit: "%",
        definition: "The ratio of actual operating time to planned production time, reflecting unplanned downtime and breakdown losses.",
        formula: "(Actual Operating Time ÷ Planned Operating Time) × 100",
        requiredInputs: ["Operating Time (Hrs)", "Planned Operating Time (Hrs)"],
        calculationMethod: "Availability ratio from machine telemetry.",
        limitations: "Planned maintenance windows must be consistently handled across comparison periods.",
        isFinancial: false
      }
    ]
  },
  {
    id: "working-capital-inventory",
    title: "Working Capital & Inventory",
    shortDesc: "Reduce excess WIP buffers, free operating cash, and prevent parts obsolescence.",
    problem: "Excess inventory masking underlying line imbalance, consuming floor footprint, and tying up critical working capital.",
    primaryKPI: "Work-in-Progress (WIP Units) & Days Inventory Outstanding (DIO)",
    baselineRequirement: "WMS inventory snapshots, WIP tag counts across workcells, and monthly balance sheet inventory valuations.",
    illustrativeTarget: "Illustrative example: 30–45% WIP reduction, freeing $450k–$1.2M in operating cash.",
    validationMethod: "Physical inventory audit, Little's Law verification ($WIP = Throughput \times Lead Time$), and monthly balance sheet reconciliation.",
    category: "capital",
    kpis: [
      {
        name: "Work-in-Progress (WIP)",
        unit: "Units",
        definition: "The total quantity of subassemblies and materials currently entered into the line that have not yet reached finished goods.",
        formula: "Sum of parts in all station queues and active fixtures",
        requiredInputs: ["Station Queue Counts", "Active Fixture WIP"],
        calculationMethod: "Real-time count or MES work-in-progress tag aggregation.",
        limitations: "Does not reflect monetary valuation unless combined with stage-gate standard cost absorption.",
        isFinancial: false
      },
      {
        name: "Days Inventory Outstanding (DIO)",
        unit: "Days",
        definition: "The average number of days it takes for inventory investment to turn into finished shipments.",
        formula: "(Average Inventory Value ÷ Cost of Goods Sold) × 365",
        requiredInputs: ["Average Inventory Value ($)", "Annual Cost of Goods Sold ($)"],
        calculationMethod: "Standard financial working capital formula.",
        limitations: "Lagging indicator typically computed at month-end or quarter-end closing.",
        isFinancial: true
      }
    ]
  },
  {
    id: "customer-service-delivery",
    title: "Customer Service & Delivery",
    shortDesc: "Ensure on-time, in-full shipment reliability and eradicate delivery expediting costs.",
    problem: "Erratic production lead times causing missed shipping windows, premium freight costs, and strained customer accounts.",
    primaryKPI: "On-Time In-Full (OTIF %) & Order Lead Time Variance",
    baselineRequirement: "ERP shipping manifests, customer delivery receipts, and carrier timestamp confirmations.",
    illustrativeTarget: "Illustrative example: OTIF improvement from 82% to 98.5%; 90% reduction in air freight expedites.",
    validationMethod: "Customer scorecard reconciliation, carrier signed delivery receipts, and quarterly logistics expense audit.",
    category: "service",
    kpis: [
      {
        name: "On-Time In-Full (OTIF)",
        unit: "%",
        definition: "The percentage of customer orders fulfilled with the exact requested quantity on or before the committed delivery date.",
        formula: "(Orders Delivered On-Time & In-Full ÷ Total Orders Dispatched) × 100",
        requiredInputs: ["On-Time In-Full Orders Count", "Total Dispatched Orders"],
        calculationMethod: "Binary evaluation per order line item.",
        limitations: "Depends on whether the delivery date is defined by customer original request date or supplier confirmed promise date.",
        isFinancial: false
      },
      {
        name: "Expedited Freight Cost",
        unit: "$/month",
        definition: "Unbudgeted premium shipping expenditure incurred to meet delivery deadlines after internal delays.",
        formula: "Sum of all hot-shot, air freight, and premium courier charges above standard freight contract rates",
        requiredInputs: ["Actual Freight Paid", "Contract Standard Freight Rate"],
        calculationMethod: "Variance delta on logistics freight invoices.",
        limitations: "Can be influenced by external carrier fuel surcharges and port congestion beyond plant control.",
        isFinancial: true
      }
    ]
  },
  {
    id: "risk-reliability-assurance",
    title: "Risk, Reliability & Operational Assurance",
    shortDesc: "Ensure audit-proof governance, process capability, and uncompromised safety margins.",
    problem: "Operational gains erode after pilot phase due to lack of institutional controls, model drift, and undocumented interventions.",
    primaryKPI: "Process Capability Index (Cpk) & Governance Compliance Audit Pass Rate",
    baselineRequirement: "Standard Operating Procedure (SOP) audit records, model validation test benches, and compliance checklists.",
    illustrativeTarget: "Illustrative example: Sustained Cpk ≥ 1.67 across critical dimensions; 100% audit evidence traceability.",
    validationMethod: "Quarterly independent operational audits, automated AI model drift surveillance, and Finance benefits sign-off.",
    category: "risk",
    kpis: [
      {
        name: "Process Capability Index (Cpk)",
        unit: "Ratio",
        definition: "Statistical indicator of how closely a process is running to its specification limits relative to its natural variation.",
        formula: "Min [ (USL - Mean) ÷ (3σ), (Mean - LSL) ÷ (3σ) ]",
        requiredInputs: ["Upper Spec Limit (USL)", "Lower Spec Limit (LSL)", "Process Mean", "Standard Deviation (σ)"],
        calculationMethod: "Standard Six Sigma capability formula.",
        limitations: "Requires underlying process data to be normally distributed and in statistical control.",
        isFinancial: false
      },
      {
        name: "Mean Time Between Failures (MTBF)",
        unit: "Hours",
        definition: "The predicted elapsed operating time between inherent mechanical or electrical equipment breakdowns.",
        formula: "Total Operational Running Time ÷ Number of Breakdown Failures",
        requiredInputs: ["Total Operating Hours", "Failure Count"],
        calculationMethod: "Reliability engineering calculation.",
        limitations: "Excludes scheduled preventative maintenance and standard tooling replacement downtime.",
        isFinancial: false
      }
    ]
  }
];

export interface ValueEngineeringStage {
  stageId: string;
  name: string;
  subtitle: string;
  description: string;
  keyActivities: string[];
  deliverables: string[];
  governanceGates: string;
  toolConnection: string;
}

export const VALUE_CREATION_CYCLE_STAGES: ValueEngineeringStage[] = [
  {
    stageId: "S0",
    name: "S0 — Frame",
    subtitle: "Define the Business Problem & Scope",
    description: "Establish the exact operational boundary, decision authority, accountable business owner, and financial value target before deploying engineering or analytics.",
    keyActivities: [
      "Identify the executive business owner and operational sponsor.",
      "Define the bounded value stream and physical/system scope.",
      "Quantify the initial business problem and potential financial prize.",
      "Document key operational constraints, safety policies, and union/regulatory boundaries."
    ],
    deliverables: ["Project Charter", "Value Stream Scope Document", "Constraint Register", "Target Value Estimate"],
    governanceGates: "Formal sponsor sign-off on problem statement, project scope, and target value bounds.",
    toolConnection: "Outcome & KPI Workspace — Initial target definition and baseline criteria selection."
  },
  {
    stageId: "S1",
    name: "S1 — Baseline",
    subtitle: "Measure Current Operational Reality",
    description: "Measure current performance using documented metrics, validated formulas, timestamped data sources, and explicit measurement time windows.",
    keyActivities: [
      "Perform physical value stream walk and Gemba observation.",
      "Extract SCADA, MES, and ERP event logs with validated timestamp accuracy.",
      "Compute baseline cycle times, waiting buffers, First Pass Yield, and unit costs.",
      "Establish Gage R&R measurement system reliability and SPC capability."
    ],
    deliverables: ["Current-State Value Stream Map", "Baseline Metric Scorecard", "Gage R&R Assessment", "Data Source Catalog"],
    governanceGates: "Operational owner validation that baseline data truthfully represents current factory performance.",
    toolConnection: "Lean Sigma Calculator & VSM Analytics — Calculate current PCE, DPMO, throughput, and bottleneck."
  },
  {
    stageId: "S2",
    name: "S2 — Model",
    subtitle: "Evaluate Solutions, Costs & Assumptions",
    description: "Design future-state options, combine Lean methods with AI/automation, evaluate costs, assumptions, risks, and construct a mathematical business case.",
    keyActivities: [
      "Design future-state cellular flow, pull systems, or SMED setup overhauls.",
      "Model multi-tier AI applications (e.g. predictive maintenance, inline defect vision).",
      "Model queueing dynamics and stochastic line behavior.",
      "Calculate implementation CapEx, ongoing OpEx, net benefits, and payback period."
    ],
    deliverables: ["Future-State VSM Architecture", "Discrete-Event Simulation Model", "Financial Business Case", "Risk & Failure Mode Matrix"],
    governanceGates: "Technical feasibility review and preliminary Finance review of economic assumptions.",
    toolConnection: "VSM Discrete Simulator & Scenario Modeler — Test WIP, cycle times, blocking, and financial ROI."
  },
  {
    stageId: "S3",
    name: "S3 — Prove",
    subtitle: "Test Against Predefined Success Criteria",
    description: "Execute a controlled pilot or simulation test against strict, predetermined operational success criteria before committing enterprise capital.",
    keyActivities: [
      "Deploy pilot on a single production line, workcell, or shift.",
      "Test deterministic safety interlocks and Tier 0 PLC boundaries.",
      "Measure pilot throughput, defect reduction, and operator touch times.",
      "Compare observed pilot data against S2 simulation predictions."
    ],
    deliverables: ["Pilot Execution Report", "Variance vs Model Scorecard", "Frontline Usability Feedback", "Go/No-Go Decision Memo"],
    governanceGates: "Go/No-Go review: Did the intervention meet predefined statistical and operational hurdles without side effects?",
    toolConnection: "Scenario Comparison Matrix — Before-and-after variance verification against pilot criteria."
  },
  {
    stageId: "S4",
    name: "S4 — Bank",
    subtitle: "Implement & Verify Realized Business Benefits",
    description: "Scale the proven solution across the enterprise and verify realized business benefits directly in the audited financial ledger.",
    keyActivities: [
      "Roll out standardized work instructions, tooling, and governed AI models.",
      "Train frontline operators, supervisors, and industrial engineers.",
      "Track realized scrap reduction, headcount reallocation, and throughput gain in P&L.",
      "Secure formal Finance controller sign-off on audited cost savings."
    ],
    deliverables: ["Standard Operating Procedures (SOPs)", "Training & Competency Records", "Audited Savings Settlement", "Finance Sign-Off Certificate"],
    governanceGates: "Formal Finance sign-off: Verification that benefits flowed through to EBITDA or working capital reduction.",
    toolConnection: "Financial Impact Engine — Distinguish simulated estimates from banked financial outcomes."
  },
  {
    stageId: "S5",
    name: "S5 — Assure",
    subtitle: "Maintain Governance, Monitoring & Audit",
    description: "Maintain continuous governance, risk controls, model drift monitoring, statistical process control, and audit evidence across the operating lifecycle.",
    keyActivities: [
      "Deploy automated SPC charts with out-of-control warning triggers.",
      "Monitor AI models for telemetry data drift, concept drift, and accuracy decay.",
      "Conduct quarterly operational reviews and 5S/Standard Work audits.",
      "Maintain tamper-evident audit logs and re-map the next emerging system constraint."
    ],
    deliverables: ["SPC Control Plan", "Model Monitoring Telemetry Dashboard", "Quarterly Audit Evidence Pack", "Continuous Improvement Backlog"],
    governanceGates: "Ongoing quarterly governance committee review and operational recertification.",
    toolConnection: "Continuous Assurance Matrix — Lifecycle monitoring to prevent performance degradation."
  }
];

export interface IndustryProfile {
  id: string;
  name: string;
  subtitle: string;
  commonChallenges: string[];
  operationalFinancialKPIs: string[];
  leanEngineeringMethods: string[];
  aiSimulationApplications: string[];
  valueValidationApproach: string;
  riskAssuranceConsiderations: string[];
}

export const INDUSTRIES_DETAILED: IndustryProfile[] = [
  {
    id: "manufacturing-production",
    name: "Manufacturing & Industrial Production",
    subtitle: "Discrete, High-Precision & Process Manufacturing",
    commonChallenges: [
      "Unexpected bottleneck shifts between complex machining centers and heat-treatment ovens.",
      "High scrap rates and expensive rework loops caused by machine tool thermal drift.",
      "Lengthy changeover times and high batch sizes driving excessive WIP inventory.",
      "Frontline operator variation and lack of standardized work adherence across shifts."
    ],
    operationalFinancialKPIs: [
      "OEE (Overall Equipment Effectiveness)",
      "First Pass Yield (FPY)",
      "Process Cycle Efficiency (PCE %)",
      "Direct Transformation Cost per Unit",
      "Cost of Poor Quality (COPQ)"
    ],
    leanEngineeringMethods: [
      "Value Stream Mapping & Takt Time Pacing",
      "SMED (Single-Minute Exchange of Die) Quick Changeovers",
      "Poka-Yoke In-Line Error Proofing & 5S Standardization",
      "Theory of Constraints Drum-Buffer-Rope Scheduling"
    ],
    aiSimulationApplications: [
      "Discrete-event plant simulation to evaluate buffer sizes before capital purchase.",
      "Automated optical computer vision for high-speed inline defect classification.",
      "Predictive machine health telemetry alerts to prevent catastrophic spindle failures."
    ],
    valueValidationApproach: "Audited monthly scrap reduction credits against ERP work-orders and verified 30-day continuous line throughput metrics.",
    riskAssuranceConsiderations: [
      "Strict PLC Tier 0 deterministic safety interlocks preventing AI override of physical emergency stops.",
      "Model drift monitoring on vibration and acoustic sensor streams."
    ]
  },
  {
    id: "retail-consumer",
    name: "Retail, Wholesale & Consumer",
    subtitle: "Omnichannel Fulfillment, FMCG & Distribution",
    commonChallenges: [
      "Inventory obsolescence and stock-outs caused by bullwhip demand swings.",
      "Pick-and-pack fulfillment bottlenecks during seasonal e-commerce volume surges.",
      "High return merchandise authorization (RMA) processing costs and secondary inspection queues."
    ],
    operationalFinancialKPIs: [
      "Order Fulfillment Cycle Time",
      "On-Time In-Full (OTIF %)",
      "Days Inventory Outstanding (DIO)",
      "Cost per Dispatched Order",
      "Pick Accuracy Rate (%)"
    ],
    leanEngineeringMethods: [
      "Warehouse Spaghetti Diagramming & Motion Minimization",
      "Cross-docking and Kanban pull replenishment",
      "Standardized Packing Cells and Ergo-Balanced Workstations"
    ],
    aiSimulationApplications: [
      "Dynamic warehouse slotting and AGV transit route optimization.",
      "Demand volatility pattern detection and automated replenishment trigger calibration.",
      "Returns triage computer vision classification."
    ],
    valueValidationApproach: "Reconciliation of warehouse labor payroll hours vs dispatched carton volume and 3PL freight invoice audit.",
    riskAssuranceConsiderations: [
      "Customer privacy compliance in order data streams.",
      "Peak-season system failover and manual fallback standard procedures."
    ]
  },
  {
    id: "mobility-logistics",
    name: "Mobility, Logistics & Infrastructure",
    subtitle: "Freight, Fleet, Intermodal & Cold Chain",
    commonChallenges: [
      "Port and terminal turnaround delays causing high demurrage penalties.",
      "Fleet deadhead miles and suboptimal multi-stop routing schedules.",
      "Cold chain temperature excursions causing regulatory product write-offs."
    ],
    operationalFinancialKPIs: [
      "Fleet Asset Utilization (%)",
      "Turnaround Time per Gate In/Out",
      "Cost per Ton-Mile",
      "Cold Chain Compliance Rate (%)",
      "Unplanned Fleet Breakdown Hours"
    ],
    leanEngineeringMethods: [
      "Total Productive Maintenance (TPM) on fleet assets",
      "Visual management dashboards at staging gates",
      "Route standard work and root-cause transit delay Kaizens"
    ],
    aiSimulationApplications: [
      "Multi-echelon fleet transit simulation under weather and traffic variability.",
      "Telemetry anomaly detection for refrigerated container temperature drift.",
      "Predictive vehicle component replacement scheduling."
    ],
    valueValidationApproach: "Audited fuel and carrier freight settlements combined with telematics odometer verification.",
    riskAssuranceConsiderations: [
      "Driver hours-of-service compliance regulations.",
      "Cargo liability insurance documentation and chain-of-custody cryptographic logging."
    ]
  },
  {
    id: "financial-insurance",
    name: "Financial Services & Insurance",
    subtitle: "Underwriting, Claims Triage & Banking Operations",
    commonChallenges: [
      "Lengthy commercial loan underwriting turnaround times losing prime clients to competitors.",
      "Manual multi-system data re-entry causing processing errors and rework backlogs.",
      "Slow insurance claims triage creating customer frustration and high handling cost."
    ],
    operationalFinancialKPIs: [
      "Straight-Through Processing (STP Rate %)",
      "Underwriting Cycle Time (Days)",
      "Claims Settlement Turnaround Time",
      "Cost per Transaction",
      "Compliance Audit Defect Rate"
    ],
    leanEngineeringMethods: [
      "Transactional Value Stream Mapping (TVSM) of digital paperwork flow",
      "Elimination of duplicate approval checkpoints and redundant verification gates",
      "First-in, first-out (FIFO) queue discipline and Heijunka casework leveling"
    ],
    aiSimulationApplications: [
      "Discrete simulation of claims triage queues under catastrophe surge scenarios.",
      "Automated document classification and low-risk underwriting decision support.",
      "Anomaly detection for fraudulent claim pattern recognition."
    ],
    valueValidationApproach: "Quarterly operational headcount productivity metrics and audited claims settlement cost variance.",
    riskAssuranceConsiderations: [
      "Model explainability requirements (Fair Lending / FCRA / GDPR compliance).",
      "Absolute segregation of duties and tamper-evident decision audit logs."
    ]
  },
  {
    id: "healthcare-lifesciences",
    name: "Healthcare & Life Sciences",
    subtitle: "Clinical Operations, Pharma Batch & MedTech",
    commonChallenges: [
      "Emergency department and operating room scheduling bottlenecks and patient wait times.",
      "Stringent pharmaceutical batch release testing delays tying up working capital.",
      "MedTech cleanroom defect generation requiring complete regulatory lot quarantine."
    ],
    operationalFinancialKPIs: [
      "Patient Flow Cycle Time & Door-to-Doctor Time",
      "Pharma Batch Release Lead Time (Days)",
      "GxP Non-Conformance & Deviation Rate",
      "Operating Room Utilization (%)",
      "Cost per Patient Procedure / Batch"
    ],
    leanEngineeringMethods: [
      "Clinical Flow VSM and Patient Journey Optimization",
      "5S Cleanroom Standardization and Visual Quality Controls",
      "DMAIC Root Cause Investigations on Batch Deviations"
    ],
    aiSimulationApplications: [
      "Hospital patient arrival and bed allocation discrete-event simulation.",
      "Predictive bioreactor yield and contamination early-warning models.",
      "Computer vision for automated vial inspection and particulate detection."
    ],
    valueValidationApproach: "Audited reduction in batch quarantine dwell days and hospital clinical documentation time studies.",
    riskAssuranceConsiderations: [
      "FDA 21 CFR Part 11 electronic records validation.",
      "HIPAA data privacy guarantees and clinical safety board approvals."
    ]
  },
  {
    id: "energy-utilities",
    name: "Energy, Utilities & Natural Resources",
    subtitle: "Power Generation, Grid Networks & Refining",
    commonChallenges: [
      "High cost of unplanned turbine, compressor, or grid transmission outages.",
      "Volatile renewable power generation balancing and grid frequency stability.",
      "Safety-critical turnaround maintenance overruns inflating capital expenditures."
    ],
    operationalFinancialKPIs: [
      "Asset Availability & Forced Outage Rate (%)",
      "Heat Rate & Energy Conversion Efficiency",
      "Maintenance Turnaround Schedule Adherence",
      "Mean Time Between Failures (MTBF)",
      "Environmental Compliance Excursion Count"
    ],
    leanEngineeringMethods: [
      "Critical Chain Project Management (CCPM) for plant shutdowns",
      "RCM (Reliability-Centered Maintenance) and Autonomous Maintenance",
      "Gemba Safety Audits and standardized shift turnover"
    ],
    aiSimulationApplications: [
      "Digital twin simulation of refinery throughput under varying crude feedstock quality.",
      "Acoustic and vibration AI anomaly detection on high-pressure turbines.",
      "Grid renewable load balancing optimization algorithms."
    ],
    valueValidationApproach: "Audited reduction in unplanned downtime hours verified against national grid dispatcher settlement reports.",
    riskAssuranceConsiderations: [
      "NERC CIP industrial cybersecurity regulations.",
      "High-hazard environmental containment interlocks."
    ]
  },
  {
    id: "tech-telecom",
    name: "Technology, Media & Telecom",
    subtitle: "Software Engineering, Cloud Infrastructure & 5G",
    commonChallenges: [
      "Long CI/CD build queues and flaky testing cycles slowing software delivery velocity.",
      "Cloud infrastructure bill overruns due to idle over-provisioned instances.",
      "Telecom network outage response times and field technician dispatch delays."
    ],
    operationalFinancialKPIs: [
      "Deployment Frequency & Lead Time for Changes (DORA)",
      "Mean Time to Recovery (MTTR)",
      "Cloud Infrastructure Cost per Active User",
      "Field Dispatch First-Time Fix Rate",
      "Service Level Agreement (SLA) Compliance (%)"
    ],
    leanEngineeringMethods: [
      "Value stream mapping of the DevOps and code-review pipeline",
      "WIP limit enforcement on engineering sprint backlogs",
      "Blameless post-mortem root-cause analysis"
    ],
    aiSimulationApplications: [
      "Cloud capacity autoscaling simulation under synthetic traffic stress.",
      "AI-driven automated incident correlation and log triage.",
      "Predictive fiber-optic signal degradation modeling."
    ],
    valueValidationApproach: "Cloud provider monthly bill variance and audited DORA velocity telemetry from source repositories.",
    riskAssuranceConsiderations: [
      "SOC2 Type II compliance audit trails.",
      "Data residency and customer encryption key governance."
    ]
  },
  {
    id: "public-defense",
    name: "Public Sector, Defense & Aerospace",
    subtitle: "Government Services, Fleet Maintenance & Mission Systems",
    commonChallenges: [
      "Depot-level aircraft and military vehicle overhaul maintenance turnaround backlogs.",
      "Citizen license and permit processing queues spanning multiple bureaucratic silos.",
      "Complex multi-tier defense procurement lead times and single-source supplier risks."
    ],
    operationalFinancialKPIs: [
      "Depot Repair Cycle Time (Days)",
      "Fleet Mission Capable Rate (%)",
      "Permit / Case Turnaround Time (Days)",
      "Cost of Defense Procurement Variance",
      "Regulatory Audit Compliance Rate"
    ],
    leanEngineeringMethods: [
      "Air Force / Defense Lean Six Sigma (CPI) frameworks",
      "Visual pull replenishment for critical spare parts in maintenance depots",
      "Standardized Administrative Workflows and Touchpoint Reduction"
    ],
    aiSimulationApplications: [
      "Discrete simulation of depot maintenance repair queues under surge conflict scenarios.",
      "Predictive component failure modeling for aircraft turbine engines.",
      "Automated procurement documentation compliance checking."
    ],
    valueValidationApproach: "Audited depot repair cycle time logs and defense logistics agency inventory availability reports.",
    riskAssuranceConsiderations: [
      "ITAR and defense security clearance protocols.",
      "Public transparency and anti-deficiency legislative constraints."
    ]
  }
];

export interface UseCase {
  id: string;
  title: string;
  industry: string;
  businessProblem: string;
  baselineMetrics: { label: string; value: string }[];
  proposedIntervention: string;
  simulationPilotMethod: string;
  kpiComparison: { metric: string; before: string; after: string; delta: string }[];
  financialImpact: string;
  assuranceMechanism: string;
}

export const USE_CASES_DATA: UseCase[] = [
  {
    id: "reducing-manufacturing-bottlenecks",
    title: "Relieving High-Precision Machining Constraint on Powertrain Line",
    industry: "Manufacturing & Automotive",
    businessProblem: "A multi-axis CNC milling station was operating at 94% utilization with 140 parts queueing in buffer, while upstream cutting was starving and downstream assembly was running intermittently.",
    baselineMetrics: [
      { label: "Cycle Time at CNC", value: "68 seconds" },
      { label: "Waiting Buffer", value: "140 units (3.2 hours wait)" },
      { label: "Line Throughput", value: "52.9 units/hour" },
      { label: "Total Lead Time", value: "18.5 hours" }
    ],
    proposedIntervention: "Applied SMED to reduce CNC fixture changeovers from 45 min to 12 min; balanced tooling passes; instituted electronic Drum-Buffer-Rope pull signaling from assembly.",
    simulationPilotMethod: "Built discrete-event simulation model in VSM Simulator testing 500-hour production run with 15% stochastic variation before altering physical line tooling.",
    kpiComparison: [
      { metric: "Effective CNC Cycle Time", before: "68s", after: "48s", delta: "-29.4%" },
      { metric: "Line Throughput", before: "52.9 u/hr", after: "75.0 u/hr", delta: "+41.8%" },
      { metric: "WIP in Front of CNC", before: "140 units", after: "32 units", delta: "-77.1%" },
      { metric: "Overall Line Lead Time", before: "18.5 hrs", after: "7.2 hrs", delta: "-61.1%" }
    ],
    financialImpact: "Illustrative result: $410,000 annualized labor overtime savings and $260,000 freed working capital from WIP compression.",
    assuranceMechanism: "Automated SPC X-bar/R charts tracking machine cycle time and weekly Finance reconciliation of production labor overtime logs."
  },
  {
    id: "improving-first-pass-yield",
    title: "Inline AI Vision & Error Proofing for Electronics SMT Assembly",
    industry: "Electronics & High-Tech Manufacturing",
    businessProblem: "Surface-mount assembly line experienced 4.2% solder bridging defect rate, requiring 4 dedicated manual rework technicians and causing 120 DPMO customer field returns.",
    baselineMetrics: [
      { label: "First Pass Yield (FPY)", value: "95.8%" },
      { label: "Defect Rate", value: "4.2%" },
      { label: "Quality Capability", value: "3.2 σ (4,200 DPMO)" },
      { label: "Annual Scrap & Rework", value: "$380,000 / year" }
    ],
    proposedIntervention: "Deployed automated high-resolution optical inspection with in-line convolutional neural network classifier paired with Poka-Yoke solder paste stencil interlocks.",
    simulationPilotMethod: "Tested computer vision model against 50,000 historical optical images achieving 99.8% precision before deploying inline pilot on Shift 1.",
    kpiComparison: [
      { metric: "First Pass Yield", before: "95.8%", after: "99.3%", delta: "+3.5% pts" },
      { metric: "Defect Rate", before: "4.2%", after: "0.7%", delta: "-83.3%" },
      { metric: "Quality Capability", before: "3.2 σ", after: "4.8 σ", delta: "+1.6 σ" },
      { metric: "Rework Technicians", before: "4 operators", after: "1 operator", delta: "-75.0%" }
    ],
    financialImpact: "Illustrative result: $290,000 direct annual scrap reduction and $180,000 customer warranty claim avoidance.",
    assuranceMechanism: "Daily automated calibration test coupons and ISO 9001 compliance audit verification of defect logs."
  },
  {
    id: "reducing-warehouse-waiting",
    title: "Cross-Docking & Dynamic Slotting Optimization in 3PL Facility",
    industry: "Logistics & Supply Chain",
    businessProblem: "Distribution center experienced severe dock congestion with incoming pallets waiting an average of 4.8 hours on receiving floor before putaway, causing late order dispatches.",
    baselineMetrics: [
      { label: "Staging Waiting Time", value: "4.8 hours" },
      { label: "Forklift Transit Distance", value: "14.2 km / shift / driver" },
      { label: "Dock-to-Stock Time", value: "7.4 hours" },
      { label: "On-Time Dispatch Rate", value: "84.2%" }
    ],
    proposedIntervention: "Restructured receiving layout into fast-turn cross-dock lanes; implemented dynamic AI slotting algorithm based on 14-day velocity SKU forecasts.",
    simulationPilotMethod: "Simulated warehouse floor traffic vectors and pallet queue accumulation in discrete queue model.",
    kpiComparison: [
      { metric: "Staging Waiting Time", before: "4.8 hrs", after: "1.1 hrs", delta: "-77.1%" },
      { metric: "Forklift Transit Distance", before: "14.2 km", after: "7.8 km", delta: "-45.1%" },
      { metric: "Dock-to-Stock Time", before: "7.4 hrs", after: "2.3 hrs", delta: "-68.9%" },
      { metric: "On-Time Dispatch Rate", before: "84.2%", after: "98.1%", delta: "+13.9% pts" }
    ],
    financialImpact: "Illustrative result: $340,000 reduction in warehouse overtime and $120,000 elimination of carrier detention penalties.",
    assuranceMechanism: "WMS timestamp audit for every pallet receipt and weekly forklift telemetry safety reviews."
  },
  {
    id: "evaluating-ai-automation-decision",
    title: "Governed Automated Document Underwriting Triage in Commercial Banking",
    industry: "Financial Services",
    businessProblem: "Small business loan processing required 9 business days of manual financial statement extraction across 3 specialist analysts per application.",
    baselineMetrics: [
      { label: "Application Turnaround", value: "9.2 business days" },
      { label: "Straight-Through Processing", value: "4.5%" },
      { label: "Cost per Application", value: "$420" },
      { label: "Data Extraction Errors", value: "6.8%" }
    ],
    proposedIntervention: "Deployed Tier 1 retrieval-grounded extraction agent combined with Tier 4 policy interlocks and Tier 5 mandatory human sign-off for loans >$250k.",
    simulationPilotMethod: "Executed shadow validation run on 1,500 historical closed loans comparing AI recommendation vs senior credit committee actual decisions.",
    kpiComparison: [
      { metric: "Application Turnaround", before: "9.2 days", after: "1.8 days", delta: "-80.4%" },
      { metric: "Straight-Through Processing", before: "4.5%", after: "42.0%", delta: "+37.5% pts" },
      { metric: "Cost per Application", before: "$420", after: "$115", delta: "-72.6%" },
      { metric: "Data Extraction Errors", before: "6.8%", after: "0.4%", delta: "-94.1%" }
    ],
    financialImpact: "Illustrative result: $780,000 annual underwriting operations savings and 28% increase in booked loan volume.",
    assuranceMechanism: "Monthly fair-lending algorithmic bias audit and 100% cryptographic decision evidence trail archived for bank examiners."
  }
];

export interface ValueEngineeringService {
  id: string;
  name: string;
  tagline: string;
  problemSolved: string;
  deliverables: string[];
  measurableBusinessRelevance: string;
  cycleStage: string;
}

export const VALUE_SERVICES: ValueEngineeringService[] = [
  {
    id: "outcome-kpi-discovery",
    name: "Outcome & KPI Discovery",
    tagline: "Define the Problem, Baseline & Success Criteria",
    problemSolved: "Organizations frequently launch technology or automation initiatives without clear financial targets, baselines, or executive operational ownership.",
    deliverables: [
      "Target Business Outcome Charter",
      "KPI Definition & Data Source Catalog",
      "Process Boundary & Scope Agreement",
      "Operational Readiness Assessment"
    ],
    measurableBusinessRelevance: "Ensures every subsequent dollar of engineering or software spend is tied to an explicit, measurable P&L or throughput target.",
    cycleStage: "S0 — Frame"
  },
  {
    id: "lean-value-stream-analysis",
    name: "Lean & Value Stream Analysis",
    tagline: "Identify Waste, Bottlenecks & Process Constraints",
    problemSolved: "Operational complexity conceals hidden queues, idle buffers, and excessive motion that extend customer lead time and inflate costs.",
    deliverables: [
      "Current-State Value Stream Map",
      "DOWNTIME 8-Waste Identification Audit",
      "Theory of Constraints Bottleneck Identification",
      "Takt Time & Process Cycle Efficiency (PCE) Audit"
    ],
    measurableBusinessRelevance: "Pinpoints the exact operational constraints limiting plant throughput rather than creating local sub-optimizations.",
    cycleStage: "S1 — Baseline"
  },
  {
    id: "ai-engineering-solution-design",
    name: "AI & Engineering Solution Design",
    tagline: "Architect Practical, Scalable & Governed Interventions",
    problemSolved: "Generic AI models deployed without physical engineering integration fail to withstand factory floor conditions or adhere to strict tolerances.",
    deliverables: [
      "Future-State Engineering Blueprint",
      "Multi-Tier Agentic AI Architecture (Tiers 0–6)",
      "Poka-Yoke Error Proofing & Cellular Flow Design",
      "Industrial Telemetry Integration Plan"
    ],
    measurableBusinessRelevance: "Designs a robust future state combining physical Lean error-proofing with governed predictive analytics.",
    cycleStage: "S2 — Model"
  },
  {
    id: "simulation-scenario-testing",
    name: "Simulation & Scenario Testing",
    tagline: "Test Operational Changes Before Committing Capital",
    problemSolved: "Physical reconfiguration of assembly lines or large software rollouts risk unforeseen line blocking, starvation, and costly production downtime.",
    deliverables: [
      "Discrete-Event Production Line Simulation",
      "Buffer Sensitivity & Blocking Analysis",
      "Scenario Comparison Scorecards",
      "Stochastic Risk & Variability Model"
    ],
    measurableBusinessRelevance: "Allows executive and plant leadership to de-risk investments by validating line throughput in a digital sandbox first.",
    cycleStage: "S2 — Model & S3 — Prove"
  },
  {
    id: "value-engineering-realization",
    name: "Value Engineering & Realization",
    tagline: "Quantify Benefits & Verify Banked Financial Results",
    problemSolved: "Many transformation initiatives claim theoretical gains that never appear as audited savings in executive P&L or working capital accounts.",
    deliverables: [
      "Financial ROI & Payback Sensitivity Model",
      "Implementation Buffer Schedule (Critical Chain)",
      "Audited Cost Savings Verification Plan",
      "Finance-Approved Benefits Sign-Off"
    ],
    measurableBusinessRelevance: "Connects operational improvements directly to bottom-line EBITDA uplift and bankable financial savings.",
    cycleStage: "S4 — Bank"
  },
  {
    id: "governance-assurance",
    name: "Governance & Continuous Assurance",
    tagline: "Maintain Controls, Monitoring & Audit Evidence",
    problemSolved: "Improvements deteriorate over time due to operator turnover, lack of standard work reinforcement, and unmonitored AI model drift.",
    deliverables: [
      "Statistical Process Control (SPC) Monitoring System",
      "Continuous Model Drift & Telemetry Surveillance",
      "Frontline Standard Operating Procedures (SOPs)",
      "Quarterly Executive Assurance Audit Packs"
    ],
    measurableBusinessRelevance: "Protects enterprise gains indefinitely, ensuring that operational and financial improvements compound over time.",
    cycleStage: "S5 — Assure"
  }
];
