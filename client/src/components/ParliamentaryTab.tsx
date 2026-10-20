import React from 'react';
import { ParliamentaryElection } from '../types';
import { 
  Trophy, 
  Vote, 
  Percent
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

interface ParliamentaryTabProps {
  elections: ParliamentaryElection[];
  selectedYear: number;
  isDark: boolean;
}

export const ParliamentaryTab: React.FC<ParliamentaryTabProps> = ({
  elections,
  selectedYear,
  isDark,
}) => {
  const currentElection = elections.find(e => e.year === selectedYear) || elections[0];

  const pieData = currentElection.candidates.map(c => ({
    name: `${c.party} (${c.name})`,
    value: c.vote_share_percent,
    votes: c.total_votes,
    color: c.party_color || '#94A3B8'
  }));

  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const tableHover = isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50';
  const tableDivide = isDark ? 'divide-slate-800/60' : 'divide-slate-100';
  const tableBorder = isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600';
  const winnerRowBg = isDark ? 'bg-emerald-950/20' : 'bg-emerald-50/40';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.split('T')[0];
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Single Context Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border p-5 rounded-xl transition-colors ${cardBg}`}>
        <div>
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-bold font-sans tracking-tight ${textPrimary}`}>
              {currentElection.year} Parliamentary Election Results
            </h2>
            <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${
              isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              LOK SABHA
            </span>
          </div>
          <p className={`text-xs font-sans mt-1 ${textSecondary}`}>
            Official Returns • Polling Date: {formatDate(currentElection.election_date)} • Counting Date: {formatDate(currentElection.counting_date)}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-sans">
          <span className={`px-2.5 py-1 rounded-lg border font-medium ${
            isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            Winner: {currentElection.winner_party}
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-mono ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            Lead: +{currentElection.winning_margin.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>Total Electors</div>
          <div className={`text-xl font-bold font-mono mt-1.5 ${textPrimary}`}>
            {currentElection.total_electors.toLocaleString()}
          </div>
        </div>
        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>Votes Polled (Turnout)</div>
          <div className={`text-xl font-bold font-mono mt-1.5 ${textPrimary}`}>
            {currentElection.total_votes_polled.toLocaleString()} <span className="text-sm font-normal text-slate-400">({currentElection.voter_turnout_percent}%)</span>
          </div>
        </div>
        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>Winning Margin</div>
          <div className="text-xl font-bold font-mono text-emerald-500 mt-1.5">
            +{currentElection.winning_margin.toLocaleString()} <span className="text-sm font-normal text-emerald-500/80">({currentElection.winning_margin_percent}%)</span>
          </div>
        </div>
        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`text-[11px] font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>NOTA Votes</div>
          <div className={`text-xl font-bold font-mono mt-1.5 ${textPrimary}`}>
            {currentElection.nota_votes.toLocaleString()} <span className="text-sm font-normal text-slate-400">({currentElection.nota_percent}%)</span>
          </div>
        </div>
      </div>

      {/* Candidates Results Table & Vote Share Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detailed Table (2 Cols) */}
        <div className={`lg:col-span-2 border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
          <h3 className={`text-sm font-semibold font-sans tracking-tight mb-4 flex items-center space-x-2 ${textPrimary}`}>
            <Vote className="h-4 w-4 text-blue-500" />
            <span>Candidate-Level Vote Breakdown & Performance</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b font-sans text-[11px] ${tableBorder}`}>
                  <th className="pb-3 font-semibold">POS</th>
                  <th className="pb-3 font-semibold">CANDIDATE</th>
                  <th className="pb-3 font-semibold">PARTY</th>
                  <th className="pb-3 font-semibold text-right">EVM VOTES</th>
                  <th className="pb-3 font-semibold text-right">POSTAL</th>
                  <th className="pb-3 font-semibold text-right">TOTAL VOTES</th>
                  <th className="pb-3 font-semibold text-right">VOTE SHARE</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono ${tableDivide}`}>
                {currentElection.candidates.map((candidate) => (
                  <tr key={candidate.name} className={`${tableHover} transition-colors ${candidate.is_winner ? winnerRowBg : ''}`}>
                    <td className="py-3.5">
                      {candidate.is_winner ? (
                        <span className="flex items-center space-x-1 text-emerald-500 font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                          <span>1</span>
                        </span>
                      ) : (
                        <span className={textSecondary}>{candidate.position}</span>
                      )}
                    </td>
                    <td className={`py-3.5 font-sans font-medium ${textPrimary}`}>
                      <div className="flex items-center space-x-2">
                        <span>{candidate.name}</span>
                        {candidate.is_winner && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-semibold border ${
                            isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}>
                            ELECTED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-sans font-semibold border"
                        style={{ 
                          backgroundColor: `${candidate.party_color}15`,
                          color: candidate.party_color,
                          borderColor: `${candidate.party_color}35`
                        }}
                      >
                        {candidate.party}
                      </span>
                    </td>
                    <td className={`py-3.5 text-right ${textSecondary}`}>{candidate.evm_votes.toLocaleString()}</td>
                    <td className={`py-3.5 text-right ${textMuted}`}>{candidate.postal_votes.toLocaleString()}</td>
                    <td className={`py-3.5 text-right font-semibold ${textPrimary}`}>{candidate.total_votes.toLocaleString()}</td>
                    <td className="py-3.5 text-right font-semibold text-blue-500">{candidate.vote_share_percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vote Share Donut Visual (1 Col) */}
        <div className={`border rounded-xl p-5 shadow-sm flex flex-col justify-between transition-colors ${cardBg}`}>
          <div>
            <h3 className={`text-sm font-semibold font-sans tracking-tight mb-1 flex items-center space-x-2 ${textPrimary}`}>
              <Percent className="h-4 w-4 text-emerald-500" />
              <span>Vote Share Distribution</span>
            </h3>
            <p className={`text-xs font-sans ${textSecondary}`}>{currentElection.year} Lok Sabha Election</p>
            
            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`space-y-2 mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-sans">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className={`truncate max-w-[140px] ${textSecondary}`}>{item.name}</span>
                </div>
                <div className="font-mono">
                  <span className={`font-semibold ${textPrimary}`}>{item.value}%</span>
                  <span className={`text-[10px] ml-1 ${textMuted}`}>({item.votes.toLocaleString()})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
