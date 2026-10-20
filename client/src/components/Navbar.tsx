import React from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  BarChart3, 
  Calendar, 
  Sparkles,
  Sun,
  Moon,
  Printer
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear,
  isDark,
  setIsDark
}) => {
  const tabs = [
    { id: 'overview', label: 'Executive Intelligence', icon: BarChart3 },
    { id: 'parliamentary', label: 'Lok Sabha Results', icon: Calendar },
    { id: 'assembly', label: 'Assembly Segments', icon: Building2 },
    { id: 'demographics', label: 'Demographic Profile', icon: MapPin },
    { id: 'insights', label: 'Strategic Insights', icon: Sparkles },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
      isDark 
        ? 'border-slate-800/80 bg-[#090D16]/90' 
        : 'border-slate-200 bg-white/95 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Corporate Branding */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-mono font-bold text-lg text-white">CQ</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-display font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  POLINTEL
                </span>
                <span className={`text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded border tracking-wide ${
                  isDark 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  STRATEGIC
                </span>
              </div>
              <p className={`text-[11px] font-sans tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                HYDERABAD PARLIAMENTARY CONSTITUENCY
              </p>
            </div>
          </div>

          {/* Quick Year Pill Selector */}
          <div className={`hidden md:flex items-center space-x-1 p-1 rounded-lg border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {[2024, 2019, 2014, 2009].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 text-xs rounded-md transition-all font-mono ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Controls: Mode Toggle, Print, ECI Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* ECI Certified Indicator */}
            <div className={`hidden lg:flex items-center space-x-2 text-xs font-sans px-2.5 py-1 rounded-full border ${
              isDark 
                ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' 
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium tracking-wide">ECI DATA AUDITED</span>
            </div>

            {/* Print / Report Mode Button */}
            <button
              onClick={() => window.print()}
              title="Print Briefing Dossier"
              className={`p-2 rounded-lg border text-xs transition-all flex items-center space-x-1.5 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-sans font-medium">Export</span>
            </button>

            {/* War Room (Dark) vs Institutional (Light) Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Switch to Institutional Light Mode" : "Switch to War Room Dark Mode"}
              className={`p-2 rounded-lg border text-xs transition-all flex items-center space-x-1.5 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline font-sans text-slate-300 font-medium">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline font-sans text-slate-700 font-medium">War Room</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className={`flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t no-scrollbar ${
          isDark ? 'border-slate-800/40' : 'border-slate-200'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-sans font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? isDark 
                      ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? (isDark ? 'text-blue-400' : 'text-blue-600') : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
