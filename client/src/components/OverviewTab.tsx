import React from 'react';
import { 
  Trophy, 
  Users, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Percent, 
  PieChart as PieIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';
import { ParliamentaryElection, AssemblySegment } from '../types';

interface OverviewTabProps {
  currentElection: ParliamentaryElection;
  historicalElections: ParliamentaryElection[];
  assemblySegments: AssemblySegment[];
  onSelectYear: (year: number) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  currentElection,
  historicalElections,
  assemblySegments,
  onSelectYear
}) => {
  const winner = currentElection.candidates.find(c => c.is_winner);
  const runnerUp = currentElection.candidates.find(c => c.position === 2);

  // Prepare trend data for charts
  const trendData = historicalElections
    .slice()
    .reverse()
    .map(e => ({
      year: e.year,
      turnout: e.voter_turnout_percent,
      margin: e.winning_margin_percent,
      AIMIM: e.candidates.find(c => c.party === 'AIMIM')?.vote_share_percent || 0,
      BJP: e.candidates.find(c => c.party === 'BJP')?.vote_share_percent || 0,
      INC: e.candidates.find(c => c.party === 'INC')?.vote_share_percent || 0,
      BRS: e.candidates.find(c => c.party === 'BRS' || c.party === 'TRS')?.vote_share_percent || 0
    }));

  return (
    <div className="space-y-6">
      
      {/* Top Level Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Winner & MP */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Winning MP ({currentElection.year})</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Trophy className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-white tracking-tight">{winner?.name}</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-[#20783B]/20 text-emerald-300 border border-[#20783B]/40">
                {winner?.party}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {winner?.vote_share_percent}% ({winner?.total_votes.toLocaleString()} votes)
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Runner-up: {runnerUp?.party}</span>
            <span className="font-mono text-slate-300">{runnerUp?.vote_share_percent}%</span>
          </div>
        </div>

        {/* KPI 2: Margin of Victory */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Victory Margin</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              +{currentElection.winning_margin.toLocaleString()}
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center">
                +{currentElection.winning_margin_percent}%
              </span>
              <span className="text-slate-400">lead over runner-up</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Decisive Dominance</span>
            <span className="text-emerald-400 font-mono">High Resilience</span>
          </div>
        </div>

        {/* KPI 3: Turnout & Polled Votes */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Voter Turnout</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {currentElection.voter_turnout_percent}%
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400 font-mono">
              <span>{currentElection.total_votes_polled.toLocaleString()} polled</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Total Electorate</span>
            <span className="font-mono text-slate-300">{currentElection.total_electors.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 4: Assembly Segments Grip */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Assembly Alignment</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              6 <span className="text-base font-normal text-slate-400">/ 7 Leads</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
              <span className="text-emerald-400 font-mono font-medium">AIMIM: 6</span>
              <span>•</span>
              <span className="text-amber-400 font-mono font-medium">BJP: 1 (Goshamahal)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Core Stronghold AC</span>
            <span className="text-slate-300">Bahadurpura (+1.35L)</span>
          </div>
        </div>

      </div>

      {/* Primary Visualizations: Vote Share Progression & Turnout Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Historical Vote Share Bar Comparison */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                <PieIcon className="h-4 w-4 text-blue-400" />
                <span>Historical Party Vote Share Evolution (2009 - 2024)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Decadal consolidation of bipolar voting dynamics</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ECI Form 20</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="AIMIM" name="AIMIM" fill="#20783B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BJP" name="BJP" fill="#FF9933" radius={[4, 4, 0, 0]} />
                <Bar dataKey="INC" name="INC" fill="#19AAED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BRS" name="TRS/BRS" fill="#FE0175" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#20783B]"></span>
              <span className="text-slate-300">AIMIM</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF9933]"></span>
              <span className="text-slate-300">BJP</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#19AAED]"></span>
              <span className="text-slate-300">INC</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FE0175]"></span>
              <span className="text-slate-300">BRS/TRS</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Turnout vs Victory Margin Correlation */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Turnout Rate vs Winning Margin Correlation</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Electoral resilience: winning margin expands despite varying turnout</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Trend Analysis</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="turnout" name="Turnout %" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorTurnout)" />
                <Area type="monotone" dataKey="margin" name="Winning Margin %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorMargin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]"></span>
              <span className="text-slate-300">Turnout %</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
              <span className="text-slate-300">Winning Margin %</span>
            </div>
          </div>
        </div>

      </div>

      {/* Assembly Segments Lead Heatmap / Summary Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
              <Users className="h-4 w-4 text-amber-400" />
              <span>Assembly Segment Lead Distribution in 2024 Parliamentary Election</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Comparative performance breakdown across all 7 Vidhan Sabha segments</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="pb-3 font-semibold">AC NO & NAME</th>
                <th className="pb-3 font-semibold">TOTAL ELECTORS</th>
                <th className="pb-3 font-semibold">2024 TURNOUT</th>
                <th className="pb-3 font-semibold">AIMIM VOTES</th>
                <th className="pb-3 font-semibold">BJP VOTES</th>
                <th className="pb-3 font-semibold">LEAD PARTY</th>
                <th className="pb-3 font-semibold text-right">LEAD MARGIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {assemblySegments.map((segment) => {
                const isAIMIM = segment.leading_party_2024 === 'AIMIM';
                return (
                  <tr key={segment.ac_no} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-sans font-medium text-white flex items-center space-x-2">
                      <span className="text-slate-500 font-mono text-[11px]">{segment.ac_no}</span>
                      <span>{segment.ac_name}</span>
                    </td>
                    <td className="py-3 text-slate-300">{segment.electors.toLocaleString()}</td>
                    <td className="py-3 text-slate-300">{segment.turnout_2024}%</td>
                    <td className="py-3 text-emerald-400">{segment.aimim_votes_2024.toLocaleString()}</td>
                    <td className="py-3 text-amber-400">{segment.bjp_votes_2024.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        isAIMIM 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {segment.leading_party_2024}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-white">
                      +{segment.lead_margin_2024.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
