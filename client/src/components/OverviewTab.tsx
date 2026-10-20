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

  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-700';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#CBD5E1';

  return (
    <div className="space-y-6">
      
      {/* Top Level Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Winner & MP (ECI-Style Frame) */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all shadow-xs`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#20783B]"></div>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-sans font-bold uppercase tracking-wider ${textSecondary}`}>
              ELECTED MP ({currentElection.year})
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}`}>
              WON
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-xl font-bold font-sans tracking-tight ${textPrimary}`}>
              {winner?.name}
            </div>
            <div className="flex items-center space-x-2 mt-1.5 text-xs font-sans">
              <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-[#20783B]/15 text-emerald-700 dark:text-emerald-400 border border-[#20783B]/30">
                {winner?.party}
              </span>
              <span className={textSecondary}>
                <span className={`font-bold ${textPrimary}`}>{winner?.vote_share_percent}%</span> ({winner?.total_votes.toLocaleString()} votes)
              </span>
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between text-xs font-sans ${textSecondary}`}>
            <span>Runner-up: <strong className={`font-semibold ${textPrimary}`}>{runnerUp?.party}</strong></span>
            <span className={`font-bold ${textPrimary}`}>{runnerUp?.vote_share_percent}%</span>
          </div>
        </div>

        {/* KPI 2: Margin of Victory */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all shadow-xs`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]"></div>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-sans font-bold uppercase tracking-wider ${textSecondary}`}>
              VICTORY LEAD MARGIN
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-100 text-blue-800 border border-blue-300'}`}>
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-sans tracking-tight text-emerald-600 dark:text-emerald-400`}>
              +{currentElection.winning_margin.toLocaleString()}
            </div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-xs font-sans">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                +{currentElection.winning_margin_percent}%
              </span>
              <span className={textSecondary}>lead over runner-up</span>
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between text-xs font-sans ${textSecondary}`}>
            <span>Resilience</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">Decisive Superiority</span>
          </div>
        </div>

        {/* KPI 3: Turnout & Polled Votes */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all shadow-xs`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B5CF6]"></div>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-sans font-bold uppercase tracking-wider ${textSecondary}`}>
              VOTER TURNOUT
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-100 text-purple-800 border border-purple-300'}`}>
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-sans tracking-tight ${textPrimary}`}>
              {currentElection.voter_turnout_percent}%
            </div>
            <div className={`mt-1.5 text-xs font-sans ${textSecondary}`}>
              <span className={`font-semibold ${textPrimary}`}>{currentElection.total_votes_polled.toLocaleString()}</span> votes polled
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between text-xs font-sans ${textSecondary}`}>
            <span>Total Electorate</span>
            <span className={`font-bold ${textPrimary}`}>{currentElection.total_electors.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 4: Assembly Segments Grip */}
        <div className={`${cardBg} border rounded-xl p-5 relative overflow-hidden transition-all shadow-xs`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]"></div>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-sans font-bold uppercase tracking-wider ${textSecondary}`}>
              ASSEMBLY ALIGNMENT
            </span>
            <span className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold font-sans tracking-tight ${textPrimary}`}>
              6 <span className={`text-sm font-semibold ${textSecondary}`}>/ 7 Leads</span>
            </div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-xs font-sans">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">AIMIM: 6</span>
              <span className={textMuted}>•</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">BJP: 1 (Goshamahal)</span>
            </div>
          </div>
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between text-xs font-sans ${textSecondary}`}>
            <span>Core Fortress</span>
            <span className={`font-bold ${textPrimary}`}>Bahadurpura (+1.35L)</span>
          </div>
        </div>

      </div>

      {/* Visualizations: Clean Sans-Serif Axis & Crisp Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Historical Vote Share Bar Comparison */}
        <div className={`${cardBg} border rounded-xl p-6 shadow-xs`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-bold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <PieIcon className="h-4 w-4 text-blue-500" />
                <span>Historical Party Vote Share Evolution (2009 - 2024)</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Longitudinal consolidation of bipolar voting dynamics</p>
            </div>
            <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'}`}>
              ECI Form 20
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" fontSize={12} tickLine={false} fontFamily="inherit" />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} unit="%" fontFamily="inherit" />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: isDark ? '#F8FAFC' : '#0F172A', fontWeight: 600 }}
                />
                <Bar dataKey="AIMIM" name="AIMIM" fill="#20783B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BJP" name="BJP" fill="#FF9933" radius={[4, 4, 0, 0]} />
                <Bar dataKey="INC" name="INC" fill="#19AAED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="BRS" name="TRS/BRS" fill="#FE0175" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'} text-xs font-sans`}>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#20783B]"></span>
              <span className={`font-semibold ${textSecondary}`}>AIMIM</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF9933]"></span>
              <span className={`font-semibold ${textSecondary}`}>BJP</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#19AAED]"></span>
              <span className={`font-semibold ${textSecondary}`}>INC</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FE0175]"></span>
              <span className={`font-semibold ${textSecondary}`}>BRS/TRS</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Turnout vs Victory Margin Correlation */}
        <div className={`${cardBg} border rounded-xl p-6 shadow-xs`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-bold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>Turnout Rate vs Winning Margin Correlation</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Electoral resilience: winning margin expands despite fluctuating turnout</p>
            </div>
            <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'}`}>
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
                <XAxis dataKey="year" stroke="#64748B" fontSize={12} tickLine={false} fontFamily="inherit" />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} unit="%" fontFamily="inherit" />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: isDark ? '#F8FAFC' : '#0F172A', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="turnout" name="Turnout %" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTurnout)" />
                <Area type="monotone" dataKey="margin" name="Winning Margin %" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMargin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'} text-xs font-sans`}>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]"></span>
              <span className={`font-semibold ${textSecondary}`}>Turnout %</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]"></span>
              <span className={`font-semibold ${textSecondary}`}>Winning Margin %</span>
            </div>
          </div>
        </div>

      </div>

      {/* Assembly Segments Lead Heatmap / Summary Table */}
      <div className={`${cardBg} border rounded-xl p-6 shadow-xs`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-bold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
              <Users className="h-4 w-4 text-amber-500" />
              <span>Assembly Segment Lead Distribution in 2024 Parliamentary Election</span>
            </h3>
            <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Comparative performance breakdown across all 7 Vidhan Sabha segments</p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[620px] text-left text-xs font-sans">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-300 text-slate-800'} text-[11px] uppercase tracking-wider`}>
                <th className="pb-3.5 font-bold">AC NO & NAME</th>
                <th className="pb-3.5 font-bold">TOTAL ELECTORS</th>
                <th className="pb-3.5 font-bold">2024 TURNOUT</th>
                <th className="pb-3.5 font-bold">AIMIM VOTES</th>
                <th className="pb-3.5 font-bold">BJP VOTES</th>
                <th className="pb-3.5 font-bold">LEAD PARTY</th>
                <th className="pb-3.5 font-bold text-right">LEAD MARGIN</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
              {assemblySegments.map((segment) => {
                const isAIMIM = segment.leading_party_2024 === 'AIMIM';
                return (
                  <tr key={segment.ac_no} className={`${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className={`py-3.5 font-semibold ${textPrimary} flex items-center space-x-2`}>
                      <span className={`${textMuted} font-bold text-[11px]`}>#{segment.ac_no}</span>
                      <span className="font-bold">{segment.ac_name}</span>
                    </td>
                    <td className={`py-3.5 ${textSecondary} font-semibold`}>{segment.electors.toLocaleString()}</td>
                    <td className={`py-3.5 ${textSecondary} font-semibold`}>{segment.turnout_2024}%</td>
                    <td className="py-3.5 text-emerald-700 dark:text-emerald-400 font-bold">{segment.aimim_votes_2024.toLocaleString()}</td>
                    <td className="py-3.5 text-amber-700 dark:text-amber-400 font-bold">{segment.bjp_votes_2024.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isAIMIM 
                          ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {segment.leading_party_2024} Lead
                      </span>
                    </td>
                    <td className={`py-3.5 text-right font-bold text-sm ${textPrimary}`}>
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
