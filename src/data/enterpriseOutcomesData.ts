import { EnterpriseStandardPageData } from '../types/enterprisePageTypes';

export const ENTERPRISE_OUTCOMES_PAGES: Record<string, EnterpriseStandardPageData> = {
  // 1. COST REDUCTION
  'outcomes/cost-reduction': {
    id: 'outcomes-cost-reduction',
    route: 'outcomes/cost-reduction',
    category: 'Transformation Outcome 01',
    title: 'Enterprise Cost Reduction & Waste Elimination',
    tagline: 'P&L EBITDA Recovery via Defect Containment and Hidden Waste Elimination',
    executiveSummary:
      'We partner with senior leadership to uncover and eliminate systemic operational waste, eradicate Cost of Poor Quality (COPQ), and unlock trapped working capital across complex production and service environments.',
    challenge: {
      overview:
        'Organizations frequently bleed 15% to 25% of operational expenditure through the "Hidden Factory"—untracked scrap, rework cycles, expedited freight, and sub-optimized labor capacity that never shows up on standard management reports.',
      macroPressures: [
        'Persistent inflationary wage and raw material volatility',
        'Unmeasured COPQ eroding gross margins by 400–800 bps',
        'Legacy cost-cutting initiatives that damaged service quality'
      ],
      frictionModes: [
        {
          title: 'Uncontained Scrap & Rework',
          desc: 'Sub-surface process variance results in finished units requiring manual teardown, consuming labor and material without generating billable revenue.'
        },
        {
          title: 'Trapped Working Capital',
          desc: 'Excess buffer inventory and work-in-progress (WIP) create balance sheet bloat, high holding costs, and vulnerability to obsolescence.'
        },
        {
          title: 'Premium Expedited Freight',
          desc: 'Downstream line stoppages force frequent emergency air-freight runs to protect client delivery windows, turning profits into losses.'
        }
      ]
    },
    solution: {
      approach:
        'Our proven 4-stage intervention combines classical Lean Six Sigma with discrete-event digital simulation to eliminate friction before committing capital expenditure.',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Forensic Waste Audit',
          focus: 'Plant-wide GEMBA diagnostic, DOWNTIME 8-waste classification, and financial reconciliation of baseline scrap.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Variance & COPQ Modeling',
          focus: 'Statistical root-cause Pareto analysis and digital simulation of buffer sizes to locate true financial leaks.'
        },
        {
          stage: 'S3 Transform',
          name: 'Kaizen & Mistake-Proofing',
          focus: 'Execution of targeted SMED quick-changeovers, Poka-Yoke fixtures, and automated closed-loop parameter controls.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Audited P&L Banking',
          focus: 'SPC control charting, executive dashboard governance, and verified sign-off with client finance leadership.'
        }
      ]
    },
    kpis: [
      {
        name: 'Cost of Poor Quality (COPQ)',
        baseline: '18.4% of Rev',
        targetDelta: '-62% to 6.8%',
        formula: 'COPQ = Internal Failures + External Failures + Appraisal Costs',
        financialImpact: 'Average $2.4M directly returned to operating EBITDA'
      },
      {
        name: 'Scrap & Material Bleed Rate',
        baseline: '7.8% of Run',
        targetDelta: '-72% to 2.1%',
        formula: 'Scrap % = (Rejected Weight / Total Input Material) × 100',
        financialImpact: '$1.1M direct raw material spend recovery per line'
      },
      {
        name: 'First Pass Yield (FPY)',
        baseline: '86.2%',
        targetDelta: '+13.2% to 99.4%',
        formula: 'FPY = (Units Passed Initial Inspection / Total Inflow) × 100',
        financialImpact: 'Virtually eliminates off-shift rework overtime costs'
      },
      {
        name: 'Process Cycle Efficiency (PCE)',
        baseline: '8.4%',
        targetDelta: '+240% to 28.6%',
        formula: 'PCE % = (Value-Added Time / Total Lead Time) × 100',
        financialImpact: 'Releases 35% trapped floor space and working capital'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Containment)',
        title: 'Rapid Stabilization & Scrap Triage',
        deliverables: [
          'Immediate physical containment of primary scrap modes',
          'Deployment of visual management and Poka-Yoke controls',
          'Initial 15–25% reduction in scrap and expedited freight spend'
        ]
      },
      {
        timeframe: 'Day 91–180 (Structural)',
        title: 'Process Modernization & Flow Optimization',
        deliverables: [
          'Full value stream debottlenecking and SMED changeover reduction',
          'Integration of parameter telemetry and anomaly warning triggers',
          'Release of 30% work-in-progress (WIP) working capital'
        ]
      },
      {
        timeframe: 'Day 181–360 (Institutional)',
        title: 'Continuous Improvement Mastery & P&L Lock-in',
        deliverables: [
          'Certified internal Green/Black Belts governing frontlines',
          'Audited financial reconciliation signed off by Chief Financial Officer',
          'Multi-site replication playbook across secondary operating facilities'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Manufacturing',
        environment: 'High-speed discrete CNC machining and automotive stamping lines',
        intervention: 'Poka-Yoke error-proofing, thermal drift compensation, and scrap segregation',
        measuredResult: '$3.8M scrap containment and 74% reduction in rework hours'
      },
      {
        sector: 'Healthcare',
        environment: 'Multi-hospital clinical pathology and sterile surgical supply centers',
        intervention: 'Lean Kanban pull replenishment and expired inventory eradication',
        measuredResult: '$1.2M in annual discarded medication and sterile supply savings'
      },
      {
        sector: 'Banking & FinServ',
        environment: 'Commercial lending document operations and title search verification',
        intervention: 'Intelligent form processing and first-touch data validation',
        measuredResult: '52% reduction in loan rework loops and compliance audit errors'
      },
      {
        sector: 'Supply Chain & Log.',
        environment: 'Tier-1 cross-docking and cold chain temperature-sensitive distribution',
        intervention: 'Telemetry anomaly alarms, dock-to-stock slotting, and route optimization',
        measuredResult: '88% reduction in temperature-excursion spoilage losses'
      }
    ],
    businessBenefits: [
      {
        title: 'Direct P&L EBITDA Expansion',
        summary: 'Dollar-for-dollar reduction in material waste and rework straight to the operating margin.',
        impactMetrics: ['+$3.2M Avg Year-1 Realized Savings', '3.8x Engagement ROI', 'Zero Staff Reductions']
      },
      {
        title: 'Working Capital Recovery',
        summary: 'Accelerated part velocity compresses Days Inventory Outstanding (DIO).',
        impactMetrics: ['-42% WIP Inventory Days', 'Cash Released for Growth', 'Reduced Warehouse Footprint']
      },
      {
        title: 'Risk & Quality Governance',
        summary: 'Deterministic quality eliminates warranty claims and protective legal reserves.',
        impactMetrics: ['Zero Customer Escapes in 12 Mos', '100% Audit Traceability', 'Predictable Lead Times']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'Global Tier-1 Automotive Powertrain Supplier',
        problemStatement: '14.8% scrap rate on aluminum transmission housings resulting in $4.2M annual loss.',
        interventionSummary: 'Applied DMAIC root cause analysis, CNC thermal compensation, and automated tool-wear monitoring.',
        verifiedRoi: '$3.1M Verified Annual P&L Savings',
        route: 'usecases'
      },
      {
        clientProfile: 'National Medical Diagnostics Laboratory Network',
        problemStatement: 'High specimen rejection rate (8.4%) causing delayed cancer diagnostics and re-draw costs.',
        interventionSummary: 'Implemented barcode validation at phlebotomy stations and standardized refrigeration value streams.',
        verifiedRoi: '91% Reduction in Re-Draws ($1.6M Savings)',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule Cost Reduction Diagnostic',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Lean Sigma Calculator',
      acceleratorToolRoute: 'calculator',
      acceleratorTag: 'Quantify COPQ & Scrap'
    }
  },

  // 2. PRODUCTIVITY IMPROVEMENT
  'outcomes/productivity-improvement': {
    id: 'outcomes-productivity-improvement',
    route: 'outcomes/productivity-improvement',
    category: 'Transformation Outcome 02',
    title: 'System Throughput & Capacity Optimization',
    tagline: 'Scale Operational Output by 30–50% Without Purchasing New Capital Equipment',
    executiveSummary:
      'We combine Theory of Constraints (TOC), Little’s Law, and discrete queueing simulation to identify and shatter primary operational bottlenecks, accelerating unit velocity and maximizing labor effectiveness.',
    challenge: {
      overview:
        'Most operations struggle with invisible starvation and blocking: stations appear busy, yet overall product delivery is choked by upstream micro-stops and unbalanced cycle times.',
      macroPressures: [
        'Capacity constraints forcing expensive capital expenditure requests',
        'Unbalanced line pacing creating massive work-in-progress queues',
        'Labor shortages requiring maximum output per available labor hour'
      ],
      frictionModes: [
        {
          title: 'Primary Bottleneck Starvation',
          desc: 'The most expensive constraint machine sits idle awaiting parts from erratic upstream processes, burning capacity.'
        },
        {
          title: 'Downstream Station Blocking',
          desc: 'High-speed upstream cells are forced to halt because downstream queues have overflowed with work-in-progress.'
        },
        {
          title: 'Excessive Changeover Dwell',
          desc: 'Batch changeovers take hours instead of minutes, destroying operational flexibility and increasing minimal batch sizes.'
        }
      ]
    },
    solution: {
      approach:
        'Our industrial engineering consultants apply Goldratt’s Drum-Buffer-Rope and dynamic Line Balancing to pace operations to customer Takt time.',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Takt & Cycle Time Audit',
          focus: 'Precise time-and-motion study, operator task distribution, and true constraint identification.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Discrete Flow Simulation',
          focus: 'Stochastic modeling of queue build-up, variability spikes, and buffer sensitivity.'
        },
        {
          stage: 'S3 Transform',
          name: 'SMED & Line Balancing',
          focus: 'Reallocating work elements, reducing changeover times by 65%, and pacing the line.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Takt Pacing Governance',
          focus: 'Real-time andon boards, hourly production pacing boards, and tiered escalation systems.'
        }
      ]
    },
    kpis: [
      {
        name: 'Effective Throughput Rate',
        baseline: '240 units/hr',
        targetDelta: '+41% to 338 units/hr',
        formula: 'Throughput = Total Good Units Produced / Net Operating Hours',
        financialImpact: 'Enables 100% demand fulfillment without 3rd-shift overtime'
      },
      {
        name: 'Overall Equipment Effectiveness (OEE)',
        baseline: '54.2%',
        targetDelta: '+32.8% to 87.0%',
        formula: 'OEE = Availability × Performance × Quality',
        financialImpact: 'Defers $6.5M in planned duplicate capital equipment purchases'
      },
      {
        name: 'Units per Labor Hour (UPLH)',
        baseline: '12.4 u/hr',
        targetDelta: '+59% to 19.8 u/hr',
        formula: 'UPLH = Total Output / Direct Labor Hours Incurred',
        financialImpact: 'Lowers direct labor conversion cost per finished unit'
      },
      {
        name: 'Total System Lead Time',
        baseline: '18.5 Days',
        targetDelta: '-66% to 6.2 Days',
        formula: 'Lead Time = Total WIP / Average Throughput Rate (Little\'s Law)',
        financialImpact: 'Triples order fulfillment agility and on-time delivery'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Stabilization)',
        title: 'Constraint Protection & Buffer Design',
        deliverables: [
          'Identification and physical buffer protection of the critical bottleneck',
          'Implementation of SMED rapid changeover protocols on the constraint',
          'Immediate 12–18% jump in daily line throughput'
        ]
      },
      {
        timeframe: 'Day 91–180 (Flow)',
        title: 'Comprehensive Line Balancing & Digital Pacing',
        deliverables: [
          'Work redistribution across stations to match customer Takt time',
          'Elimination of downstream blocking and starvation loops',
          'Attainment of 80%+ OEE sustained benchmark'
        ]
      },
      {
        timeframe: 'Day 181–360 (Scale)',
        title: 'Autonomous Flow & Enterprise Replication',
        deliverables: [
          'Integration of automated throughput telemetry and pacing dashboards',
          'Cross-skilling of frontline teams for dynamic cell staffing',
          'Institutionalized 30–50% throughput gain without added Capex'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Manufacturing',
        environment: 'Automotive stamping, sub-assembly, and robotic welding cells',
        intervention: 'Drum-Buffer-Rope bottleneck pacing and SMED die-change reduction',
        measuredResult: '+43% higher unit output and deferral of $8.2M welding line purchase'
      },
      {
        sector: 'Healthcare',
        environment: 'Tertiary hospital Operating Room (OR) surgical suites and PACU recovery',
        intervention: 'Parallel surgical turnover protocols and PACU discharge buffer management',
        measuredResult: 'OR turnover time reduced from 48 min to 21 min (+2.4 cases/day/suite)'
      },
      {
        sector: 'Retail & Fulfillment',
        environment: 'E-commerce regional sortation and automated fulfillment centers',
        intervention: 'Dynamic zone picking wave balancing and conveyor induction pacing',
        measuredResult: '+62% increase in peak season order pick-to-pack speed'
      },
      {
        sector: 'Banking & FinServ',
        environment: 'Commercial mortgage underwriting and appraisal validation queues',
        intervention: 'Digital work-cell pooling and automated condition document routing',
        measuredResult: 'Loan file velocity accelerated from 24 days down to 6.5 days'
      }
    ],
    businessBenefits: [
      {
        title: 'Deferred Capital Expenditure',
        summary: 'Extracting latent capacity from existing facilities avoids multi-million dollar equipment leases.',
        impactMetrics: ['$5M–$15M Capex Deferred', 'Increased Return on Capital (ROCE)', 'Optimized Footprint']
      },
      {
        title: 'Labor Productivity Acceleration',
        summary: 'Higher unit output per labor hour reduces direct manufacturing conversion costs.',
        impactMetrics: ['+45% Labor Efficiency', 'Eliminated Mandatory Overtime', 'Improved Worker Retention']
      },
      {
        title: 'Contract SLA Assurance',
        summary: 'Predictable, fast cycle times guarantee 99%+ on-time in-full (OTIF) fulfillment.',
        impactMetrics: ['99.2% OTIF Delivery', 'Zero Late Delivery Penalties', 'Customer Preferred Supplier Status']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'Heavy Equipment Transmission Manufacturer',
        problemStatement: 'Severe machining bottleneck limiting factory revenue during unprecedented market demand.',
        interventionSummary: 'Applied discrete simulation, SMED changeover reduction, and automated tool-change indexing.',
        verifiedRoi: '+38% Line Throughput ($5.4M Added Revenue)',
        route: 'usecases'
      },
      {
        clientProfile: 'Specialty Pharmaceutical Cleanroom Packaging Facility',
        problemStatement: 'Bottle packaging line running at 48% OEE due to frequent micro-stops and slow sterilization.',
        interventionSummary: 'Re-engineered changeover sequence and deployed visual starvation alarms.',
        verifiedRoi: 'OEE Lift to 82.4% (Avoided $4M Line Expansion)',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule Capacity & Throughput Review',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Value Stream Simulator',
      acceleratorToolRoute: 'simulator',
      acceleratorTag: 'Model Queue & Bottlenecks'
    }
  },

  // 3. QUALITY EXCELLENCE
  'outcomes/quality-excellence': {
    id: 'outcomes-quality-excellence',
    route: 'outcomes/quality-excellence',
    category: 'Transformation Outcome 03',
    title: 'Zero-Defect Quality Excellence & Process Capability',
    tagline: 'Shift Process Sigma from 3.2 to 5.0+ and Eliminate Customer Escapes',
    executiveSummary:
      'We institute world-class Statistical Process Control (SPC), Design of Experiments (DOE), and automated vision AI diagnostics to build deterministic quality into every step of the value chain.',
    challenge: {
      overview:
        'Inspection-heavy quality systems fail because they catch defects after the cost has already been incurred. Achieving near-zero defects requires controlling variation at the source.',
      macroPressures: [
        'Strict aerospace, medical device, and automotive OEM quality mandates',
        'Rising warranty liability costs and customer escape penalty clauses',
        'Excessive dependency on manual visual inspection that misses 20% of defects'
      ],
      frictionModes: [
        {
          title: 'High Process Variability (Low Cpk)',
          desc: 'Machines wander outside allowable tolerances due to thermal expansion, tool wear, and operator technique differences.'
        },
        {
          title: 'End-of-Line Inspection Gates',
          desc: 'Treating quality as a sorting exercise rather than a process control discipline multiplies rework overhead.'
        },
        {
          title: 'Unresolved Chronic Defects',
          desc: 'Recurring quality issues repeatedly resurface because teams address symptoms rather than statistical root causes.'
        }
      ]
    },
    solution: {
      approach:
        'Our Master Black Belts deploy advanced DMAIC and Statistical Process Control (SPC) architectures to achieve true Six Sigma capability ($C_{pk} \\ge 1.67$).',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Measurement System Analysis (Gage R&R)',
          focus: 'Auditing measurement repeatability and reproducibility to ensure data integrity.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Statistical Root-Cause & DOE',
          focus: 'Executing Design of Experiments (DOE) and ANOVA to pinpoint vital input variables (Xs).'
        },
        {
          stage: 'S3 Transform',
          name: 'Poka-Yoke & Parameter Interlocking',
          focus: 'Engineering hardware mistake-proofing and closed-loop CNC feed overrides.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Real-Time SPC Control',
          focus: 'Automated Western Electric rule violation alarms and operator statistical dashboards.'
        }
      ]
    },
    kpis: [
      {
        name: 'Process Sigma Level',
        baseline: '3.15 σ (12,500 DPMO)',
        targetDelta: '+1.85 σ to 5.0 σ (230 DPMO)',
        formula: 'Sigma = NORMSINV(1 - (Defects / Opportunities)) + 1.5',
        financialImpact: '98% reduction in chronic scrap and customer escapes'
      },
      {
        name: 'Process Capability Index (Cpk)',
        baseline: '0.88 (Uncapable)',
        targetDelta: '+0.84 to 1.72 (World-Class)',
        formula: 'Cpk = Min((USL - μ)/(3σ), (μ - LSL)/(3σ))',
        financialImpact: 'Completely eliminates customer tolerance claims'
      },
      {
        name: 'Defect Rate (%)',
        baseline: '4.85%',
        targetDelta: '-92% to 0.38%',
        formula: 'Defect Rate % = (Defective Parts / Total Inspected) × 100',
        financialImpact: 'Reduces rework labor and off-spec material write-offs'
      },
      {
        name: 'Customer Escapes / Audit Findings',
        baseline: '14 Escapes / Yr',
        targetDelta: '100% Elimination to 0 Escapes',
        formula: 'Escapes = Total non-conformances reported post-delivery',
        financialImpact: 'Protects critical Tier-1 customer contracts and certifications'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Diagnostic)',
        title: 'Gage R&R & Variation Pinpointing',
        deliverables: [
          'Rigorous Gage R&R audit verifying measurement validity (<10% GRR)',
          'Pareto analysis identifying the top 3 chronic defect families',
          'Implementation of temporary containment and immediate visual inspection standards'
        ]
      },
      {
        timeframe: 'Day 91–180 (Optimization)',
        title: 'Design of Experiments & Parameter Locking',
        deliverables: [
          'Execution of multi-factor DOE identifying optimum operating parameters',
          'Installation of mechanical Poka-Yoke mistake-proofing fixtures',
          'Capability index lift past Cpk 1.33 across all critical dimensions'
        ]
      },
      {
        timeframe: 'Day 181–360 (Control)',
        title: 'Automated SPC & Zero-Escape Governance',
        deliverables: [
          'Digital SPC control charts connected to machine PLCs with automatic feed interlocks',
          'Frontline operator certification in statistical variance management',
          'Attainment of 5.0+ Process Sigma with zero customer escapes'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Aerospace & Defense',
        environment: 'Turbine blade precision CNC milling and vacuum electron-beam welding',
        intervention: 'Multi-axis tool wear compensation, laser scanning, and Cpk optimization',
        measuredResult: 'Zero dimensional escapes in 18 months and AS9100 recertification'
      },
      {
        sector: 'Medical Devices',
        environment: 'Class III implantable catheter and pacemaker cleanroom micro-assembly',
        intervention: 'Optical vision inspection AI and automated pull-force tensile validation',
        measuredResult: 'Defect rate dropped from 3.2% to 0.04% (ISO 13485 audit clean pass)'
      },
      {
        sector: 'Semiconductor / Electronics',
        environment: 'Surface-mount technology (SMT) solder paste printing and reflow ovens',
        intervention: 'Closed-loop 3D SPI paste volume compensation and nitrogen profiling',
        measuredResult: 'DPMO reduced from 4,800 to 140 on high-density circuit boards'
      },
      {
        sector: 'Pharmaceuticals',
        environment: 'Oral solid dosage tablet compression and sterile vial liquid filling',
        intervention: 'Process Analytical Technology (PAT) near-infrared content uniformity',
        measuredResult: 'Eliminated batch rejection write-offs ($2.8M annual savings)'
      }
    ],
    businessBenefits: [
      {
        title: 'Customer Escape Eradication',
        summary: 'Building quality at the source guarantees zero defective parts reach client facilities.',
        impactMetrics: ['Zero Customer Escapes', 'Exceeded OEM Supplier Audits', 'Eliminated Chargebacks']
      },
      {
        title: 'Warranty Liability Containment',
        summary: 'Lower field failure rates reduce statutory warranty reserves and legal defense budgets.',
        impactMetrics: ['-80% Warranty Claims', 'Enhanced Brand Reputation', 'Preferred Vendor Allocation']
      },
      {
        title: 'Inspection Cost Rationalization',
        summary: 'Statistically capable processes eliminate the need for costly 100% manual sorting.',
        impactMetrics: ['-65% Inspection Labor Overhead', 'Faster Line Velocity', 'Immediate Part Acceptance']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'Aerospace Hydraulic Valve Manufacturer',
        problemStatement: 'High micro-leakage rate (6.8%) causing OEM flight test rejections and severe fines.',
        interventionSummary: 'Deployed Six Sigma DMAIC, honing machine spindle stabilization, and acoustic emission testing.',
        verifiedRoi: 'Zero Escapes Over 24 Months ($3.6M Saved)',
        route: 'usecases'
      },
      {
        clientProfile: 'Medical Stent Laser Machining Plant',
        problemStatement: 'Wall thickness variation causing 9.2% scrap on expensive cobalt-chromium tubing.',
        interventionSummary: 'Executed 16-run Fractional Factorial DOE to optimize laser pulse frequency and inert gas flow.',
        verifiedRoi: 'Cpk Shifted from 0.82 to 1.78 ($2.2M Savings)',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule Quality Excellence Diagnostic',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Lean Sigma Calculator',
      acceleratorToolRoute: 'calculator',
      acceleratorTag: 'Compute DPMO & Cpk'
    }
  },

  // 4. CUSTOMER EXPERIENCE
  'outcomes/customer-experience': {
    id: 'outcomes-customer-experience',
    route: 'outcomes/customer-experience',
    category: 'Transformation Outcome 04',
    title: 'Customer Journey Optimization & Service Excellence',
    tagline: 'Compress Service Turnaround Times by 60% and Elevate CSAT / Net Promoter Scores',
    executiveSummary:
      'We apply Value Stream Mapping, Service Blueprinting, and omnichannel process analytics to eliminate client friction points, accelerate onboarding, and drive industry-leading customer retention.',
    challenge: {
      overview:
        'Enterprise customer touchpoints often bridge disconnected departmental silos, resulting in repeated handoffs, dropped inquiries, and frustratingly slow case resolution times.',
      macroPressures: [
        'Rising customer expectations for instant, digital-first service delivery',
        'Customer churn directly attributable to fragmented onboarding friction',
        'High cost-to-serve driven by repeat inquiry loops and manual handling'
      ],
      frictionModes: [
        {
          title: 'Inter-Departmental Handoff Delays',
          desc: 'Requests bounce across 4 to 6 separate teams, each with disconnected ticketing queues and conflicting SLAs.'
        },
        {
          title: 'Repetitive Customer Verification',
          desc: 'Clients must re-enter information multiple times, driving up drop-off rates and fueling customer dissatisfaction.'
        },
        {
          title: 'Opaque Status Visibility',
          desc: 'Lack of real-time tracking generates inbound status chase calls, overwhelming frontline support agents.'
        }
      ]
    },
    solution: {
      approach:
        'We design frictionless end-to-end service journeys using Lean Service principles, eliminating non-value-added dwell time and establishing transparent customer SLA commitments.',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Journey & Blueprint Mapping',
          focus: 'Documenting client journey friction, emotional sentiment drop-offs, and touchpoint latency.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Queue & Failure-Demand Audit',
          focus: 'Segregating value demand from failure demand (preventable repeat inquiries) and finding root bottlenecks.'
        },
        {
          stage: 'S3 Transform',
          name: 'Omnichannel Single-Touch Flow',
          focus: 'Designing unified agent workspaces, automated status triggers, and self-service portals.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Continuous CX Pulse & Governance',
          focus: 'Real-time CSAT and NPS closed-loop feedback systems with automated recovery protocols for detractors.'
        }
      ]
    },
    kpis: [
      {
        name: 'Net Promoter Score (NPS)',
        baseline: '+34 NPS',
        targetDelta: '+38 pts to +72 NPS',
        formula: 'NPS = % Promoters (9-10) - % Detractors (0-6)',
        financialImpact: 'Directly drives 24% higher client annual contract retention'
      },
      {
        name: 'First Contact Resolution (FCR)',
        baseline: '51.4%',
        targetDelta: '+33.6% to 85.0%',
        formula: 'FCR % = (Resolved on First Touch / Total Inbound) × 100',
        financialImpact: 'Cuts customer support operating costs by $1.8M annually'
      },
      {
        name: 'Customer Onboarding Duration',
        baseline: '18.4 Business Days',
        targetDelta: '-72% to 5.1 Days',
        formula: 'Cycle Time = Time Elapsed from Signature to Live Activation',
        financialImpact: 'Accelerates time-to-revenue and eliminates 40% of sign-up drops'
      },
      {
        name: 'Service Level Agreement (SLA) Compliance',
        baseline: '74.2%',
        targetDelta: '+24.6% to 98.8%',
        formula: 'SLA % = (Cases Closed Within SLA / Total Inbound) × 100',
        financialImpact: 'Eliminates contractual customer SLA penalty write-offs'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Quick Wins)',
        title: 'Failure Demand Elimination',
        deliverables: [
          'Root-cause resolution of top 5 repeat customer inquiry categories',
          'Deployment of proactive status SMS/email tracking updates',
          'Immediate 15% reduction in inbound support case volume'
        ]
      },
      {
        timeframe: 'Day 91–180 (Optimization)',
        title: 'Single-Touch Service Restructuring',
        deliverables: [
          'Consolidation of multi-tier queues into multi-skilled agile customer pods',
          'Implementation of straight-through customer verification workflows',
          'FCR increase past 80% across all tier-1 channels'
        ]
      },
      {
        timeframe: 'Day 181–360 (Excellence)',
        title: 'Predictive Proactive Service Mastery',
        deliverables: [
          'AI-assisted sentiment routing anticipating client friction before escalation',
          'Institution of automated executive detractor outreach protocols',
          'Attainment of sustained 70+ NPS benchmark'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Banking & Wealth Management',
        environment: 'High-net-worth account opening and commercial credit onboarding',
        intervention: 'Digital KYC verification, unified portal, and dedicated concierge pods',
        measuredResult: 'Onboarding time reduced from 21 days to 48 hours (+34 NPS lift)'
      },
      {
        sector: 'Healthcare & Health Plans',
        environment: 'Patient prior-authorization and claims dispute appeals processing',
        intervention: 'Automated clinical documentation matching and direct payer integrations',
        measuredResult: '78% reduction in claim approval turnaround time'
      },
      {
        sector: 'Telecom & B2B SaaS',
        environment: 'Enterprise software provisioning and technical onboarding setup',
        intervention: 'Guided self-service setup wizards and automated telemetry milestones',
        measuredResult: 'Time-to-value reduced by 64% with 42% lower churn in year one'
      },
      {
        sector: 'Retail & Consumer Services',
        environment: 'Omnichannel returns, exchanges, and warranty claim handling',
        intervention: 'Frictionless QR code drop-off returns and instant automated refunds',
        measuredResult: 'CSAT elevated from 76% to 94% with 22% lower return handling costs'
      }
    ],
    businessBenefits: [
      {
        title: 'Lifetime Value (LTV) Maximization',
        summary: 'Satisfied, frictionless client relationships drive higher net expansion and cross-sell velocity.',
        impactMetrics: ['+28% Net Revenue Retention', 'Reduced Churn Rates', 'Higher Organic Referrals']
      },
      {
        title: 'Support Cost-to-Serve Rationalization',
        summary: 'Eliminating repeat failure loops allows lean teams to scale customer accounts without linear hiring.',
        impactMetrics: ['-40% Cost per Support Case', 'Higher Agent Morale', 'Scalable Account Growth']
      },
      {
        title: 'Brand Advocacy & Market Leadership',
        summary: 'Exceptional service speed and reliability become a defensible commercial competitive advantage.',
        impactMetrics: ['Industry Benchmark NPS', 'Zero Regulatory Consumer Complaints', 'Contract Win Rates']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'National Commercial Property & Casualty Insurer',
        problemStatement: 'Commercial policy binding taking 28 days, causing 35% broker abandonment.',
        interventionSummary: 'Applied Lean Service blueprinting, underwriting straight-through triage, and automated broker portals.',
        verifiedRoi: 'Turnaround Compressed to 4 Days (+$14M New Premium Written)',
        route: 'usecases'
      },
      {
        clientProfile: 'Global Telecommunications Enterprise Provider',
        problemStatement: 'Enterprise fiber installation delays resulting in $2.1M monthly SLA refund penalties.',
        interventionSummary: 'Re-engineered municipal permitting and field technician dispatch value streams.',
        verifiedRoi: '99.1% SLA Compliance (Eliminated $22M in Annual Penalties)',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule Customer Journey Diagnostic',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Value Stream Mapping Canvas',
      acceleratorToolRoute: 'vsm',
      acceleratorTag: 'Map Touchpoint Latency'
    }
  },

  // 5. AI DECISION MAKING
  'outcomes/ai-decision-making': {
    id: 'outcomes-ai-decision-making',
    route: 'outcomes/ai-decision-making',
    category: 'Transformation Outcome 05',
    title: 'AI-Powered Decision Intelligence & Predictive Optimization',
    tagline: 'Transform Fragmented Data into Real-Time Autonomous Operational Decision Engines',
    executiveSummary:
      'We combine mathematical forecasting, machine learning, and decision intelligence to augment frontline operators, automate dynamic scheduling, and eliminate costly human decision latency.',
    challenge: {
      overview:
        'Organizations possess petabytes of operational data but still rely on gut-feel, static spreadsheets, and delayed monthly reports to make critical inventory, pricing, and scheduling decisions.',
      macroPressures: [
        'Volatile market demand rendering static 30-day forecast models obsolete',
        'Operational decision latency costing millions in missed production windows',
        'AI pilot purgatory: algorithms trapped in notebooks without production impact'
      ],
      frictionModes: [
        {
          title: 'Static Spreadsheet Forecasting',
          desc: 'Manual Excel consolidation introduces formula errors and takes days to update, leaving leadership reacting to history.'
        },
        {
          title: 'Multi-Day Decision Latency',
          desc: 'Complex triage decisions take days to route through committee approvals, missing dynamic supply chain windows.'
        },
        {
          title: 'Siloed Unintegrated Machine Data',
          desc: 'PLC and SCADA telemetry remains disconnected from ERP business context, blinding operational planners.'
        }
      ]
    },
    solution: {
      approach:
        'We engineer closed-loop Decision Intelligence architectures that ingest streaming telemetry, run statistical optimization models, and deliver automated recommendations directly into frontline workflows.',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Data Hygiene & Value Audit',
          focus: 'Auditing data lineage, feature relevance, latency gaps, and operational decision rights.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Algorithmic Feature Engineering',
          focus: 'Training ensemble forecasting models and discrete optimization solvers on historical demand signals.'
        },
        {
          stage: 'S3 Transform',
          name: 'Human-in-the-Loop Deployment',
          focus: 'Embedding real-time recommendations into operator MES/ERP interfaces with clear confidence scores.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Model Drift & Continuous Assurance',
          focus: 'Automated Population Stability Index (PSI) monitoring and periodic algorithmic recalibration.'
        }
      ]
    },
    kpis: [
      {
        name: 'Demand Forecast Accuracy (WAPE)',
        baseline: '64.2%',
        targetDelta: '+28.6% to 92.8%',
        formula: 'WAPE % = (1 - (Σ|Actual - Forecast| / ΣActual)) × 100',
        financialImpact: 'Reduces safety stock holding requirements by $4.5M'
      },
      {
        name: 'Decision Latency Duration',
        baseline: '48–72 Hours',
        targetDelta: '-98% to 15 Minutes',
        formula: 'Latency = Time from data trigger event to executed action',
        financialImpact: 'Prevents catastrophic production line stoppages'
      },
      {
        name: 'Automated Recommendation Acceptance',
        baseline: '22% (Manual Override)',
        targetDelta: '+66% to 88%',
        formula: 'Acceptance Rate = (Actions Taken as Recommended / Total Suggestions) × 100',
        financialImpact: 'Standardizes operational execution across all operating shifts'
      },
      {
        name: 'Stockout / Unfulfilled Demand Rate',
        baseline: '6.4% of Orders',
        targetDelta: '-82% to 1.1%',
        formula: 'Stockout % = (Unfulfilled Orders / Total Demand) × 100',
        financialImpact: 'Captures $3.2M in previously lost seasonal sales'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Pilot)',
        title: 'Data Ingestion & High-ROI Proof of Concept',
        deliverables: [
          'Integration of raw sensor and ERP feeds into high-speed feature store',
          'Deployment of baseline predictive model on single critical asset or SKU category',
          'Initial 15% reduction in forecasting variance validated against ground truth'
        ]
      },
      {
        timeframe: 'Day 91–180 (Production)',
        title: 'Closed-Loop Workflow Integration',
        deliverables: [
          'Integration of algorithmic recommendations into frontline operator screens',
          'Implementation of automated safety-stock recalculations in ERP',
          'Decision latency reduced from days to under one hour'
        ]
      },
      {
        timeframe: 'Day 181–360 (Scale)',
        title: 'Enterprise Decision Intelligence Scale',
        deliverables: [
          'Multi-plant rollout of autonomous scheduling optimization engine',
          'Deployment of continuous model drift and accuracy governance',
          'Full P&L verification of realized inventory and throughput gains'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Retail & Consumer Packaged Goods',
        environment: 'Multi-echelon distribution network with 15,000 seasonal SKUs',
        intervention: 'Machine learning demand sensing incorporating weather, promotions, and trends',
        measuredResult: 'WAPE forecast accuracy elevated to 93.4% (-$5.2M inventory holding)'
      },
      {
        sector: 'Heavy Manufacturing & Mining',
        environment: 'Mission-critical rotary crushers and continuous casting mill assets',
        intervention: 'Acoustic and vibration telemetry anomaly detection model',
        measuredResult: 'Zero unplanned catastrophic equipment failures in 14 months'
      },
      {
        sector: 'Financial Services & Fintech',
        environment: 'Real-time retail credit card transaction fraud screening engine',
        intervention: 'Ensemble gradient boosted trees with 8 millisecond inference latency',
        measuredResult: '42% reduction in false-positive client declines ($6.8M preserved spend)'
      },
      {
        sector: 'Energy & Utilities',
        environment: 'Regional power transmission grid and wind turbine generation dispatch',
        intervention: 'Dynamic load balancing AI predicting weather-dependent generation curves',
        measuredResult: '18% reduction in expensive peaking plant activation costs'
      }
    ],
    businessBenefits: [
      {
        title: 'Inventory Working Capital Reduction',
        summary: 'Higher forecasting precision allows operating with drastically leaner safety stocks.',
        impactMetrics: ['-35% Safety Stock Capital', 'Zero Obsolete Inventory Spoilage', 'Higher Cash Liquidity']
      },
      {
        title: 'Autonomous Operational Speed',
        summary: 'Transitioning from batch human reviews to automated real-time decision loops.',
        impactMetrics: ['Instantaneous Anomaly Response', 'Minimized Downtime Dwell', 'Scalable Operations']
      },
      {
        title: 'Strategic Margin Protection',
        summary: 'Dynamic pricing and inventory allocation preserve margins during demand shifts.',
        impactMetrics: ['+180 bps Gross Margin Lift', 'Maximized Fill Rates', 'Data-Driven Board Certainty']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'National Omnichannel Fashion Retailer',
        problemStatement: 'High seasonal markdown write-offs ($8.4M) due to inaccurate regional demand forecasting.',
        interventionSummary: 'Built localized SKU-level demand sensing AI with automated distribution center replenishment.',
        verifiedRoi: '58% Reduction in End-of-Season Markdowns ($4.8M Saved)',
        route: 'usecases'
      },
      {
        clientProfile: 'Continuous Process Chemical Plant',
        problemStatement: 'Delayed lab test results causing chemical batches to run off-spec before correction.',
        interventionSummary: 'Implemented AI virtual inferential sensor predicting real-time viscosity and purity.',
        verifiedRoi: 'Eliminated $2.9M in Off-Spec Batch Rework',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule AI Decision Readiness Audit',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Lean Sigma Calculator',
      acceleratorToolRoute: 'calculator',
      acceleratorTag: 'Simulate Decision ROI'
    }
  },

  // 6. OPERATIONAL EXCELLENCE
  'outcomes/operational-excellence': {
    id: 'outcomes-operational-excellence',
    route: 'outcomes/operational-excellence',
    category: 'Transformation Outcome 06',
    title: 'Enterprise Operational Excellence & Lean Management',
    tagline: 'Institute a Permanent Culture of Continuous Improvement, DMAIC Governance, and Flow',
    executiveSummary:
      'We move organizations from reactive firefighting to proactive, standardized operational mastery. By combining tiered management systems, Gemba discipline, and DMAIC execution, we ensure improvements endure.',
    challenge: {
      overview:
        'Over 70% of continuous improvement programs fail within 18 months because they focus solely on short-term tool workshops without instilling the underlying daily management behaviors and leadership governance.',
      macroPressures: [
        'Operational gains eroding after external consultants leave the premises',
        'Lack of frontline psychological safety and employee engagement in problem solving',
        'Disconnected executive goals that fail to translate into daily frontline huddle metrics'
      ],
      frictionModes: [
        {
          title: 'The "Consultant Departure Slump"',
          desc: 'Processes revert to baseline within 6 months because line supervisors lack the tools to sustain new standards.'
        },
        {
          title: 'Unstandardized Operating Methods',
          desc: 'Three different shifts run the exact same equipment with three completely different techniques and yields.'
        },
        {
          title: 'Lack of Frontline Accountability',
          desc: 'Issues are discussed in monthly management reviews rather than being triaged and solved within 2 hours on the shopfloor.'
        }
      ]
    },
    solution: {
      approach:
        'We build self-sustaining Lean Management Systems comprising Leader Standard Work, Tiered Daily Huddles, and certified internal belt programs to lock in permanent operational discipline.',
      stages: [
        {
          stage: 'S0/S1 Discover',
          name: 'Management System Audit',
          focus: 'Evaluating Leader Standard Work, meeting cadences, visual controls, and frontline problem escalation speed.'
        },
        {
          stage: 'S2 Analyze',
          name: 'Standard Work Architecture',
          focus: 'Establishing unified operational standards and operator method sheets with frontline consensus.'
        },
        {
          stage: 'S3 Transform',
          name: 'Tiered Accountability Deployment',
          focus: 'Implementing Tier 1 (Shift), Tier 2 (Department), and Tier 3 (Plant) 15-minute visual huddles.'
        },
        {
          stage: 'S4/S5 Sustain',
          name: 'Continuous Improvement Academy',
          focus: 'Coaching internal champions in DMAIC, 5S, and Root Cause Analysis (A3 problem solving).'
        }
      ]
    },
    kpis: [
      {
        name: 'Standard Work Compliance Rate',
        baseline: '41.2%',
        targetDelta: '+54.8% to 96.0%',
        formula: 'Compliance % = (Audits Passed / Total Observations Conducted) × 100',
        financialImpact: 'Eliminates 85% of shift-to-shift performance variance'
      },
      {
        name: 'Continuous Improvement Ideas Implemented',
        baseline: '0.4 ideas/emp/yr',
        targetDelta: '32x Lift to 12.8 ideas/emp/yr',
        formula: 'Kaizen Velocity = Verified Implemented Improvements / Total Headcount',
        financialImpact: 'Generates $1.4M in cumulative grassroots bottom-up savings'
      },
      {
        name: 'Mean Time to Problem Escalation & Resolution',
        baseline: '18 Business Days',
        targetDelta: '-89% to 2 Business Days',
        formula: 'Duration from issue occurrence to verified root-cause countermeasure',
        financialImpact: 'Prevents minor operational deviations from turning into customer crises'
      },
      {
        name: 'Employee Frontline Engagement Score',
        baseline: '48%',
        targetDelta: '+38 pts to 86%',
        formula: 'Annual Third-Party Frontline Culture & Engagement Survey Index',
        financialImpact: 'Cuts costly frontline operational turnover in half'
      }
    ],
    outcomesTimeline: [
      {
        timeframe: 'Day 1–90 (Structure)',
        title: 'Tiered Huddles & Visual Control Deployment',
        deliverables: [
          'Design and physical launch of Tier 1, 2, and 3 visual management boards',
          'Institution of daily 15-minute operational pacing meetings',
          'Immediate stabilization of shift-to-shift handoff communication'
        ]
      },
      {
        timeframe: 'Day 91–180 (Execution)',
        title: 'Standard Work & Leader Standard Cadences',
        deliverables: [
          'Documentation and cross-training on standardized work across all core lines',
          'Coaching frontline supervisors on Gemba walk problem-solving techniques',
          'Standard work adherence climbing past 90%'
        ]
      },
      {
        timeframe: 'Day 181–360 (Mastery)',
        title: 'Internal Capability & Institutional Self-Reliance',
        deliverables: [
          'Certification of internal Green Belts and Lean Change Champions',
          'Autonomous frontline A3 problem-solving solving 80% of issues at the cell',
          'Sustained operational excellence culture with verified annual cost reductions'
        ]
      }
    ],
    industryApplications: [
      {
        sector: 'Global Aerospace Subcontractor',
        environment: 'Precision sheet metal fabrication and structural aircraft assembly',
        intervention: 'Tiered daily accountability, Leader Standard Work, and visual 5S controls',
        measuredResult: 'On-time delivery rose from 68% to 99.4% in 9 months'
      },
      {
        sector: 'National Food & Beverage Processor',
        environment: 'High-speed bottling and packaging lines operating 24/7/365',
        intervention: 'Autonomous maintenance (TPM) checklists and operator problem-solving boards',
        measuredResult: 'Unplanned downtime reduced by 52% with zero added maintenance staff'
      },
      {
        sector: 'Commercial Insurance Underwriting Hub',
        environment: 'Multi-regional underwriting operations with 450 service adjusters',
        intervention: 'Digital Kanban boards, daily pacing huddles, and workload leveling (Heijunka)',
        measuredResult: 'Underwriting capacity expanded by 41% with zero hiring'
      },
      {
        sector: 'Public Sector Transit Authority',
        environment: 'Bus and rail rolling stock fleet depot maintenance workshops',
        intervention: 'Standardized overhaul procedures, shadow boards, and visual parts staging',
        measuredResult: 'Depot turnaround time compressed from 14 days down to 4.5 days'
      }
    ],
    businessBenefits: [
      {
        title: 'Permanent Operational Resilience',
        summary: 'Embedding process discipline into the management operating system prevents regression.',
        impactMetrics: ['Zero Post-Consulting Drop-off', 'Consistent Multi-Shift Performance', 'Audit Ready']
      },
      {
        title: 'Frontline Capability Elevation',
        summary: 'Equipping team leads with statistical problem-solving builds internal consulting capability.',
        impactMetrics: ['Certified Internal Practitioners', 'Reduced Reliance on External Agencies', 'High Morale']
      },
      {
        title: 'Continuous Cost Compression',
        summary: 'Dozens of small Kaizen improvements accumulate into millions in annual recurring savings.',
        impactMetrics: ['+$1.8M Annual Grassroots Savings', 'Predictable Operational Rhythms', 'Board Trust']
      }
    ],
    relatedUseCases: [
      {
        clientProfile: 'Global Packaging Solutions Enterprise — 6 Manufacturing Plants',
        problemStatement: 'Severe performance inconsistency across plants with identical machinery.',
        interventionSummary: 'Implemented standardized Lean Management System, Tiered huddles, and Leader Standard Work.',
        verifiedRoi: '$6.2M Cumulative EBITDA Lift Across 6 Facilities',
        route: 'usecases'
      },
      {
        clientProfile: 'Specialty Chemical Manufacturer',
        problemStatement: 'Frequent shift handover misunderstandings resulting in contaminated batch blending.',
        interventionSummary: 'Designed digital shift handover logs and visual 5S batch verification protocols.',
        verifiedRoi: 'Zero Contamination Events in 3 Years ($2.4M Saved)',
        route: 'usecases'
      }
    ],
    cta: {
      primaryText: 'Schedule Operational Excellence Assessment',
      primaryActionRoute: 'contact',
      acceleratorToolName: 'Value Stream Mapping Canvas',
      acceleratorToolRoute: 'vsm',
      acceleratorTag: 'Diagnose Management Systems'
    }
  }
};
