import React from 'react';
import { IntelligenceInsight, SwingData } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
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
  isDark: boolean;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ insights, isDark }) => {
  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';

  const swingChartData = [
    { period: '2019-2024', AIMIM: 2.34, BJP: 3.18, INC: 0.14, BRS: -5.47 },
    { period: '2014-2019', AIMIM: 6.04, BJP: -5.26, INC: 0.59, BRS: 3.30 },
    { period: '2009-2014', AIMIM: 13.73, BJP: 13.42, INC: -6.79, TDP: -24.69 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Strategic Intelligence Header */}
      <div className={`border p-5 rounded-xl transition-colors ${
        isDark 
          ? 'bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border-blue-500/30' 
          : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border-blue-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200'
          }`}>
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className={`text-lg font-bold font-sans tracking-tight ${textPrimary}`}>
              Political Intelligence & Voter Behavior Analysis
            </h2>
            <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>
              Synthesis of electoral polarization, third-pole attrition, swing elasticity, and structural advantages
            </p>
          </div>
        </div>
      </div>

      {/* Swing Dynamics Chart */}
      <div className={`border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span>Inter-Election Vote Share Swing Dynamics (%)</span>
            </h3>
            <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Net percentage point shift between successive parliamentary cycles</p>
          </div>
          <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
            Swing Model
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={swingChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} fontFamily="monospace" />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" fontFamily="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              />
              <Bar dataKey="AIMIM" name="AIMIM Swing" fill="#20783B" />
              <Bar dataKey="BJP" name="BJP Swing" fill="#FF9933" />
              <Bar dataKey="INC" name="INC Swing" fill="#19AAED" />
              <Bar dataKey="BRS" name="BRS Swing" fill="#FE0175" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`flex items-center justify-center space-x-6 mt-4 pt-3 border-t text-xs font-sans ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
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
            <span className={textSecondary}>BRS</span>
          </div>
        </div>
      </div>

      {/* Strategic Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, idx) => {
          let badgeColor = isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200';
          if (insight.type === 'Geography') badgeColor = isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200';
          if (insight.type === 'Behavior') badgeColor = isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200';
          if (insight.type === 'Electorate') badgeColor = isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div key={idx} className={`border rounded-xl p-5 shadow-xs transition-all hover:border-blue-500/40 ${cardBg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${badgeColor}`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className={`font-mono text-xs ${textSecondary}`}>#0{idx + 1}</span>
              </div>
              <h4 className={`text-base font-bold font-sans tracking-tight mt-1 mb-2 ${textPrimary}`}>
                {insight.title}
              </h4>
              <p className={`text-xs leading-relaxed font-sans ${textSecondary}`}>
                {insight.observation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Corporate Chanakya Intelligence Summary Banner */}
      <div className={`border rounded-xl p-5 text-xs space-y-2 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className={`flex items-center space-x-2 font-semibold font-sans text-sm ${textPrimary}`}>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Executive Takeaway & Campaign Recommendations</span>
        </div>
        <p className="leading-relaxed font-sans">
          The Hyderabad Parliamentary Constituency demonstrates deep bipolar entrenchment with a +31.39% margin barrier. For any opposition challenger to become viable, the strategy necessitates: (1) Aggressive voter registration & turnout mobilization in lagging Old City booths above 65%, (2) Consolidating Hindu and non-AIMIM minority votes across all 7 segments rather than concentrating solely on Goshamahal, and (3) Mitigating split voting between BJP and Congress.
        </p>
      </div>

    </div>
  );
};
