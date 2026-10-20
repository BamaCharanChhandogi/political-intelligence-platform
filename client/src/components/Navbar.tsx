import React from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  BarChart3, 
  Calendar, 
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear,
}) => {
  const tabs = [
    { id: 'overview', label: 'Executive Intelligence', icon: BarChart3 },
    { id: 'parliamentary', label: 'Lok Sabha Results', icon: Calendar },
    { id: 'assembly', label: 'Assembly Segments', icon: Building2 },
    { id: 'demographics', label: 'Demographic Profile', icon: MapPin },
    { id: 'insights', label: 'Strategic Insights', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Corporate Branding */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-mono font-bold text-lg text-white">CQ</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-base tracking-tight text-white">POLINTEL</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">ENTERPRISE</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider">HYDERABAD PC (TELANGANA)</p>
            </div>
          </div>

          {/* Quick Year Pill Selector */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            {[2024, 2019, 2014, 2009].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Global Search / Status Pill */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>ECI OFFICIAL CERTIFIED DATA</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates, ACs..."
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-36 sm:w-48 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/40 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
