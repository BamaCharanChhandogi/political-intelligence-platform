import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

// Initialize PostgreSQL Connection Pool with SSL for Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_vAHoMILkxZ53@ep-shiny-mountain-b5iatoxl-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const pathQuery = req.query.path as string || '';
  const cleanPath = Array.isArray(pathQuery) ? pathQuery.join('/') : pathQuery;

  try {
    const client = await pool.connect();

    try {
      // 1. OVERVIEW ENDPOINT
      if (cleanPath === 'overview' || cleanPath === 'v1/overview') {
        const pcRes = await client.query('SELECT * FROM polintel_parliamentary_constituencies LIMIT 1;');
        const pc = pcRes.rows[0];

        const electionsRes = await client.query('SELECT * FROM polintel_elections WHERE pc_id = $1 ORDER BY year DESC;', [pc.id]);
        const elections = electionsRes.rows;
        const latestElection = elections[0];
        const previousElection = elections[1];

        const candidatesRes = await client.query(
          'SELECT * FROM polintel_candidate_results WHERE election_id = $1 ORDER BY position ASC;',
          [latestElection.id]
        );
        const candidates = candidatesRes.rows;
        const winner = candidates.find(c => c.is_winner);
        const runnerUp = candidates.find(c => c.position === 2);

        const segmentsRes = await client.query('SELECT * FROM polintel_assembly_segments WHERE pc_id = $1 ORDER BY ac_no ASC;', [pc.id]);

        return res.status(200).json({
          success: true,
          source: 'Live Cloud PostgreSQL Database (Neon Serverless)',
          database_driver: 'pg (Node.js Native PostgreSQL Pool)',
          data: {
            metadata: pc,
            summary_kpis: {
              total_electors: Number(latestElection.total_electors),
              voter_turnout_percent: Number(latestElection.voter_turnout_percent),
              turnout_delta: +(Number(latestElection.voter_turnout_percent) - Number(previousElection.voter_turnout_percent)).toFixed(2),
              total_votes_polled: Number(latestElection.total_votes_polled),
              winning_candidate: winner?.candidate_name,
              winning_party: winner?.party,
              winning_margin: Number(latestElection.winning_margin),
              winning_margin_percent: Number(latestElection.winning_margin_percent),
              runner_up_candidate: runnerUp?.candidate_name,
              runner_up_party: runnerUp?.party,
              nota_votes: Number(latestElection.nota_votes),
              nota_percent: Number(latestElection.nota_percent),
              assembly_segments_count: segmentsRes.rows.length
            },
            latest_election: {
              ...latestElection,
              candidates: candidates.map(c => ({
                name: c.candidate_name,
                party: c.party,
                party_color: c.party_color,
                evm_votes: Number(c.evm_votes),
                postal_votes: Number(c.postal_votes),
                total_votes: Number(c.total_votes),
                vote_share_percent: Number(c.vote_share_percent),
                position: c.position,
                is_winner: c.is_winner
              }))
            },
            assembly_segments: segmentsRes.rows
          },
          timestamp: new Date().toISOString()
        });
      }

      // 2. ELECTIONS LIST / DETAIL
      if (cleanPath === 'elections' || cleanPath === 'v1/elections') {
        const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
        let query = 'SELECT * FROM polintel_elections ORDER BY year DESC;';
        let params: any[] = [];
        if (year) {
          query = 'SELECT * FROM polintel_elections WHERE year = $1;';
          params = [year];
        }

        const electionsRes = await client.query(query, params);
        const elections = [];

        for (const el of electionsRes.rows) {
          const candRes = await client.query(
            'SELECT * FROM polintel_candidate_results WHERE election_id = $1 ORDER BY position ASC;',
            [el.id]
          );
          elections.push({
            year: el.year,
            election_date: el.election_date,
            counting_date: el.counting_date,
            total_electors: Number(el.total_electors),
            total_votes_polled: Number(el.total_votes_polled),
            voter_turnout_percent: Number(el.voter_turnout_percent),
            valid_votes: Number(el.valid_votes),
            nota_votes: Number(el.nota_votes),
            nota_percent: Number(el.nota_percent),
            winning_margin: Number(el.winning_margin),
            winning_margin_percent: Number(el.winning_margin_percent),
            winner_party: el.winner_party,
            candidates: candRes.rows.map(c => ({
              name: c.candidate_name,
              party: c.party,
              party_color: c.party_color,
              evm_votes: Number(c.evm_votes),
              postal_votes: Number(c.postal_votes),
              total_votes: Number(c.total_votes),
              vote_share_percent: Number(c.vote_share_percent),
              position: c.position,
              is_winner: c.is_winner
            }))
          });
        }

        return res.status(200).json({
          success: true,
          source: 'Live Cloud PostgreSQL Database (Neon Serverless)',
          data: year ? elections[0] : elections
        });
      }

      // 3. TRENDS
      if (cleanPath === 'trends/vote-share' || cleanPath === 'v1/trends/vote-share') {
        const electionsRes = await client.query('SELECT id, year, voter_turnout_percent, winning_margin_percent FROM polintel_elections ORDER BY year ASC;');
        const trends = [];
        for (const el of electionsRes.rows) {
          const item: Record<string, any> = {
            year: el.year,
            turnout: Number(el.voter_turnout_percent),
            margin_pct: Number(el.winning_margin_percent)
          };
          const candRes = await client.query('SELECT party, vote_share_percent FROM polintel_candidate_results WHERE election_id = $1;', [el.id]);
          candRes.rows.forEach(c => {
            item[c.party] = Number(c.vote_share_percent);
          });
          trends.push(item);
        }
        return res.status(200).json({ success: true, source: 'Live Cloud PostgreSQL Database (Neon)', data: trends });
      }

      // 4. ASSEMBLY SEGMENTS
      if (cleanPath === 'assembly-segments' || cleanPath === 'v1/assembly-segments') {
        const segRes = await client.query('SELECT * FROM polintel_assembly_segments ORDER BY ac_no ASC;');
        const segments = segRes.rows.map(s => ({
          ac_no: s.ac_no,
          ac_name: s.ac_name,
          electors: Number(s.electors_2024),
          turnout_2024: Number(s.turnout_2024),
          aimim_votes_2024: Number(s.aimim_votes_2024),
          bjp_votes_2024: Number(s.bjp_votes_2024),
          inc_votes_2024: Number(s.inc_votes_2024),
          leading_party_2024: s.leading_party_2024,
          lead_margin_2024: Number(s.lead_margin_2024),
          winner_assembly_2023: s.winner_assembly_2023,
          party_assembly_2023: s.party_assembly_2023,
          assembly_margin_2023: Number(s.assembly_margin_2023),
          dominant_community: s.dominant_community,
          strategic_status: s.strategic_status
        }));

        return res.status(200).json({
          success: true,
          source: 'Live Cloud PostgreSQL Database (Neon)',
          data: {
            segments,
            summary: {
              total_segments: segments.length,
              aimim_leads: segments.filter(s => s.leading_party_2024 === 'AIMIM').length,
              bjp_leads: segments.filter(s => s.leading_party_2024 === 'BJP').length,
              inc_leads: segments.filter(s => s.leading_party_2024 === 'INC').length
            }
          }
        });
      }

      // 5. DEMOGRAPHICS
      if (cleanPath === 'demographics' || cleanPath === 'v1/demographics') {
        const demoRes = await client.query('SELECT * FROM polintel_demographics LIMIT 1;');
        const d = demoRes.rows[0];
        return res.status(200).json({
          success: true,
          source: 'Live Cloud PostgreSQL Database (Neon)',
          data: {
            constituency: 'Hyderabad',
            district: 'Hyderabad',
            census_year: d.census_year,
            total_population: Number(d.total_population),
            male_population: Number(d.male_population),
            female_population: Number(d.female_population),
            sex_ratio: d.sex_ratio,
            population_density_per_sq_km: d.population_density_per_sq_km,
            literacy_rate: Number(d.literacy_rate),
            male_literacy: Number(d.male_literacy),
            female_literacy: Number(d.female_literacy),
            urban_population_percent: Number(d.urban_population_percent),
            rural_population_percent: Number(d.rural_population_percent),
            religious_composition: d.religious_composition,
            social_category_composition: d.social_category_composition,
            age_demographics: d.age_demographics,
            socio_economic_indicators: d.socio_economic_indicators
          }
        });
      }

      // 6. PARTIES
      if (cleanPath === 'parties' || cleanPath === 'v1/parties') {
        const partiesRes = await client.query('SELECT * FROM polintel_parties ORDER BY id ASC;');
        return res.status(200).json({ success: true, source: 'Live Cloud PostgreSQL Database (Neon)', data: partiesRes.rows });
      }

      // 7. STRATEGIC INSIGHTS
      if (cleanPath === 'intelligence-insights' || cleanPath === 'v1/intelligence-insights') {
        const insightsRes = await client.query('SELECT title, observation, type FROM polintel_insights ORDER BY id ASC;');
        return res.status(200).json({
          success: true,
          source: 'Live Cloud PostgreSQL Database (Neon)',
          data: {
            key_findings: insightsRes.rows,
            swing_analysis: [
              { period: '2019 vs 2024', aimim_swing: '+2.34%', bjp_swing: '+3.18%', inc_swing: '+0.14%', brs_swing: '-5.47%', others_swing: '-0.19%' },
              { period: '2014 vs 2019', aimim_swing: '+6.04%', bjp_swing: '-5.26%', inc_swing: '+0.59%', brs_swing: '+3.30%', others_swing: '-4.67%' },
              { period: '2009 vs 2014', aimim_swing: '+13.73%', bjp_swing: '+13.42%', inc_swing: '-6.79%', tdp_swing: '-24.69%', others_swing: '-0.55%' }
            ]
          }
        });
      }

      // Default info
      return res.status(200).json({
        status: 'ONLINE',
        service: 'Political Intelligence Platform Cloud API',
        engine: 'Vercel Serverless Function + Neon Cloud PostgreSQL (Direct SQL Query Execution)',
        database: 'Connected to Neon AWS us-east-2 PostgreSQL Pooler',
        endpoints: [
          '/api/v1/overview',
          '/api/v1/elections',
          '/api/v1/trends/vote-share',
          '/api/v1/assembly-segments',
          '/api/v1/demographics',
          '/api/v1/parties',
          '/api/v1/intelligence-insights'
        ]
      });

    } finally {
      client.release();
    }

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
