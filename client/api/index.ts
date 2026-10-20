import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Helper to reliably read bundled json files in serverless environments
function loadJson(filename: string) {
  try {
    const filePath = path.join(process.cwd(), 'api', 'data', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    try {
      // Fallback relative path
      const altPath = path.join(__dirname, 'data', filename);
      return JSON.parse(fs.readFileSync(altPath, 'utf-8'));
    } catch {
      return null;
    }
  }
}

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

  const pcMetadata = loadJson('pc_metadata.json');
  const assemblySegments = loadJson('assembly_segments.json');
  const parliamentaryElections = loadJson('parliamentary_elections.json');
  const segmentAnalysis = loadJson('segment_wise_analysis.json');
  const demographics = loadJson('demographics_profile.json');
  const parties = loadJson('parties.json');
  const electoralInsights = loadJson('electoral_insights.json');

  const pathQuery = req.query.path as string || '';
  const cleanPath = Array.isArray(pathQuery) ? pathQuery.join('/') : pathQuery;

  try {
    if (cleanPath === 'overview' || cleanPath === 'v1/overview') {
      const latestElection = parliamentaryElections?.[0];
      const previousElection = parliamentaryElections?.[1];
      const winner = latestElection?.candidates.find((c: any) => c.is_winner);
      const runnerUp = latestElection?.candidates.find((c: any) => c.position === 2);

      return res.status(200).json({
        success: true,
        source: 'Vercel Serverless Function (Production Cloud)',
        data: {
          metadata: pcMetadata,
          summary_kpis: {
            total_electors: latestElection?.total_electors,
            voter_turnout_percent: latestElection?.voter_turnout_percent,
            turnout_delta: latestElection && previousElection 
              ? +(latestElection.voter_turnout_percent - previousElection.voter_turnout_percent).toFixed(2) 
              : 0,
            total_votes_polled: latestElection?.total_votes_polled,
            winning_candidate: winner?.name,
            winning_party: winner?.party,
            winning_margin: latestElection?.winning_margin,
            winning_margin_percent: latestElection?.winning_margin_percent,
            runner_up_candidate: runnerUp?.name,
            runner_up_party: runnerUp?.party,
            nota_votes: latestElection?.nota_votes,
            nota_percent: latestElection?.nota_percent,
            assembly_segments_count: assemblySegments?.length || 7
          },
          latest_election: latestElection,
          assembly_segments: assemblySegments
        },
        timestamp: new Date().toISOString()
      });
    }

    if (cleanPath === 'elections' || cleanPath === 'v1/elections') {
      const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
      const data = year ? parliamentaryElections?.find((e: any) => e.year === year) : parliamentaryElections;
      return res.status(200).json({ success: true, source: 'Vercel Serverless Function', data });
    }

    if (cleanPath === 'trends/vote-share' || cleanPath === 'v1/trends/vote-share') {
      const data = (parliamentaryElections || []).slice().reverse().map((e: any) => {
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
            total_segments: segmentAnalysis?.length || 7,
            aimim_leads: (segmentAnalysis || []).filter((s: any) => s.leading_party_2024 === 'AIMIM').length,
            bjp_leads: (segmentAnalysis || []).filter((s: any) => s.leading_party_2024 === 'BJP').length,
            inc_leads: (segmentAnalysis || []).filter((s: any) => s.leading_party_2024 === 'INC').length
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
