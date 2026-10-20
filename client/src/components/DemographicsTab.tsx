import React from 'react';
import { DemographicProfile } from '../types';
import { 
  Users, 
  BookOpen, 
  Building, 
  HeartHandshake, 
  PieChart as PieIcon,
  ShieldCheck,
  TrendingUp,
  MapPin
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
}

export const DemographicsTab: React.FC<DemographicsTabProps> = ({ demographics }) => {
  return (
    <div className="space-y-6">
      
      {/* Header Profile Card */}
      <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Constituency Demographic & Socio-Economic Profile
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                CENSUS OF INDIA OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              District Census Handbook & Parliamentary Delimitation Abstract: {demographics.constituency} ({demographics.district} District)
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>100% Urban Agglomeration</span>
          </div>
        </div>
      </div>

      {/* Primary Demographic Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Total Population</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {demographics.total_population.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
            <span>Male: 51.2%</span>
            <span>Female: 48.8%</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Literacy Rate</span>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-2">
            {demographics.literacy_rate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
            <span>Male: {demographics.male_literacy}%</span>
            <span>Female: {demographics.female_literacy}%</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Sex Ratio</span>
            <HeartHandshake className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-mono text-purple-400 mt-2">
            {demographics.sex_ratio}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Females per 1,000 Males
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Density (per km²)</span>
            <Building className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-2">
            {demographics.population_density_per_sq_km.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Ultra-dense urban core
          </div>
        </div>
      </div>

      {/* Community & Religious Demography Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Religious Composition Donut */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                <PieIcon className="h-4 w-4 text-emerald-400" />
                <span>Religious Demography Composition</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Key determinant of constituency electoral voting patterns</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Census 2011</span>
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
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800">
            {demographics.religious_composition.map((r) => (
              <div key={r.religion} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }}></span>
                  <span className="text-slate-300">{r.religion}</span>
                </div>
                <div className="font-mono text-slate-400">
                  <span className="font-semibold text-white">{r.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Category Composition */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span>Social Group & Category Distribution</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">General, Minority, SC/ST, and Backward Classes</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Affirmative Metrics</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={demographics.social_category_composition} 
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} unit="%" />
                <YAxis dataKey="category" type="category" stroke="#64748B" fontSize={11} width={120} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090D16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
                <Bar dataKey="percent" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Dominant Electorate: General / Religious Minorities (86.1%)</span>
            <span className="font-mono text-emerald-400">SC/ST Reserved ACs: 0</span>
          </div>
        </div>

      </div>

      {/* Age Demography & Elector Impact Matrix */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
        <h3 className="text-sm font-semibold text-white tracking-tight mb-4 flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-purple-400" />
          <span>Voter Age Demography & Political Behavior Impact</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demographics.age_demographics.map((age) => (
            <div key={age.group} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300">{age.group}</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {age.percent}%
              </div>
              <div className="mt-2 text-xs text-slate-400 leading-snug">
                {age.elector_impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
