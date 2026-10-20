import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  BarChart3, 
  Calendar, 
  Sun,
  Moon,
  Printer,
  ChevronDown
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
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Executive Intelligence', icon: BarChart3 },
    { id: 'parliamentary', label: 'Lok Sabha Results', icon: Calendar },
    { id: 'assembly', label: 'Assembly Segments', icon: Building2 },
    { id: 'demographics', label: 'Demographics & Strategy', icon: MapPin },
  ];

  const yearMetadata: Record<number, string> = {
    2024: '18th Lok Sabha',
    2019: '17th Lok Sabha',
    2014: '16th Lok Sabha',
    2009: '15th Lok Sabha',
  };

  return (
    <header className="sticky top-0 z-50 py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* LEFT: Clean Minimalist Title "Hyderabad • 18th Lok Sabha" */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className={`text-base sm:text-lg font-bold font-sans tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Hyderabad
              </span>
              <span className={`text-[10px] sm:text-[11px] font-sans font-bold px-2 py-0.5 rounded-full border ${
                isDark 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                  : 'bg-blue-50 text-blue-800 border-blue-300'
              }`}>
                {yearMetadata[selectedYear]}
              </span>
            </div>
            <span className={`text-[10px] sm:text-[11px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Parliamentary Constituency
            </span>
          </div>
        </div>

        {/* CENTER (Desktop): Ultra-Glassy Frosted Capsule Menu */}
        <div className={`hidden md:flex items-center space-x-1.5 p-1.5 rounded-full border shadow-lg backdrop-blur-2xl transition-colors ${
          isDark 
            ? 'bg-slate-900/40 border-white/10 shadow-black/30 ring-1 ring-white/5' 
            : 'bg-white/50 border-slate-200/80 shadow-blue-500/5 ring-1 ring-black/5'
        }`}>
          
          {/* Year Cycle Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-colors border border-transparent cursor-pointer"
            >
              <span>{selectedYear} Election</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {yearDropdownOpen && (
              <div className={`absolute top-full mt-2 left-0 w-36 rounded-2xl border py-1.5 shadow-2xl z-50 backdrop-blur-2xl ${
                isDark 
                  ? 'bg-slate-900/95 border-slate-700/60 text-slate-200' 
                  : 'bg-white/95 border-slate-200 text-slate-800'
              }`}>
                {[2024, 2019, 2014, 2009].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setYearDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-sans transition-colors cursor-pointer ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white font-semibold'
                        : isDark
                          ? 'text-slate-300 hover:bg-slate-800/80'
                          : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {year} Election
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section Tabs */}
          <div className="flex items-center space-x-1 pl-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium border transition-colors cursor-pointer select-none ${
                    isActive
                      ? isDark 
                        ? 'bg-white/10 text-white border-white/15 shadow-inner font-semibold' 
                        : 'bg-white text-blue-700 border-slate-300 shadow-xs font-semibold'
                      : isDark 
                        ? 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-black/5 border-transparent'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? (isDark ? 'text-blue-400' : 'text-blue-600') : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT: Frosted Glass Action Buttons & Mobile Year Pill */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          
          {/* Mobile Year Selector Dropdown */}
          <div className="relative md:hidden">
            <button
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-xs cursor-pointer"
            >
              <span>{selectedYear}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {yearDropdownOpen && (
              <div className={`absolute top-full mt-2 right-0 w-36 rounded-2xl border py-1.5 shadow-2xl z-50 backdrop-blur-2xl ${
                isDark 
                  ? 'bg-slate-900/95 border-slate-700/60 text-slate-200' 
                  : 'bg-white/95 border-slate-200 text-slate-800'
              }`}>
                {[2024, 2019, 2014, 2009].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setYearDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-sans transition-colors cursor-pointer ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white font-semibold'
                        : isDark
                          ? 'text-slate-300 hover:bg-slate-800/80'
                          : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {year} Election
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Print / Export Glass Button */}
          <button
            onClick={() => window.print()}
            title="Export Dossier (Print / PDF)"
            className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs backdrop-blur-2xl shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer ${
              isDark 
                ? 'bg-slate-900/40 border-white/10 text-slate-300 hover:bg-slate-800/80 hover:text-white ring-1 ring-white/5' 
                : 'bg-white/50 border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 ring-1 ring-black/5'
            }`}
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-sans font-medium">Export</span>
          </button>

          {/* Theme Toggle Glass Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Switch to Institutional Light Mode" : "Switch to War Room Dark Mode"}
            className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs backdrop-blur-2xl shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer ${
              isDark 
                ? 'bg-slate-900/40 border-white/10 text-amber-400 hover:bg-slate-800/80 ring-1 ring-white/5' 
                : 'bg-white/50 border-slate-200/80 text-indigo-600 hover:bg-white ring-1 ring-black/5'
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
                <span className="hidden sm:inline font-sans text-slate-700 font-medium">Dark</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Mobile Glass Capsule Sub-Navigation Bar */}
      <div className="md:hidden mt-2 max-w-full overflow-x-auto py-1">
        <div className={`inline-flex items-center space-x-1 p-1 rounded-full border shadow-sm backdrop-blur-xl ${
          isDark 
            ? 'bg-slate-900/60 border-white/10 ring-1 ring-white/5' 
            : 'bg-white/70 border-slate-200/90 shadow-xs ring-1 ring-black/5'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-colors border cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : isDark 
                      ? 'border-transparent text-slate-400 hover:text-white' 
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
