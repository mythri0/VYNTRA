// Industry sector taxonomy
export interface IndustryCategory {
  title: string;
  description: string;
  sectors: string[];
}

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    title: "Manufacturing & Industrial",
    description: "Discrete and process manufacturing excellence, smart production lines, and quality optimization.",
    sectors: [
      "Automotive & Powertrain",
      "EV & Battery Manufacturing",
      "Aerospace & Defense",
      "Electronics & SMT Lines",
      "Industrial Equipment & Machinery",
      "Chemical & Polymers",
      "Mining & Heavy Metals"
    ]
  },
  {
    title: "Energy & Utilities",
    description: "Grid asset optimization, uptime resilience, and predictive maintenance cascades.",
    sectors: [
      "Power Generation & Grid Utilities",
      "Renewable Energy (Solar & Wind)",
      "EV Charging Networks",
      "Oil, Gas & Refining Operations"
    ]
  },
  {
    title: "Healthcare & Life Sciences",
    description: "Clinical flow enhancement, GxP compliance, and high-precision pharmaceutical batch production.",
    sectors: [
      "Hospitals & Clinical Flow Operations",
      "Pharmaceutical Manufacturing",
      "Medical Devices & Diagnostics",
      "Biotechnology & Genomics Labs"
    ]
  },
  {
    title: "Financial Services",
    description: "Loan origination cycles, fraud triage flow, underwriting automation, and STP processing.",
    sectors: [
      "Retail & Commercial Banking",
      "Insurance Underwriting & Claims",
      "FinTech & Wealth Management"
    ]
  },
  {
    title: "Technology & Telecom",
    description: "CI/CD bottleneck reduction, incident response cycles, and telco network deployment.",
    sectors: [
      "Software & SaaS Engineering",
      "IT Services & Managed Infrastructure",
      "Telecommunications & 5G Infrastructure"
    ]
  },
  {
    title: "Supply Chain & Logistics",
    description: "Warehouse touchpoint reduction, multi-echelon inventory balancing, and fleet turnaround time.",
    sectors: [
      "Intermodal Transportation",
      "Contract Logistics & 3PL/4PL",
      "Automated Warehousing & Distribution",
      "Fleet & Cold Chain Operations"
    ]
  },
  {
    title: "Retail & Consumer",
    description: "Omnichannel fulfillment velocity, demand-driven replenishment, and shrink prevention.",
    sectors: [
      "Omnichannel Retail Operations",
      "E-Commerce Fulfillment Centers",
      "FMCG High-Speed Packaging",
      "Consumer Products & Durables"
    ]
  },
  {
    title: "Public Sector & Infrastructure",
    description: "Citizen service flow, permit turnaround acceleration, and municipal asset management.",
    sectors: [
      "Government & Municipal Administration",
      "Higher Education Operations",
      "Smart City Infrastructure & Mobility"
    ]
  }
];

// Eight Wastes (DOWNTIME) taxonomy
export interface WasteDefinition {
  letter: string;
  name: string;
  tagline: string;
  definition: string;
  operationalSymptoms: string[];
  potentialDataSources: string[];
  analyticalApproach: string;
  possibleKPI: string;
  improvementDirection: string;
}

