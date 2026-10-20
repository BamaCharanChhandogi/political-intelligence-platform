import React from 'react';
import { IntelligenceInsight, SwingData } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Flame, 
  Compass, 
  BarChart2, 
  ShieldAlert, 
  CheckCircle2 
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

interface InsightsTabProps {
  insights: IntelligenceInsight[];
  swings: SwingData[];
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ insights, swings }) => {
  const swingChartData = [
    { period: '2019-2024', AIMIM: 2.34, BJP: 3.18, INC: 0.14, BRS: -5.47 },
    { period: '2014-2019', AIMIM: 6.04, BJP: -5.26, INC: 0.59, BRS: 3.30 },
    { period: '2009-2014', AIMIM: 13.73, BJP: 13.42, INC: -6.79, TDP: -24.69 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Strategic Intelligence Header */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-5 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Political Intelligence & Voter Behavior Analysis
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Synthesis of electoral polarization, third-pole attrition, swing elasticity, and structural advantages
            </p>
          </div>
        </div>
      </div>

      {/* Swing Dynamics Chart */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Inter-Election Vote Share Swing Dynamics (%)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Net percentage point shift between successive parliamentary cycles</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Swing Model</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={swingChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="period" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
              <Bar dataKey="AIMIM" name="AIMIM Swing" fill="#20783B" />
              <Bar dataKey="BJP" name="BJP Swing" fill="#FF9933" />
              <Bar dataKey="INC" name="INC Swing" fill="#19AAED" />
              <Bar dataKey="BRS" name="BRS Swing" fill="#FE0175" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#20783B]"></span>
            <span className="text-slate-300">AIMIM</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-slate-300">BJP</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#19AAED]"></span>
            <span className="text-slate-300">INC</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FE0175]"></span>
            <span className="text-slate-300">BRS</span>
          </div>
        </div>
      </div>

      {/* Strategic Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, idx) => {
          let badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
          if (insight.type === 'Geography') badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
          if (insight.type === 'Behavior') badgeColor = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
          if (insight.type === 'Electorate') badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

          return (
            <div key={idx} className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-lg hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className="text-slate-500 font-mono text-xs">#0{idx + 1}</span>
              </div>
              <h4 className="text-base font-bold text-white tracking-tight mt-1 mb-2">
                {insight.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {insight.observation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Corporate Chanakya Intelligence Summary Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-xs text-slate-400 space-y-2">
        <div className="flex items-center space-x-2 text-white font-semibold text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Executive Takeaway & Campaign Recommendations</span>
        </div>
        <p className="leading-relaxed">
          The Hyderabad Parliamentary Constituency demonstrates deep bipolar entrenchment with a +31.39% margin barrier. For any opposition challenger to become viable, the strategy necessitates: (1) Aggressive voter registration & turnout mobilization in lagging Old City booths above 65%, (2) Consolidating Hindu and non-AIMIM minority votes across all 7 segments rather than concentrating solely on Goshamahal, and (3) Mitigating split voting between BJP and Congress.
        </p>
      </div>

    </div>
  );
};
