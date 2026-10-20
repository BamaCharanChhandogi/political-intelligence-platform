import React from 'react';
import { DemographicProfile } from '../types';
import { 
  Users, 
  BookOpen, 
  Building, 
  HeartHandshake, 
  PieChart as PieIcon,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

interface DemographicsTabProps {
  demographics: DemographicProfile;
  isDark: boolean;
}

export const DemographicsTab: React.FC<DemographicsTabProps> = ({ demographics, isDark }) => {
  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';
  const subCardBg = isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200';

  return (
    <div className="space-y-6">
      
      {/* Header Profile Card */}
      <div className={`border p-5 rounded-xl transition-colors ${cardBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className={`text-lg font-bold font-sans tracking-tight ${textPrimary}`}>
                Constituency Demographic & Socio-Economic Profile
              </h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${
                isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                CENSUS OF INDIA OFFICIAL
              </span>
            </div>
            <p className={`text-xs font-sans mt-1 ${textSecondary}`}>
              District Census Handbook & Parliamentary Delimitation Abstract: {demographics.constituency} ({demographics.district} District)
            </p>
          </div>

          <div className={`flex items-center space-x-2 text-xs font-sans ${textSecondary}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>100% Urban Agglomeration</span>
          </div>
        </div>
      </div>

      {/* Primary Demographic Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-semibold uppercase`}>
            <span>Total Population</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className={`text-xl font-bold font-mono mt-2 ${textPrimary}`}>
            {demographics.total_population.toLocaleString()}
          </div>
          <div className={`text-[11px] font-sans ${textSecondary} mt-1 flex justify-between`}>
            <span>Male: 51.2%</span>
            <span>Female: 48.8%</span>
          </div>
        </div>

        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-semibold uppercase`}>
            <span>Literacy Rate</span>
            <BookOpen className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-500 mt-2">
            {demographics.literacy_rate}%
          </div>
          <div className={`text-[11px] font-sans ${textSecondary} mt-1 flex justify-between`}>
            <span>Male: {demographics.male_literacy}%</span>
            <span>Female: {demographics.female_literacy}%</span>
          </div>
        </div>

        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-semibold uppercase`}>
            <span>Sex Ratio</span>
            <HeartHandshake className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold font-mono text-purple-500 mt-2">
            {demographics.sex_ratio}
          </div>
          <div className={`text-[11px] font-sans ${textSecondary} mt-1`}>
            Females per 1,000 Males
          </div>
        </div>

        <div className={`border rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-semibold uppercase`}>
            <span>Density (per km²)</span>
            <Building className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-500 mt-2">
            {demographics.population_density_per_sq_km.toLocaleString()}
          </div>
          <div className={`text-[11px] font-sans ${textSecondary} mt-1`}>
            Ultra-dense urban core
          </div>
        </div>
      </div>

      {/* Community & Religious Demography Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Religious Composition Donut */}
        <div className={`border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <PieIcon className="h-4 w-4 text-emerald-500" />
                <span>Religious Demography Composition</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Key determinant of constituency electoral voting patterns</p>
            </div>
            <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
              Census 2011
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographics.religious_composition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="percent"
                  nameKey="religion"
                >
                  {demographics.religious_composition.map((entry, index) => (
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

          <div className={`grid grid-cols-2 gap-3 mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            {demographics.religious_composition.map((r) => (
              <div key={r.religion} className="flex items-center justify-between text-xs font-sans">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }}></span>
                  <span className={textSecondary}>{r.religion}</span>
                </div>
                <div className="font-mono">
                  <span className={`font-semibold ${textPrimary}`}>{r.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Category Composition */}
        <div className={`border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-semibold font-sans tracking-tight flex items-center space-x-2 ${textPrimary}`}>
                <Users className="h-4 w-4 text-blue-500" />
                <span>Social Group & Category Distribution</span>
              </h3>
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>General, Minority, SC/ST, and Backward Classes</p>
            </div>
            <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
              Affirmative Metrics
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={demographics.social_category_composition} 
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} unit="%" fontFamily="monospace" />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={11} width={120} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
                <Bar dataKey="percent" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-sans ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
            <span>Dominant Electorate: General / Religious Minorities (86.1%)</span>
            <span className="font-mono text-emerald-500 font-medium">SC/ST Reserved ACs: 0</span>
          </div>
        </div>

      </div>

      {/* Age Demography & Elector Impact Matrix */}
      <div className={`border rounded-xl p-5 shadow-sm transition-colors ${cardBg}`}>
        <h3 className={`text-sm font-semibold font-sans tracking-tight mb-4 flex items-center space-x-2 ${textPrimary}`}>
          <TrendingUp className="h-4 w-4 text-purple-500" />
          <span>Voter Age Demography & Political Behavior Impact</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demographics.age_demographics.map((age) => (
            <div key={age.group} className={`p-4 rounded-xl border transition-colors ${subCardBg}`}>
              <div className={`text-xs font-semibold font-sans ${textPrimary}`}>{age.group}</div>
              <div className={`text-2xl font-bold font-mono mt-1 ${textPrimary}`}>
                {age.percent}%
              </div>
              <div className={`mt-2 text-xs font-sans leading-snug ${textSecondary}`}>
                {age.elector_impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