export const EIGHT_WASTES: WasteDefinition[] = [
  {
    letter: "D",
    name: "Defects",
    tagline: "Rework, scrap, errors, and incorrect information",
    definition: "Products or documentation that do not conform to specifications, resulting in inspection time, rework costs, scrap, or warranty claims.",
    operationalSymptoms: [
      "Rework stations experiencing high queues",
      "Secondary quality inspection gates backing up",
      "Frequent customer dispute or RMA spikes"
    ],
    potentialDataSources: [
      "MES quality logs",
      "Automated Optical Inspection (AOI) data",
      "ERP credit memo and warranty tables"
    ],
    analyticalApproach: "Statistical Process Control (SPC), Weibull failure analysis, multi-tier anomaly detection classifiers.",
    possibleKPI: "First Pass Yield (FPY), DPMO, Scrap Cost per Unit",
    improvementDirection: "Deploy vision-based inline anomaly detection, root cause Pareto cascades, and automated tolerance interlocks."
  },
  {
    letter: "O",
    name: "Overproduction",
    tagline: "Producing more than needed or before needed",
    definition: "Manufacturing items faster, sooner, or in greater quantities than required by downstream processes or customer pull.",
    operationalSymptoms: [
      "Full warehouse staging lanes blocking transit",
      "High finished-goods obsolescence write-offs",
      "Batch sizes exceeding actual takt demand"
    ],
    potentialDataSources: [
      "WMS bin occupancy trends",
      "Sales vs. Production order variance",
      "Batch ticket timestamp logs"
    ],
    analyticalApproach: "Takt time alignment modeling, pull-system Kanban simulation, economic order quantity optimization.",
    possibleKPI: "Overproduction Ratio, Inventory Days of Supply, Finished Goods Turn Rate",
    improvementDirection: "Transition to digital Kanban with dynamic customer demand coupling and SMED quick-changeover lines."
  },
  {
    letter: "W",
    name: "Waiting",
    tagline: "Idle time while waiting for next process step",
    definition: "Operators or automated machinery standing idle waiting for materials, specifications, maintenance approvals, or preceding processes.",
    operationalSymptoms: [
      "Machine operator idle logs during shift changes",
      "Batches parked in buffer racks awaiting QA sign-off",
      "Technicians waiting on tooling or ERP release"
    ],
    potentialDataSources: [
      "SCADA machine state timers",
      "MES operator login/logout timestamps",
      "Process Mining event logs"
    ],
    analyticalApproach: "Process mining timestamp delta analysis, queuing theory bottleneck calculation, Little's Law verification.",
    possibleKPI: "Waiting Time vs. Cycle Time ratio, Machine Idleness %, Touch Time %",
    improvementDirection: "Implement agentic workflow dispatchers, automated QA approvals for low-risk lots, and buffer alarm thresholds."
  },
  {
    letter: "N",
    name: "Non-Utilized Talent",
    tagline: "Underusing people's skills, knowledge, and capabilities",
    definition: "Failing to engage operators, engineers, and staff in continuous improvement, problem-solving, and ergonomic optimization.",
    operationalSymptoms: [
      "Kaizen suggestion boxes empty or ignored",
      "Engineers spending hours manually copying Excel data",
      "High frontline turnover and disconnected operators"
    ],
    potentialDataSources: [
      "HR skill matrix databases",
      "Kaizen program implementation metrics",
      "Repetitive digital task audit logs"
    ],
    analyticalApproach: "Task repetitive strain audit, operational capability heatmaps, automated skill-to-workflow assignment modeling.",
    possibleKPI: "Employee Improvement Participation %, Non-Core Admin Hours %, Skill Versatility Index",
    improvementDirection: "Automate repetitive data transcription with deterministic agents to free engineers for root-cause Kaizens."
  },
  {
    letter: "T",
    name: "Transportation",
    tagline: "Unnecessary movement of products and materials",
    definition: "Excessive transit of raw materials, work-in-progress (WIP), or finished units between workcells, warehouses, or facilities.",
    operationalSymptoms: [
      "Forklifts crisscrossing high-traffic factory floor corridors",
      "Subassemblies sent between distant facilities for simple tests",
      "High transit damage and pallet re-banding overhead"
    ],
    potentialDataSources: [
      "RTLS (Real-Time Location Systems) tag coordinates",
      "Forklift telemetry & AGV routing logs",
      "Inter-facility freight manifests"
    ],
    analyticalApproach: "Spaghetti diagram spatial vector analysis, layout optimization clustering algorithms, transit distance modeling.",
    possibleKPI: "Total Transit Distance per Unit (km), Transit Cost per Good Unit, AGV Fleet Idleness",
    improvementDirection: "Adopt cellular manufacturing layouts, co-locate inspection gates, and optimize AGV routing with genetic algorithms."
  },
  {
    letter: "I",
    name: "Inventory",
    tagline: "Excess products and materials not being processed",
    definition: "Capital tied up in raw materials, WIP, and finished stock exceeding the minimal buffer required to maintain continuous flow.",
    operationalSymptoms: [
      "Pallets stacked double high on pedestrian paths",
      "High carrying costs and working capital drag",
      "Parts corroding, expiring, or undergoing engineering revision changes while in stock"
    ],
    potentialDataSources: [
      "ERP inventory valuation tables",
      "WMS shelf dwell time logs",
      "BOM replenishment cycles"
    ],
    analyticalApproach: "Inventory health stratification (ABC/XYZ), safety buffer stochastic modeling, Theory of Constraints inventory buffers.",
    possibleKPI: "Inventory Turnover, Days Inventory Outstanding (DIO), WIP-to-Throughput Ratio",
    improvementDirection: "Establish dynamic Drum-Buffer-Rope sizing, point-of-use replenishment, and supplier consignment visibility."
  },
  {
    letter: "M",
    name: "Motion",
    tagline: "Unnecessary movement by people",
    definition: "Any physical movement by workers that does not add direct value—such as bending, stretching, walking to find tools, or navigating poor UI.",
    operationalSymptoms: [
      "Workers repeatedly walking 20 steps to retrieve common hex keys",
      "Poor ergonomics leading to fatigue and musculoskeletal complaints",
      "Operators clicking through 9 screens to input single batch record"
    ],
    potentialDataSources: [
      "Video computer vision motion tracking",
      "Ergonomic sensor telemetry",
      "Software interaction clickstream heatmaps"
    ],
    analyticalApproach: "Therblig motion study decomposition, 5S workspace adherence auditing, ergonomic risk scoring (REBA/RULA).",
    possibleKPI: "Walking Distance per Operator Shift, Motion Ergonomic Index, Screen Interactions per Batch",
    improvementDirection: "Standardized 5S shadow boards, point-of-use tool balancing, and unified voice/barcode automated capture interfaces."
  },
  {
    letter: "E",
    name: "Extra-Processing",
    tagline: "Work or quality beyond what customer requires",
    definition: "Performing more work, tighter tolerances, multiple duplicate inspections, or redundant data entry than specified or paid for by the customer.",
    operationalSymptoms: [
      "Machining mirror finishes on non-visible internal brackets",
      "Quadruple approval signatures required for routine standard changes",
      "Re-entering shipping data into three legacy mainframe databases"
    ],
    potentialDataSources: [
      "Engineering Change Orders (ECO)",
      "Process execution routing logs",
      "Quality tolerance compliance margins"
    ],
    analyticalApproach: "Value-Engineering function-to-cost evaluation, tolerance sensitivity analysis, robotic process automation log mining.",
    possibleKPI: "Non-Value Added Processing Time (NVAT), Cost of Excess Precision, Duplicate Data Touchpoints",
    improvementDirection: "Apply Value Engineering matrix to eliminate non-functional tolerances; automate multi-system record syncing."
  }
];

