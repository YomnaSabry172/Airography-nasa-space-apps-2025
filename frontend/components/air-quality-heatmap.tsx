"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, MapPin } from "lucide-react"
import type { DataMerged } from "@/lib/types"

interface AirQualityHeatmapProps {
  data: DataMerged | undefined
  loading: boolean
}

export function AirQualityHeatmap({ data, loading }: AirQualityHeatmapProps) {
  if (loading || !data) {
    return null
  }

  // Generate mock regional data for visualization
  const regions = [
    { name: "North Zone", pm25: data.pm25 * 0.8, ozone: data.ozone * 1.1, status: "Moderate" },
    { name: "South Zone", pm25: data.pm25 * 1.2, ozone: data.ozone * 0.9, status: "Unhealthy" },
    { name: "East Zone", pm25: data.pm25 * 0.9, ozone: data.ozone * 1.0, status: "Good" },
    { name: "West Zone", pm25: data.pm25 * 1.1, ozone: data.ozone * 0.8, status: "Moderate" },
    { name: "Central Zone", pm25: data.pm25, ozone: data.ozone, status: "Moderate" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-chart-1/20 border-chart-1/50 text-chart-1"
      case "Moderate":
        return "bg-chart-4/20 border-chart-4/50 text-chart-4"
      case "Unhealthy":
        return "bg-destructive/20 border-destructive/50 text-destructive"
      default:
        return "bg-muted/20 border-muted/50 text-muted-foreground"
    }
  }

  return (
    <Card className="border-glow bg-card/60 backdrop-blur-md p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold glow-blue">Regional Air Quality Map</h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">
            Multi-zone monitoring coverage
          </p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary font-mono px-4 py-1.5">
          <MapPin className="w-3 h-3 mr-2" />5 ZONES ACTIVE
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region, index) => (
          <Card
            key={index}
            className={`p-6 border-2 ${getStatusColor(region.status)} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{region.name}</h3>
                <Badge variant="outline" className={`font-mono text-xs ${getStatusColor(region.status)}`}>
                  {region.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono">PM2.5</div>
                  <div className="text-2xl font-bold text-primary">{region.pm25.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">µg/m³</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-mono">Ozone</div>
                  <div className="text-2xl font-bold text-accent">{region.ozone.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">ppb</div>
                </div>
              </div>
              <div className="pt-2 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">Live monitoring</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4 border-t border-border/30">
        <div className="flex items-center justify-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-4" />
            <span className="text-muted-foreground">Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Unhealthy (101+)</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
