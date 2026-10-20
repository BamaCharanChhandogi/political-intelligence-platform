import pcMetadata from '../data/pc_metadata.json';
import assemblySegments from '../data/assembly_segments.json';
import parliamentaryElections from '../data/parliamentary_elections.json';
import segmentAnalysis from '../data/segment_wise_analysis.json';
import demographics from '../data/demographics_profile.json';
import parties from '../data/parties.json';
import electoralInsights from '../data/electoral_insights.json';

export class ElectionService {
  static getConstituencyOverview() {
    const latestElection = parliamentaryElections[0]; // 2024
    const previousElection = parliamentaryElections[1]; // 2019

    const winner = latestElection.candidates.find(c => c.is_winner);
    const runnerUp = latestElection.candidates.find(c => c.position === 2);

    return {
      metadata: pcMetadata,
      summary_kpis: {
        total_electors: latestElection.total_electors,
        voter_turnout_percent: latestElection.voter_turnout_percent,
        turnout_delta: +(latestElection.voter_turnout_percent - previousElection.voter_turnout_percent).toFixed(2),
        total_votes_polled: latestElection.total_votes_polled,
        winning_candidate: winner?.name,
        winning_party: winner?.party,
        winning_margin: latestElection.winning_margin,
        winning_margin_percent: latestElection.winning_margin_percent,
        runner_up_candidate: runnerUp?.name,
        runner_up_party: runnerUp?.party,
        nota_votes: latestElection.nota_votes,
        nota_percent: latestElection.nota_percent,
        assembly_segments_count: assemblySegments.length
      },
      latest_election: latestElection,
      assembly_segments: assemblySegments
    };
  }

  static getParliamentaryElections(year?: number) {
    if (year) {
      const match = parliamentaryElections.find(e => e.year === year);
      return match || null;
    }
    return parliamentaryElections;
  }

  static getVoteShareTrends() {
    // Formatted for Recharts multi-series area or bar charts
    return parliamentaryElections
      .slice()
      .reverse()
      .map(e => {
        const item: Record<string, any> = {
          year: e.year,
          turnout: e.voter_turnout_percent,
          margin_pct: e.winning_margin_percent
        };
        e.candidates.forEach(c => {
          item[c.party] = c.vote_share_percent;
        });
        return item;
      });
  }

  static getAssemblySegmentAnalysis() {
    return {
      segments: segmentAnalysis,
      summary: {
        total_segments: segmentAnalysis.length,
        aimim_leads: segmentAnalysis.filter(s => s.leading_party_2024 === 'AIMIM').length,
        bjp_leads: segmentAnalysis.filter(s => s.leading_party_2024 === 'BJP').length,
        inc_leads: segmentAnalysis.filter(s => s.leading_party_2024 === 'INC').length,
        highest_margin_segment: segmentAnalysis.reduce((max, s) => s.lead_margin_2024 > max.lead_margin_2024 ? s : max, segmentAnalysis[0]),
        highest_turnout_segment: segmentAnalysis.reduce((max, s) => s.turnout_2024 > max.turnout_2024 ? s : max, segmentAnalysis[0])
      }
    };
  }

  static getDemographicProfile() {
    return demographics;
  }

  static getParties() {
    return parties;
  }

  static getIntelligenceInsights() {
    return electoralInsights;
  }
}