// Handbook Disciplines integration
export interface MethodologyDiscipline {
  discipline: string;
  role: string;
  coreMechanism: string;
  handbookCitation: string;
}

export const METHODOLOGY_DISCIPLINES: MethodologyDiscipline[] = [
  {
    discipline: "Lean Manufacturing",
    role: "Identify and remove waste & establish continuous flow",
    coreMechanism: "Value Stream Mapping, DOWNTIME waste eradication, pull systems, and continuous flow synchronization.",
    handbookCitation: "Eliminates non-value-added delays so true cycle time approaches pure value-added transformation time."
  },
  {
    discipline: "Six Sigma",
    role: "Measure and reduce process variation",
    coreMechanism: "DMAIC lifecycle, statistical process control (SPC), gauge R&R, hypothesis testing, and Cpk capability analysis.",
    handbookCitation: "Quantifies probability distribution tails to prevent defect generation before units enter downstream buffers."
  },
  {
    discipline: "Theory of Constraints (TOC)",
    role: "Identify and exploit the limiting system constraint",
    coreMechanism: "Five Focusing Steps, Drum-Buffer-Rope scheduling, throughput accounting, and buffer consumption monitoring.",
    handbookCitation: "Ensures improvement resources target only the active system bottleneck rather than creating local sub-optimizations."
  },
  {
    discipline: "Critical Chain Project Mgmt",
    role: "Protect schedule buffers and manage resource contention",
    coreMechanism: "Fever charts, project buffer penetration tracking, multi-project resource contention elimination.",
    handbookCitation: "Safeguards engineering transformation milestones from Parkinson's law and student syndrome delays."
  },
  {
    discipline: "Toyota Production System (TPS)",
    role: "Stabilize flow, Jidoka (autonomation), and quality at source",
    coreMechanism: "Andon escalations, Poka-Yoke error proofing, Standardized Work, and Heijunka production leveling.",
    handbookCitation: "Provides the frontline discipline where work stops instantly on deviation, enabling immediate root cause elimination."
  },
  {
    discipline: "Value Engineering",
    role: "Evaluate functions rigorously against cost",
    coreMechanism: "Function Analysis System Technique (FAST), value-to-cost ratio maximization, design-for-manufacturability.",
    handbookCitation: "Ensures features and tolerances deliver authentic customer utility without uncompensated industrial overhead."
  },
  {
    discipline: "Agentic AI & Multi-Model Cascades",
    role: "Execute workflows under deterministic controls & auditability",
    coreMechanism: "Multi-tier intelligence architecture (Tier 0 to Tier 6), retrieval-grounded validation, human-in-the-loop risk banding.",
    handbookCitation: "Acts as the dynamic execution accelerator, detecting waste and predicting drift without human fatigue."
  }
];

