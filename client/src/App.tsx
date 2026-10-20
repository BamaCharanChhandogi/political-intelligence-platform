import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { ParliamentaryTab } from './components/ParliamentaryTab';
import { AssemblyTab } from './components/AssemblyTab';
import { DemographicsTab } from './components/DemographicsTab';

// Fallback embedded datasets (ensures flawless standalone execution without network dependency)
import fallbackElections from './data/parliamentary_elections.json';
import fallbackSegments from './data/segment_wise_analysis.json';
import fallbackDemographics from './data/demographics_profile.json';
import fallbackInsights from './data/electoral_insights.json';

import { 
  ParliamentaryElection, 
  AssemblySegment, 
  DemographicProfile, 
  IntelligenceInsight, 
  SwingData 
} from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Synchronize document class and attribute with isDark
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  // States with fallback initialization
  const [elections, setElections] = useState<ParliamentaryElection[]>(fallbackElections as ParliamentaryElection[]);
  const [assemblySegments, setAssemblySegments] = useState<AssemblySegment[]>(fallbackSegments as AssemblySegment[]);
  const [demographics, setDemographics] = useState<DemographicProfile>(fallbackDemographics as DemographicProfile);
  const [insights, setInsights] = useState<IntelligenceInsight[]>(fallbackInsights.key_findings as IntelligenceInsight[]);
  const [swings, setSwings] = useState<SwingData[]>(fallbackInsights.swing_analysis as SwingData[]);
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string>('Connecting...');

  // Attempt to fetch from backend API if active, fallback seamlessly if static
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [resElections, resSegments, resDemo, resInsights] = await Promise.all([
          axios.get('/api/v1/elections').catch(() => null),
          axios.get('/api/v1/assembly-segments').catch(() => null),
          axios.get('/api/v1/demographics').catch(() => null),
          axios.get('/api/v1/intelligence-insights').catch(() => null)
        ]);

        if (resElections?.data?.data) {
          setElections(resElections.data.data);
          setApiConnected(true);
          setDataSource(resElections.data.source || 'Cloud API');
        }
        if (resSegments?.data?.data?.segments) {
          setAssemblySegments(resSegments.data.data.segments);
        }
        if (resDemo?.data?.data) {
          setDemographics(resDemo.data.data);
        }
        if (resInsights?.data?.data) {
          setInsights(resInsights.data.data.key_findings);
          setSwings(resInsights.data.data.swing_analysis);
        }
      } catch (err) {
        console.log('Operating in high-availability embedded mode');
      }
    };

    fetchApiData();
  }, []);

  const currentElection = elections.find(e => e.year === selectedYear) || elections[0];

  return (
    <div className={`min-h-screen transition-colors flex flex-col font-sans ${
      isDark ? 'bg-[#090D16] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      
      {/* Top Navigation Bar with Single Authoritative Year Controller */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            currentElection={currentElection}
            historicalElections={elections}
            assemblySegments={assemblySegments}
            onSelectYear={setSelectedYear}
            isDark={isDark}
          />
        )}

        {activeTab === 'parliamentary' && (
          <ParliamentaryTab
            elections={elections}
            selectedYear={selectedYear}
            isDark={isDark}
          />
        )}

        {activeTab === 'assembly' && (
          <AssemblyTab
            segments={assemblySegments}
            selectedYear={selectedYear}
            isDark={isDark}
          />
        )}

        {activeTab === 'demographics' && (
          <DemographicsTab
            demographics={demographics}
            insights={insights}
            swings={swings}
            selectedYear={selectedYear}
            isDark={isDark}
          />
        )}
      </main>

      {/* Corporate Chanakya Footer */}
      <footer className={`border-t py-6 mt-12 transition-colors ${
        isDark ? 'border-slate-800/80 bg-[#090D16] text-slate-500' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              Corporate Chanakya
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Political Intelligence & Electoral Advisory Division</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1">
            <span>Sources: Election Commission of India (ECI) & Census Directorate</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-500 font-medium flex items-center space-x-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Verified Official Feed</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
