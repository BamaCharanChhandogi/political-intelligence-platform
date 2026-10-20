import React, { useState } from 'react';
import { AssemblySegment } from '../types';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Layers, 
  Search
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
}

export const AssemblyTab: React.FC<AssemblyTabProps> = ({ segments }) => {
  const [selectedSegment, setSelectedSegment] = useState<AssemblySegment>(segments[0]);

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
      <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Assembly Constituencies (AC) Retrospective Analysis
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                7 SEGMENTS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cross-level electoral analysis: Parliamentary 2024 performance vs 2023 Telangana State Assembly Election outcomes
            </p>
          </div>
          
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="px-2.5 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 rounded-lg">
              AIMIM Leads: 6 Segments
            </span>
            <span className="px-2.5 py-1 bg-amber-950/40 text-amber-300 border border-amber-800/40 rounded-lg">
              BJP Leads: 1 Segment (Goshamahal)
            </span>
          </div>
        </div>
      </div>

      {/* Assembly Lead Comparison Chart */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Comparative Polling: AIMIM vs BJP Votes Polled by Assembly Segment (2024)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">High vote volume disparity drives parliamentary margin</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#F8FAFC' }}
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
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
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
                    ? 'bg-slate-800/80 border-blue-500 shadow-md ring-1 ring-blue-500/50' 
                    : 'bg-[#0F172A] border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono text-xs">#{seg.ac_no}</span>
                    <span className="font-semibold text-sm text-white">{seg.ac_name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    isAIMIM 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {seg.leading_party_2024} Lead
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-400">
                  <span>Turnout: {seg.turnout_2024}%</span>
                  <span className="text-slate-200">+{seg.lead_margin_2024.toLocaleString()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Dossier for Selected Segment */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedSegment.ac_name} Assembly Segment
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300">
                    AC #{selectedSegment.ac_no}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Electoral Profile & Strategic Assessment
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">2024 LOK SABHA LEAD</span>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                  +{selectedSegment.lead_margin_2024.toLocaleString()}
                </div>
                <span className="text-[11px] font-mono text-slate-400">{selectedSegment.leading_party_2024}</span>
              </div>
            </div>

            {/* Quick Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400">Total Electors</span>
                <div className="text-base font-bold font-mono text-white mt-1">
                  {selectedSegment.electors.toLocaleString()}
                </div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400">2024 Polling Turnout</span>
                <div className="text-base font-bold font-mono text-purple-400 mt-1">
                  {selectedSegment.turnout_2024}%
                </div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">2023 Assembly Winner</span>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {selectedSegment.winner_assembly_2023}
                </div>
                <span className="text-[10px] font-mono text-emerald-400">
                  {selectedSegment.party_assembly_2023} (+{selectedSegment.assembly_margin_2023.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Qualitative Strategic Insights Box */}
            <div className="space-y-4">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Demographic Profile</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedSegment.dominant_community}
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Strategic Intelligence Status</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedSegment.strategic_status}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Historical ECI Form 20 Audited</span>
            <span>Assembly Election: Nov 2023 | Lok Sabha: May 2024</span>
          </div>
        </div>

      </div>

    </div>
  );
};