// Service Portfolio
export interface ServiceOffering {
  id: string;
  name: string;
  trademark: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  outcome: string;
  iconName: string;
}

export const SERVICES: ServiceOffering[] = [
  {
    id: "discovery",
    name: "AI Value Discovery",
    trademark: "AI Value Discovery™",
    subtitle: "Identify Where Value Exists.",
    description: "Before investing in AI, organizations need clarity. We assess processes, data landscapes, technology environments, and business objectives to identify high-value opportunities.",
    deliverables: [
      "AI Opportunity Assessment",
      "Process Discovery & Event Mining",
      "Value Stream Mapping & DOWNTIME Audit",
      "Business Case Development & Financial Modeling",
      "ROI & Payback Sensitivity Analysis",
      "AI Readiness Assessment (0–100 Scale)"
    ],
    outcome: "A prioritized, mathematically validated roadmap focused on measurable business impact and constraint relief.",
    iconName: "Search"
  },
  {
    id: "engineering",
    name: "AI Value Engineering",
    trademark: "AI Value Engineering™",
    subtitle: "Design Solutions That Deliver Results.",
    description: "Transform opportunities into practical, scalable solutions by combining Lean Six Sigma methodologies with AI, automation, and advanced analytics.",
    deliverables: [
      "AI Strategy & Architecture Blueprint",
      "Process Redesign & Cellular Flow Optimization",
      "Intelligent Automation Opportunities",
      "Predictive Analytics & Anomaly Frameworks",
      "Industrial Data Architecture (SCADA/MES/ERP)",
      "Transformation Engineering Blueprints"
    ],
    outcome: "A clear, rigorously engineered path from operational strategy to technical execution.",
    iconName: "Cpu"
  },
  {
    id: "delivery",
    name: "AI Value Delivery",
    trademark: "AI Value Delivery™",
    subtitle: "Turn Strategy into Business Results.",
    description: "Implement AI-enabled business solutions through disciplined execution, organizational adoption, multi-tier governance, and outcome measurement.",
    deliverables: [
      "Program & Buffer Management (Critical Chain)",
      "Frontline Change Management & Training",
      "Multi-Tier Agentic AI Implementation",
      "Edge & Cloud Automation Deployment",
      "KPI & SPC Control Frameworks",
      "Continuous Performance Monitoring"
    ],
    outcome: "Faster cycle times, lower operational costs, and measurable step-change in business performance.",
    iconName: "Rocket"
  },
  {
    id: "optimization",
    name: "AI Value Optimization",
    trademark: "AI Value Optimization™",
    subtitle: "Sustain and Scale Business Value.",
    description: "Continuously measure, monitor, and optimize business outcomes after deployment to compound operational gains across the enterprise.",
    deliverables: [
      "Continuous Improvement Programs (Kaizen AI)",
      "Operational Excellence & Capability Reviews",
      "Model Drift & Algorithmic Optimization",
      "KPI Governance & Audit Committees",
      "Benefits Realisation & P&L Attribution Tracking",
      "Industrial Benchmark Comparisons"
    ],
    outcome: "Sustainable compounding growth, protected margins, and institutional continuous value creation.",
    iconName: "TrendingUp"
  }
];

// Engagement models
export interface EngagementModel {
  title: string;
  duration: string;
  headline: string;
  description: string;
  bestFor: string[];
  ctaText: string;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "AI Lean Discovery Sprint",
    duration: "2–6 Weeks",
    headline: "Rapid constraint identification and value quantification",
    description: "Rapid assessment of processes, data landscapes, constraints, and operational improvement opportunities with prioritized business cases.",
    bestFor: [
      "AI strategy development and capability audit",
      "Process improvement identification (bottleneck & DOWNTIME)",
      "Value opportunity assessment and Discovery Score validation"
    ],
    ctaText: "Schedule Discovery Sprint"
  },
  {
    title: "AI Lean Transformation Program",
    duration: "3–12 Months",
    headline: "End-to-end operational overhaul combining Lean, analytics, and AI",
    description: "Holistic transformation combining Lean Six Sigma rigor, process mining, automation, and multi-tier agentic systems into plant operations.",
    bestFor: [
      "Enterprise operational transformation",
      "Multi-plant operational excellence programs",
      "Digital transformation initiatives tied to EBITDA improvement"
    ],
    ctaText: "Explore Transformation"
  },
  {
    title: "AI Value Acceleration Program",
    duration: "Ongoing Partnership",
    headline: "Continuous value engineering to compound operational ROI",
    description: "Ongoing advisory, model optimization, buffer tracking, and governance support focused on maximizing continuous business outcomes.",
    bestFor: [
      "Mature industrial AI and digital programs",
      "Continuous improvement organizations scaling Kaizen",
      "Large transformation portfolios requiring multi-tier governance"
    ],
    ctaText: "Partner with Us"
  }
];

