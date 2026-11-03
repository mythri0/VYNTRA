export interface KpiImpactItem {
  name: string;
  baseline: string;
  targetDelta: string;
  formula: string;
  financialImpact: string;
}

export interface OutcomePhase {
  timeframe: string;
  title: string;
  deliverables: string[];
}

export interface IndustryApplicationItem {
  sector: string;
  environment: string;
  intervention: string;
  measuredResult: string;
}

export interface BusinessBenefitCategory {
  title: string;
  summary: string;
  impactMetrics: string[];
}

export interface VerifiedUseCaseSummary {
  clientProfile: string;
  problemStatement: string;
  interventionSummary: string;
  verifiedRoi: string;
  route: string;
}

export interface EnterpriseStandardPageData {
  id: string;
  route: string;
  category: string;
  title: string;
  tagline: string;
  executiveSummary: string;
  
  // Section 1: Business Challenge
  challenge: {
    overview: string;
    macroPressures: string[];
    frictionModes: { title: string; desc: string }[];
  };

  // Section 2: Solution & Methodology
  solution: {
    approach: string;
    stages: { stage: string; name: string; focus: string }[];
  };

  // Section 3: KPIs Impacted
  kpis: KpiImpactItem[];

  // Section 4: Expected Outcomes
  outcomesTimeline: OutcomePhase[];

  // Section 5: Industry Applications
  industryApplications: IndustryApplicationItem[];

  // Section 6: Business Benefits
  businessBenefits: BusinessBenefitCategory[];

  // Section 7: Verified Use Cases
  relatedUseCases: VerifiedUseCaseSummary[];

  // Section 8: CTA Configuration
  cta: {
    primaryText: string;
    primaryActionRoute: string;
    acceleratorToolName: string;
    acceleratorToolRoute: string;
    acceleratorTag: string;
  };
}

