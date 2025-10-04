"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { AirQualityMonitor } from "@/components/air-quality-monitor"
import { ForecastPanel } from "@/components/forecast-panel"
import { UserProfileSelector } from "@/components/user-profile-selector"
import { AlertsPanel } from "@/components/alerts-panel"
import { PollutantComparisonChart } from "@/components/pollutant-comparison-chart"
import { HistoricalTrendsChart } from "@/components/historical-trends-chart"
import { DataSourceStats } from "@/components/data-source-stats"
import { AirQualityHeatmap } from "@/components/air-quality-heatmap"
import { SpaceBackground } from "@/components/space-background"
import { ScrollNavbar } from "@/components/scroll-navbar"
import { GlobeViewer } from "@/components/globe-viewer"
import type { DataMerged } from "@/lib/types"
import { generateMockData } from "@/lib/api-data"
import { Satellite, Radio } from "lucide-react"

export default function Home() {
  const [profile, setProfile] = useState<"asthma" | "industrial" | "farmer" | "researcher">("asthma")
  const [data, setData] = useState<DataMerged[]>([])
  const [currentData, setCurrentData] = useState<DataMerged | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const mockData = generateMockData(7)
      setData(mockData)
      setCurrentData(mockData[mockData.length - 1])
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="min-h-screen bg-background grid-pattern relative">
      <SpaceBackground />
      <ScrollNavbar />

      <div className="relative z-10">
        <HeroSection />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 space-y-12">
          <div id="data-sources" className="flex items-center justify-center gap-8 py-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border-glow bg-card/40 backdrop-blur-md">
              <Satellite className="w-5 h-5 text-primary animate-pulse" />
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase">Satellite Data</div>
                <div className="text-sm font-bold text-primary">ACTIVE</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border-glow-cyan bg-card/40 backdrop-blur-md">
              <Radio className="w-5 h-5 text-accent animate-pulse" />
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase">Ground Stations</div>
                <div className="text-sm font-bold text-accent">ACTIVE</div>
              </div>
            </div>
          </div>

          <DataSourceStats />

          <div id="profiles">
            <UserProfileSelector selectedProfile={profile} onProfileChange={setProfile} />
          </div>

          <div id="monitor">
            <AirQualityMonitor data={currentData} loading={loading} />
          </div>

          <div id="comparison">
            <PollutantComparisonChart data={currentData} loading={loading} />
          </div>

          <div id="heatmap">
            <AirQualityHeatmap data={currentData} loading={loading} />
          </div>

          {currentData && (
            <div id="alerts" className="space-y-4">
              <h2 className="text-3xl font-bold glow-blue">Health Alerts & Recommendations</h2>
              <AlertsPanel data={currentData} userProfile={profile} />
            </div>
          )}

          <HistoricalTrendsChart data={data} loading={loading} />

          <div id="forecast">
            <ForecastPanel data={data} userProfile={profile} loading={loading} />
          </div>

          <GlobeViewer data={data} />
        </main>

        <footer className="border-t border-border/50 mt-20 py-12 bg-card/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 text-center space-y-4 relative z-10">
            <p className="text-sm text-foreground/80 font-mono uppercase tracking-widest">
              Powered by Satellite & Ground Station Data Fusion
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              NASA Pandora Network • AirNow Ground Stations • Real-time Monitoring & AI Forecasting
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-primary font-mono">SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