// Articles and Insights
export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
}

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "dave-framework-manufacturing",
    title: "The DAVE™ Framework: Engineering Compounding Operational Value",
    category: "Methodology",
    readTime: "7 min read",
    summary: "How the Discover, Architect, Value Delivery, and Evolve framework aligns Lean Six Sigma with industrial intelligence.",
    content: [
      "Traditional digital transformations often fail because organizations deploy advanced technology directly onto broken, un-stabilized processes. The DAVE™ framework addresses this by embedding Lean Six Sigma rigor at every stage.",
      "In the Discover stage, teams map the bounded value stream, quantify baseline variation (Six Sigma), and locate the active system constraint (Theory of Constraints). No automation is permitted until waste is quantified.",
      "The Architect stage leverages Value Engineering to design future-state cellular flow and multi-tier AI cascades (Tiers 0 through 6).",
      "Value Delivery executes changes using Critical Chain project buffer monitoring, ensuring delivery deadlines remain protected.",
      "Finally, Evolve institutes statistical process control (SPC) and benefits realization tracking to ensure gains compound rather than erode over time."
    ],
    tags: ["DAVE Framework", "Lean Six Sigma", "Operational Excellence", "Architecture"]
  },
  {
    id: "downtime-waste-ai-detection",
    title: "AI-Powered DOWNTIME Waste Detection in Modern Manufacturing",
    category: "Eight Wastes and DOWNTIME",
    readTime: "6 min read",
    summary: "Transforming the classic 8 wastes of Lean into real-time telemetry-driven anomaly alerts.",
    content: [
      "The eight wastes—Defects, Overproduction, Waiting, Non-Utilized Talent, Transportation, Inventory, Motion, and Extra-Processing—have guided Lean practitioners for decades.",
      "Today, industrial IoT and agentic models allow organizations to shift from retrospective Kaizen audits to continuous waste detection.",
      "For example, waiting waste can be automatically flagged when SCADA machine idle timers diverge from MES work-order execution stamps.",
      "Similarly, transportation and motion wastes are mapped through RTLS forklift telemetry and automated spaghetti diagram calculations, pinpointing layout bottlenecks before physical congestion harms throughput."
    ],
    tags: ["DOWNTIME", "Waste Elimination", "Process Mining", "SCADA"]
  },
  {
    id: "theory-of-constraints-ai-cascades",
    title: "Aligning Theory of Constraints with Multi-Model AI Cascades",
    category: "Theory of Constraints",
    readTime: "8 min read",
    summary: "Why optimizing non-constraints creates industrial illusions, and how to focus AI directly on the system bottleneck.",
    content: [
      "Dr. Eliyahu Goldratt demonstrated that an hour saved at a non-bottleneck is an illusion. Applying AI to speed up a non-constraint simply builds excess WIP in front of the actual limiting constraint.",
      "The Lean AI Value Engineering methodology mandates identifying the single primary bottleneck prior to deploying automated agents.",
      "Once the constraint is exploited and subordinated, multi-tier AI cascades (ranging from deterministic Tier 0 limits to Tier 3 predictive reasoning) are deployed specifically to maximize bottleneck availability and eliminate starved/blocked states."
    ],
    tags: ["Theory of Constraints", "Bottlenecks", "Little's Law", "Throughput"]
  },
  {
    id: "multi-tier-ai-governance-handbook",
    title: "Governed Industrial AI: The 7-Tier Architecture from the Handbook",
    category: "Agentic AI and Governance",
    readTime: "9 min read",
    summary: "A breakdown of Tier 0 deterministic rules through Tier 6 observability for safety-critical plant operations.",
    content: [
      "Autonomous systems in industrial manufacturing demand absolute auditability and deterministic safety envelopes.",
      "The Lean AI Value Engineering Handbook outlines a 7-tier architecture: Tier 0 handles deterministic PLC/SCADA hard limits. Tier 1 performs retrieval and context grounding from SOPs.",
      "Tier 2 executes statistical anomaly detection. Tier 3 applies reasoning models only when contextual synthesis is necessary.",
      "Tier 4 validates proposals against compliance policies. Tier 5 enforces human approval based on calibrated risk bands. Tier 6 maintains telemetry and tamper-evident audit logs."
    ],
    tags: ["Governance", "Agentic AI", "Safety Systems", "Tier Architecture"]
  }
];
