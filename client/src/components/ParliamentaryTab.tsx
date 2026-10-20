import React, { useState } from 'react';
import { ParliamentaryElection } from '../types';
import { 
  Trophy, 
  Calendar, 
  Vote, 
  Percent, 
  ArrowUpRight, 
  CheckCircle2, 
  Filter
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
  onSelectYear: (year: number) => void;
}

export const ParliamentaryTab: React.FC<ParliamentaryTabProps> = ({
  elections,
  selectedYear,
  onSelectYear,
}) => {
  const currentElection = elections.find(e => e.year === selectedYear) || elections[0];

  const pieData = currentElection.candidates.map(c => ({
    name: `${c.party} (${c.name})`,
    value: c.vote_share_percent,
    votes: c.total_votes,
    color: c.party_color || '#94A3B8'
  }));

  return (
    <div className="space-y-6">
      
      {/* Election Header Bar & Year Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 p-5 rounded-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {currentElection.year} Parliamentary Election Results
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              LOK SABHA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Polling Date: {currentElection.election_date} • Counting Date: {currentElection.counting_date}
          </p>
        </div>

        {/* Year Pills */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
          <Calendar className="h-4 w-4 text-slate-400 ml-2" />
          <span className="text-xs text-slate-400 mr-2 font-mono">SELECT:</span>
          {elections.map(e => (
            <button
              key={e.year}
              onClick={() => onSelectYear(e.year)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                selectedYear === e.year
                  ? 'bg-blue-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {e.year}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Total Electors</div>
          <div className="text-lg font-bold font-mono text-white mt-1">
            {currentElection.total_electors.toLocaleString()}
          </div>
        </div>
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Votes Polled (Turnout)</div>
          <div className="text-lg font-bold font-mono text-white mt-1">
            {currentElection.total_votes_polled.toLocaleString()} ({currentElection.voter_turnout_percent}%)
          </div>
        </div>
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Winning Margin</div>
          <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
            +{currentElection.winning_margin.toLocaleString()} ({currentElection.winning_margin_percent}%)
          </div>
        </div>
        <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase">NOTA Votes</div>
          <div className="text-lg font-bold font-mono text-slate-300 mt-1">
            {currentElection.nota_votes.toLocaleString()} ({currentElection.nota_percent}%)
          </div>
        </div>
      </div>

      {/* Candidates Results Table & Vote Share Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detailed Table (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
          <h3 className="text-sm font-semibold text-white tracking-tight mb-4 flex items-center space-x-2">
            <Vote className="h-4 w-4 text-blue-400" />
            <span>Candidate-Level Vote Breakdown & Performance</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-3 font-semibold">POS</th>
                  <th className="pb-3 font-semibold">CANDIDATE</th>
                  <th className="pb-3 font-semibold">PARTY</th>
                  <th className="pb-3 font-semibold text-right">EVM VOTES</th>
                  <th className="pb-3 font-semibold text-right">POSTAL</th>
                  <th className="pb-3 font-semibold text-right">TOTAL VOTES</th>
                  <th className="pb-3 font-semibold text-right">VOTE SHARE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {currentElection.candidates.map((candidate) => (
                  <tr key={candidate.name} className={`hover:bg-slate-800/30 transition-colors ${candidate.is_winner ? 'bg-emerald-950/20' : ''}`}>
                    <td className="py-3.5">
                      {candidate.is_winner ? (
                        <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                          <span>1</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">{candidate.position}</span>
                      )}
                    </td>
                    <td className="py-3.5 font-sans font-medium text-white">
                      <div className="flex items-center space-x-2">
                        <span>{candidate.name}</span>
                        {candidate.is_winner && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                            ELECTED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{ 
                          backgroundColor: `${candidate.party_color}20`,
                          color: candidate.party_color,
                          borderColor: `${candidate.party_color}40`,
                          borderWidth: '1px'
                        }}
                      >
                        {candidate.party}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-slate-300">{candidate.evm_votes.toLocaleString()}</td>
                    <td className="py-3.5 text-right text-slate-400">{candidate.postal_votes.toLocaleString()}</td>
                    <td className="py-3.5 text-right font-semibold text-white">{candidate.total_votes.toLocaleString()}</td>
                    <td className="py-3.5 text-right font-semibold text-blue-400">{candidate.vote_share_percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vote Share Donut Visual (1 Col) */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight mb-1 flex items-center space-x-2">
              <Percent className="h-4 w-4 text-emerald-400" />
              <span>Vote Share Distribution</span>
            </h3>
            <p className="text-xs text-slate-400">{currentElection.year} Lok Sabha Election</p>
            
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
                    contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 truncate max-w-[140px]">{item.name}</span>
                </div>
                <div className="font-mono text-slate-400">
                  <span className="font-semibold text-white">{item.value}%</span>
                  <span className="text-[10px] ml-1">({item.votes.toLocaleString()})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
