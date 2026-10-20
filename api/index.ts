import type { VercelRequest, VercelResponse } from '@vercel/node';
import pcMetadata from './data/pc_metadata.json';
import assemblySegments from './data/assembly_segments.json';
import parliamentaryElections from './data/parliamentary_elections.json';
import segmentAnalysis from './data/segment_wise_analysis.json';
import demographics from './data/demographics_profile.json';
import parties from './data/parties.json';
import electoralInsights from './data/electoral_insights.json';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse path: /api/v1/overview, /api/v1/elections, etc.
  const path = req.query.path as string || '';
  const cleanPath = Array.isArray(path) ? path.join('/') : path;

  try {
    if (cleanPath === 'overview' || cleanPath === 'v1/overview') {
      const latestElection = parliamentaryElections[0];
      const previousElection = parliamentaryElections[1];
      const winner = latestElection.candidates.find((c: any) => c.is_winner);
      const runnerUp = latestElection.candidates.find((c: any) => c.position === 2);

      return res.status(200).json({
        success: true,
        source: 'Vercel Serverless Function (Production Cloud)',
        data: {
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
        },
        timestamp: new Date().toISOString()
      });
    }

    if (cleanPath === 'elections' || cleanPath === 'v1/elections') {
      const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
      const data = year ? parliamentaryElections.find((e: any) => e.year === year) : parliamentaryElections;
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data });
    }

    if (cleanPath === 'trends/vote-share' || cleanPath === 'v1/trends/vote-share') {
      const data = parliamentaryElections.slice().reverse().map((e: any) => {
        const item: Record<string, any> = {
          year: e.year,
          turnout: e.voter_turnout_percent,
          margin_pct: e.winning_margin_percent
        };
        e.candidates.forEach((c: any) => {
          item[c.party] = c.vote_share_percent;
        });
        return item;
      });
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data });
    }

    if (cleanPath === 'assembly-segments' || cleanPath === 'v1/assembly-segments') {
      return res.status(200).json({
        success: true,
        source: 'Vercel Serverless Function',
        data: {
          segments: segmentAnalysis,
          summary: {
            total_segments: segmentAnalysis.length,
            aimim_leads: segmentAnalysis.filter((s: any) => s.leading_party_2024 === 'AIMIM').length,
            bjp_leads: segmentAnalysis.filter((s: any) => s.leading_party_2024 === 'BJP').length,
            inc_leads: segmentAnalysis.filter((s: any) => s.leading_party_2024 === 'INC').length
          }
        }
      });
    }

    if (cleanPath === 'demographics' || cleanPath === 'v1/demographics') {
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data: demographics });
    }

    if (cleanPath === 'parties' || cleanPath === 'v1/parties') {
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data: parties });
    }

    if (cleanPath === 'intelligence-insights' || cleanPath === 'v1/intelligence-insights') {
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data: electoralInsights });
    }

    // Default API Info
    return res.status(200).json({
      status: 'ONLINE',
      service: 'Political Intelligence Platform Cloud API',
      engine: 'Vercel Serverless Node.js Engine (Zero Cold-Sleep)',
      constituency: 'Hyderabad Parliamentary Constituency (Telangana)',
      available_endpoints: [
        '/api/v1/overview',
        '/api/v1/elections',
        '/api/v1/trends/vote-share',
        '/api/v1/assembly-segments',
        '/api/v1/demographics',
        '/api/v1/parties',
        '/api/v1/intelligence-insights'
      ]
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
