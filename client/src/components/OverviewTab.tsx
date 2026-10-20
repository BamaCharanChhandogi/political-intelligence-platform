import React from 'react';
import { 
  Trophy, 
  Users, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
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
  onSelectYear?: (year: number) => void;
  isDark: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  currentElection,
  historicalElections,
  assemblySegments,
  isDark
}) => {
  const winner = currentElection.candidates.find(c => c.is_winner);
  const runnerUp = currentElection.candidates.find(c => c.position === 2);

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

  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';

  return (
    <div className="space-y-6">
      
      {/* Top Level Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Winner & MP */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all hover:border-blue-500/40`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>
              Elected MP ({currentElection.year})
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              <Trophy className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-lg font-bold font-sans tracking-tight ${textPrimary}`}>{winner?.name}</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-[#20783B]/20 text-emerald-400 border border-[#20783B]/40">
                {winner?.party}
              </span>
              <span className={`text-xs font-mono ${textSecondary}`}>
                {winner?.vote_share_percent}% ({winner?.total_votes.toLocaleString()} votes)
              </span>
            </div>
          </div>
          <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} flex items-center justify-between text-[11px] ${textSecondary}`}>
            <span className="font-sans">Runner-up: {runnerUp?.party}</span>
            <span className="font-mono font-medium">{runnerUp?.vote_share_percent}%</span>
          </div>
        </div>

        {/* KPI 2: Margin of Victory */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all hover:border-blue-500/40`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>
              Victory Lead Margin
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight ${textPrimary}`}>
              +{currentElection.winning_margin.toLocaleString()}
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span className="text-emerald-500 font-semibold font-mono flex items-center">
                +{currentElection.winning_margin_percent}%
              </span>
              <span className={`font-sans ${textSecondary}`}>lead over runner-up</span>
            </div>
          </div>
          <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} flex items-center justify-between text-[11px] ${textSecondary}`}>
            <span className="font-sans">Resilience Assessment</span>
            <span className="text-emerald-500 font-sans font-medium">Decisive Superiority</span>
          </div>
        </div>

        {/* KPI 3: Turnout & Polled Votes */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all hover:border-blue-500/40`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>
              Voter Turnout
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight ${textPrimary}`}>
              {currentElection.voter_turnout_percent}%
            </div>
            <div className={`flex items-center space-x-2 mt-1 text-xs font-mono ${textSecondary}`}>
              <span>{currentElection.total_votes_polled.toLocaleString()} polled</span>
            </div>
          </div>
          <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} flex items-center justify-between text-[11px] ${textSecondary}`}>
            <span className="font-sans">Total Electorate</span>
            <span className="font-mono font-medium">{currentElection.total_electors.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 4: Assembly Segments Grip */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all hover:border-blue-500/40`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-sans font-semibold uppercase tracking-wider ${textSecondary}`}>
              Assembly Alignment
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-mono tracking-tight ${textPrimary}`}>
              6 <span className={`text-base font-normal font-sans ${textSecondary}`}>/ 7 Leads</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span className="text-emerald-500 font-mono font-medium">AIMIM: 6</span>
              <span className={textMuted}>•</span>
              <span className="text-amber-500 font-mono font-medium">BJP: 1 (Goshamahal)</span>
            </div>
          </div>
          <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} flex items-center justify-between text-[11px] ${textSecondary}`}>
            <span className="font-sans">Core Anchor AC</span>
            <span className={`font-sans font-medium ${textPrimary}`}>Bahadurpura (+1.35L)</span>
          </div>
        </div>

      </div>

      {/* Visualizations: Vote Share Progression & Clean Gradient Correlation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Historical Vote Share Bar Comparison */}
        <div className={`${cardBg} border rounded-xl p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <PieIcon className="h-4 w-4 text-blue-500" />
                <span>Historical Party Vote Share Evolution (2009 - 2024)</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Longitudinal consolidation of bipolar voting dynamics</p>
            </div>
            <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
              ECI Form 20
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                />
                <Bar dataKey="AIMIM" name="AIMIM" fill="#20783B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BJP" name="BJP" fill="#FF9933" radius={[4, 4, 0, 0]} />
                <Bar dataKey="INC" name="INC" fill="#19AAED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BRS" name="TRS/BRS" fill="#FE0175" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex items-center justify-center space-x-6 mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} text-xs font-sans`}>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#20783B]"></span>
              <span className={textSecondary}>AIMIM</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF9933]"></span>
              <span className={textSecondary}>BJP</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#19AAED]"></span>
              <span className={textSecondary}>INC</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FE0175]"></span>
              <span className={textSecondary}>BRS/TRS</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Turnout vs Victory Margin Correlation (Refined 0.15 Opacity) */}
        <div className={`${cardBg} border rounded-xl p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>Turnout Rate vs Winning Margin Correlation</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Electoral resilience: winning margin expands despite fluctuating turnout</p>
            </div>
            <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
              Trend Analysis
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="turnout" name="Turnout %" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTurnout)" />
                <Area type="monotone" dataKey="margin" name="Winning Margin %" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMargin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex items-center justify-center space-x-6 mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} text-xs font-sans`}>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]"></span>
              <span className={textSecondary}>Turnout %</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
              <span className={textSecondary}>Winning Margin %</span>
            </div>
          </div>
        </div>

      </div>

      {/* Assembly Segments Lead Heatmap / Summary Table */}
      <div className={`${cardBg} border rounded-xl p-5 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
              <Users className="h-4 w-4 text-amber-500" />
              <span>Assembly Segment Lead Distribution in 2024 Parliamentary Election</span>
            </h3>
            <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Comparative performance breakdown across all 7 Vidhan Sabha segments</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} font-sans text-[11px]`}>
                <th className="pb-3 font-semibold">AC NO & NAME</th>
                <th className="pb-3 font-semibold">TOTAL ELECTORS</th>
                <th className="pb-3 font-semibold">2024 TURNOUT</th>
                <th className="pb-3 font-semibold">AIMIM VOTES</th>
                <th className="pb-3 font-semibold">BJP VOTES</th>
                <th className="pb-3 font-semibold">LEAD PARTY</th>
                <th className="pb-3 font-semibold text-right">LEAD MARGIN</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'} font-mono`}>
              {assemblySegments.map((segment) => {
                const isAIMIM = segment.leading_party_2024 === 'AIMIM';
                return (
                  <tr key={segment.ac_no} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`py-3.5 font-sans font-medium ${textPrimary} flex items-center space-x-2`}>
                      <span className={`${textMuted} font-mono text-[11px]`}>#{segment.ac_no}</span>
                      <span>{segment.ac_name}</span>
                    </td>
                    <td className={`py-3.5 ${textSecondary}`}>{segment.electors.toLocaleString()}</td>
                    <td className={`py-3.5 ${textSecondary}`}>{segment.turnout_2024}%</td>
                    <td className="py-3.5 text-emerald-500 font-semibold">{segment.aimim_votes_2024.toLocaleString()}</td>
                    <td className="py-3.5 text-amber-500 font-semibold">{segment.bjp_votes_2024.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${
                        isAIMIM 
                          ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {segment.leading_party_2024} Lead
                      </span>
                    </td>
                    <td className={`py-3.5 text-right font-semibold ${textPrimary}`}>
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
