export interface CandidateResult {
  name: string;
  party: string;
  party_color: string;
  evm_votes: number;
  postal_votes: number;
  total_votes: number;
  vote_share_percent: number;
  position: number;
  is_winner: boolean;
}

export interface ParliamentaryElection {
  year: number;
  election_date: string;
  counting_date: string;
  total_electors: number;
  total_votes_polled: number;
  voter_turnout_percent: number;
  valid_votes: number;
  nota_votes: number;
  nota_percent: number;
  winning_margin: number;
  winning_margin_percent: number;
  winner_party: string;
  candidates: CandidateResult[];
}

export interface AssemblySegment {
  ac_no: number;
  ac_name: string;
  electors: number;
  turnout_2024: number;
  aimim_votes_2024: number;
  bjp_votes_2024: number;
  inc_votes_2024: number;
  leading_party_2024: string;
  lead_margin_2024: number;
  winner_assembly_2023: string;
  party_assembly_2023: string;
  assembly_margin_2023: number;
  dominant_community: string;
  strategic_status: string;
}

export interface DemographicProfile {
  constituency: string;
  district: string;
  census_year: number;
  total_population: number;
  male_population: number;
  female_population: number;
  sex_ratio: number;
  population_density_per_sq_km: number;
  literacy_rate: number;
  male_literacy: number;
  female_literacy: number;
  urban_population_percent: number;
  rural_population_percent: number;
  religious_composition: {
    religion: string;
    percent: number;
    population: number;
    color: string;
  }[];
  social_category_composition: {
    category: string;
    percent: number;
    population: number;
  }[];
  age_demographics: {
    group: string;
    percent: number;
    elector_impact: string;
  }[];
  socio_economic_indicators: {
    workforce_participation_rate: number;
    major_economic_sectors: string[];
    slum_household_percent: number;
    piped_drinking_water_coverage: number;
  };
}

export interface IntelligenceInsight {
  title: string;
  observation: string;
  type: string;
}

export interface SwingData {
  period: string;
  aimim_swing: string;
  bjp_swing: string;
  inc_swing: string;
  brs_swing: string;
  others_swing: string;
}
