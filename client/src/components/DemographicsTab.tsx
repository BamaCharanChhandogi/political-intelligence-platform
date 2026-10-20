import React from 'react';
import { DemographicProfile, IntelligenceInsight, SwingData } from '../types';
import { 
  Users, 
  BookOpen, 
  Building, 
  HeartHandshake, 
  PieChart as PieIcon,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Info
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
  insights: IntelligenceInsight[];
  swings: SwingData[];
  selectedYear: number;
  isDark: boolean;
}

export const DemographicsTab: React.FC<DemographicsTabProps> = ({ 
  demographics, 
  insights, 
  selectedYear,
  isDark 
}) => {
  const cardBg = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-700';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const gridStroke = isDark ? '#1E293B' : '#E2E8F0';
  const tooltipBg = isDark ? '#090D16' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#CBD5E1';
  const subCardBg = isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200';

  // Elector projections mapped per election cycle
  const yearElectorates: Record<number, number> = {
    2024: 2217196,
    2019: 1952516,
    2014: 1823217,
    2009: 1500353
  };

  const activeElectorate = yearElectorates[selectedYear] || 2217196;

  // Year-specific swing focus
  const swingChartData = [
    { period: '2019-2024', AIMIM: 2.34, BJP: 3.18, INC: 0.14, BRS: -5.47 },
    { period: '2014-2019', AIMIM: 6.04, BJP: -5.26, INC: 0.59, BRS: 3.30 },
    { period: '2009-2014', AIMIM: 13.73, BJP: 13.42, INC: -6.79, TDP: -24.69 }
  ];

  const yearTakeaway: Record<number, string> = {
    2024: "2024 Lok Sabha Takeaway: Complete bipolar consolidation between AIMIM (61.28%) and BJP (29.98%). Anti-BJP electors consolidated behind AIMIM, squeezing Congress (5.83%) and BRS (1.73%) out of contention.",
    2019: "2019 Lok Sabha Takeaway: AIMIM demonstrated strong organizational resilience post-demonetization with 58.94% vote share. TRS captured 7.20% as an emerging state power, while BJP retained second position with 26.80%.",
    2014: "2014 Lok Sabha Takeaway: Narendra Modi wave lifted BJP vote share to 32.06% in an undivided Andhra Pradesh setting, but Owaisi expanded vote count to 5.13 lakh to win by over 2.02 lakh votes.",
    2009: "2009 Lok Sabha Takeaway: First election after the 2008 Delimitation. Asaduddin Owaisi won with 39.17% in a high-voltage four-cornered contest against TDP editor Zahid Ali Khan (24.69%) and BJP (18.64%)."
  };

  return (
    <div className="space-y-6">
      
      {/* Decadal Demographics Baseline Banner */}
      <div className={`border p-5 rounded-xl transition-colors ${cardBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className={`text-lg font-bold font-sans tracking-tight ${textPrimary}`}>
                Constituency Demographic Baseline & Strategic Analysis
              </h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold border ${
                isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-800 border-blue-300'
              }`}>
                CENSUS 2011 BASELINE
              </span>
            </div>
            <p className={`text-xs font-sans mt-1 ${textSecondary}`}>
              Official Primary Census Abstract for {demographics.district} District • Projected Registered Electors ({selectedYear}): <span className="font-sans font-bold text-blue-600 dark:text-blue-400 tabular-nums">{activeElectorate.toLocaleString()}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-sans">
            <span className={`px-2.5 py-1 rounded-lg border font-semibold ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}>
              100% Urban Agglomeration
            </span>
          </div>
        </div>
      </div>

      {/* Primary Demographic Metric Cards (ECI-Style Frames) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`border border-l-4 border-l-blue-600 rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-bold uppercase`}>
            <span>Census Population</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className={`text-2xl font-bold font-sans tracking-tight tabular-nums mt-2 ${textPrimary}`}>
            {demographics.total_population.toLocaleString()}
          </div>
          <div className={`text-[11px] font-sans font-medium ${textSecondary} mt-1 flex justify-between`}>
            <span>Male: 51.2%</span>
            <span>Female: 48.8%</span>
          </div>
        </div>

        <div className={`border border-l-4 border-l-emerald-600 rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-bold uppercase`}>
            <span>Literacy Rate</span>
            <BookOpen className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-sans tracking-tight tabular-nums text-emerald-600 dark:text-emerald-400 mt-2">
            {demographics.literacy_rate}%
          </div>
          <div className={`text-[11px] font-sans font-medium ${textSecondary} mt-1 flex justify-between`}>
            <span>Male: {demographics.male_literacy}%</span>
            <span>Female: {demographics.female_literacy}%</span>
          </div>
        </div>

        <div className={`border border-l-4 border-l-purple-600 rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-bold uppercase`}>
            <span>Sex Ratio</span>
            <HeartHandshake className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold font-sans tracking-tight tabular-nums text-purple-600 dark:text-purple-400 mt-2">
            {demographics.sex_ratio}
          </div>
          <div className={`text-[11px] font-sans font-medium ${textSecondary} mt-1`}>
            Females per 1,000 Males
          </div>
        </div>

        <div className={`border border-l-4 border-l-amber-600 rounded-xl p-4 transition-colors ${cardBg}`}>
          <div className={`flex items-center justify-between ${textSecondary} text-xs font-sans font-bold uppercase`}>
            <span>Density (per km²)</span>
            <Building className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-sans tracking-tight tabular-nums text-amber-600 dark:text-amber-400 mt-2">
            {demographics.population_density_per_sq_km.toLocaleString()}
          </div>
          <div className={`text-[11px] font-sans font-medium ${textSecondary} mt-1`}>
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
              <p className={`text-xs font-sans mt-0.5 ${textSecondary}`}>Core driver of voting polarization in Old City</p>
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
                <div className="font-sans tabular-nums text-right">
                  <span className={`font-bold ${textPrimary}`}>{r.percent}%</span>
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
                <XAxis type="number" stroke="#94A3B8" fontSize={11} unit="%" />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={11} width={120} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
                <Bar dataKey="percent" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-sans ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
            <span>Dominant Electorate: General & Minorities (86.1%)</span>
            <span className="font-sans font-bold text-emerald-500">SC/ST Reserved ACs: 0</span>
          </div>
        </div>

      </div>

      {/* Strategic Swing Dynamics & Year-Specific Takeaway */}
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
            Swing Analysis
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={swingChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
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

        <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-3 border-t text-xs font-sans ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
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

      {/* Year-Specific Strategic Assessment Callout */}
      <div className={`border rounded-xl p-5 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-blue-50/60 border-blue-200'
      }`}>
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <h4 className={`text-sm font-bold font-sans ${textPrimary}`}>
              {selectedYear} Strategic Election Context & Elector Dynamics
            </h4>
            <p className={`text-xs font-sans mt-1 leading-relaxed ${textSecondary}`}>
              {yearTakeaway[selectedYear] || yearTakeaway[2024]}
            </p>
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
                <span className={`font-sans font-bold text-xs ${textSecondary}`}>#0{idx + 1}</span>
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

      {/* Campaign Strategy Recommendation */}
      <div className={`border rounded-xl p-5 text-xs space-y-2 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className={`flex items-center space-x-2 font-semibold font-sans text-sm ${textPrimary}`}>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Consulting Takeaway: Opposition Path to Competitiveness</span>
        </div>
        <p className="leading-relaxed font-sans">
          The Hyderabad Parliamentary Constituency demonstrates deep bipolar entrenchment with a +31.39% margin barrier. For any opposition challenger to become viable, the strategy necessitates: (1) Aggressive voter registration & turnout mobilization in lagging Old City booths above 65%, (2) Consolidating Hindu and non-AIMIM minority votes across all 7 segments rather than concentrating solely on Goshamahal, and (3) Mitigating split voting between BJP and Congress.
        </p>
      </div>

    </div>
  );
};
