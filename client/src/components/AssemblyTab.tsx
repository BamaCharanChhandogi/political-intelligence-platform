import React, { useState } from 'react';
import { AssemblySegment } from '../types';
import { 
  MapPin, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface AssemblyTabProps {
  segments: AssemblySegment[];
  isDark: boolean;
}

export const AssemblyTab: React.FC<AssemblyTabProps> = ({ segments, isDark }) => {
  const [selectedSegment, setSelectedSegment] = useState<AssemblySegment>(segments[0]);

  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';
  const subCardBg = isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200';

  const leadChartData = segments.map(s => ({
    name: s.ac_name,
    AIMIM: s.aimim_votes_2024,
    BJP: s.bjp_votes_2024,
    INC: s.inc_votes_2024,
    lead: s.lead_margin_2024,
    winner: s.leading_party_2024
  }));

  return (
    <div className="space-y-6">
      
      {/* Intro Header Card */}
      <div className={`border p-5 rounded-xl transition-colors ${cardBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className={`text-lg font-bold font-sans tracking-tight ${textPrimary}`}>
                Assembly Constituencies (AC) Retrospective Analysis
              </h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${
                isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                7 SEGMENTS
              </span>
            </div>
            <p className={`text-xs font-sans mt-1 ${textSecondary}`}>
              Cross-level electoral analysis: Parliamentary 2024 performance vs 2023 Telangana State Assembly Election outcomes
            </p>
          </div>
          
          <div className="flex items-center space-x-3 text-xs font-sans">
            <span className={`px-2.5 py-1 rounded-lg border font-medium ${
              isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}>
              AIMIM Leads: 6 Segments
            </span>
            <span className={`px-2.5 py-1 rounded-lg border font-medium ${
              isDark ? 'bg-amber-950/40 text-amber-300 border-amber-800/40' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              BJP Leads: 1 Segment (Goshamahal)
            </span>
          </div>
        </div>
      </div>

      {/* Assembly Lead Comparison Chart */}
      <div className={`border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
              <Layers className="h-4 w-4 text-blue-500" />
              <span>Comparative Polling: AIMIM vs BJP Votes Polled by Assembly Segment (2024)</span>
            </h3>
            <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>High vote volume disparity drives parliamentary margin</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} fontFamily="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              />
              <Bar dataKey="AIMIM" name="AIMIM Votes" fill="#20783B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="BJP" name="BJP Votes" fill="#FF9933" radius={[4, 4, 0, 0]} />
              <Bar dataKey="INC" name="INC Votes" fill="#19AAED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Segment Deep-Dive Cards & Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Segments */}
        <div className="lg:col-span-1 space-y-2">
          <div className={`text-xs font-sans font-semibold uppercase tracking-wider mb-2 ${textSecondary}`}>
            SELECT ASSEMBLY CONSTITUENCY:
          </div>
          {segments.map((seg) => {
            const isSelected = selectedSegment.ac_no === seg.ac_no;
            const isAIMIM = seg.leading_party_2024 === 'AIMIM';
            return (
              <button
                key={seg.ac_no}
                onClick={() => setSelectedSegment(seg)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected 
                    ? isDark 
                      ? 'bg-slate-800/80 border-blue-500 shadow-md ring-1 ring-blue-500/50' 
                      : 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/30'
                    : isDark 
                      ? 'bg-[#0F172A] border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`font-mono text-xs ${textMuted}`}>#{seg.ac_no}</span>
                    <span className={`font-semibold font-sans text-sm ${textPrimary}`}>{seg.ac_name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${
                    isAIMIM 
                      ? isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {seg.leading_party_2024} Lead
                  </span>
                </div>
                <div className={`flex items-center justify-between mt-2 text-xs font-mono ${textSecondary}`}>
                  <span className="font-sans">Turnout: <span className="font-mono">{seg.turnout_2024}%</span></span>
                  <span className={`font-semibold ${textPrimary}`}>+{seg.lead_margin_2024.toLocaleString()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Dossier for Selected Segment */}
        <div className={`lg:col-span-2 border rounded-xl p-6 shadow-sm flex flex-col justify-between transition-colors ${cardBg}`}>
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`text-xl font-bold font-sans tracking-tight ${textPrimary}`}>
                    {selectedSegment.ac_name} Assembly Segment
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-mono border ${
                    isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    AC #{selectedSegment.ac_no}
                  </span>
                </div>
                <p className={`text-xs font-sans mt-1 ${textSecondary}`}>
                  Electoral Profile & Strategic Assessment
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-sans uppercase font-medium ${textSecondary}`}>2024 LOK SABHA LEAD</span>
                <div className="text-xl font-bold font-mono text-emerald-500 mt-0.5">
                  +{selectedSegment.lead_margin_2024.toLocaleString()}
                </div>
                <span className={`text-[11px] font-sans font-semibold ${textSecondary}`}>{selectedSegment.leading_party_2024}</span>
              </div>
            </div>

            {/* Quick Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
              <div className={`p-3 rounded-lg border ${subCardBg}`}>
                <span className={`text-[10px] font-sans font-semibold uppercase ${textSecondary}`}>Total Electors</span>
                <div className={`text-base font-bold font-mono mt-1 ${textPrimary}`}>
                  {selectedSegment.electors.toLocaleString()}
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${subCardBg}`}>
                <span className={`text-[10px] font-sans font-semibold uppercase ${textSecondary}`}>2024 Polling Turnout</span>
                <div className="text-base font-bold font-mono text-purple-500 mt-1">
                  {selectedSegment.turnout_2024}%
                </div>
              </div>
              <div className={`p-3 rounded-lg border col-span-2 sm:col-span-1 ${subCardBg}`}>
                <span className={`text-[10px] font-sans font-semibold uppercase ${textSecondary}`}>2023 Assembly Winner</span>
                <div className={`text-sm font-bold font-sans mt-1 truncate ${textPrimary}`}>
                  {selectedSegment.winner_assembly_2023}
                </div>
                <span className="text-[10px] font-sans font-semibold text-emerald-500">
                  {selectedSegment.party_assembly_2023} (+{selectedSegment.assembly_margin_2023.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Qualitative Strategic Insights Box */}
            <div className="space-y-4">
              <div className={`border p-4 rounded-lg ${subCardBg}`}>
                <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1 flex items-center space-x-1.5 font-sans">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Demographic Profile</span>
                </div>
                <p className={`text-xs leading-relaxed font-sans ${textPrimary}`}>
                  {selectedSegment.dominant_community}
                </p>
              </div>

              <div className={`border p-4 rounded-lg ${subCardBg}`}>
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1 flex items-center space-x-1.5 font-sans">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Strategic Intelligence Status</span>
                </div>
                <p className={`text-xs leading-relaxed font-sans ${textPrimary}`}>
                  {selectedSegment.strategic_status}
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-sans ${
            isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-500'
          }`}>
            <span>Historical ECI Form 20 Audited</span>
            <span>Assembly Election: Nov 2023 | Lok Sabha: May 2024</span>
          </div>
        </div>

      </div>

    </div>
  );
};
