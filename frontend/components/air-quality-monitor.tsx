import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wind, Droplets, AlertCircle, Activity, Gauge } from "lucide-react"
import { getAQILevel, getAQIColor } from "@/lib/air-quality-utils"
import type { DataMerged } from "@/lib/types"

interface AirQualityMonitorProps {
  data?: DataMerged
  loading: boolean
}

export function AirQualityMonitor({ data, loading }: AirQualityMonitorProps) {
  if (loading || !data) {
    return (
      <Card className="border-glow bg-card/60 backdrop-blur-md p-12 scan-line">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-6">
            <Activity className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <p className="text-lg text-muted-foreground font-mono uppercase tracking-widest">SCANNING ATMOSPHERE...</p>
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const pollutants = [
    { name: "PM2.5", value: data.pm25, unit: "µg/m³", icon: Droplets, color: "text-chart-1", max: 100 },
    { name: "PM10", value: data.pm10, unit: "µg/m³", icon: Droplets, color: "text-chart-2", max: 150 },
    { name: "Ozone", value: data.ozone, unit: "ppb", icon: Wind, color: "text-chart-3", max: 100 },
    { name: "NO₂", value: data.no2, unit: "ppb", icon: Wind, color: "text-chart-4", max: 100 },
    { name: "SO₂", value: data.so2, unit: "DU", icon: AlertCircle, color: "text-chart-5", max: 100 },
  ]

  const overallAQI = Math.max(data.pm25 || 0, data.pm10 || 0, data.ozone || 0, data.no2 || 0)

  const aqiLevel = getAQILevel(overallAQI)
  const aqiColor = getAQIColor(aqiLevel)

  return (
    <div className="space-y-6">
      <Card className="border-glow bg-card/60 backdrop-blur-md p-12 scan-line relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse-slow" />

        <div className="text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">CURRENT CONDITIONS</span>
          </div>

          <div className="relative inline-block">
            <Gauge className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
            <div className={`text-9xl font-bold ${aqiColor} glow-blue relative z-10`}>{Math.round(overallAQI)}</div>
            <div
              className="absolute inset-0 blur-3xl opacity-40 animate-pulse-slow"
              style={{
                background:
                  aqiLevel === "Good"
                    ? "rgba(59, 130, 246, 0.5)"
                    : aqiLevel === "Moderate"
                      ? "rgba(139, 92, 246, 0.5)"
                      : "rgba(239, 68, 68, 0.5)",
              }}
            />
          </div>

          <Badge
            variant="outline"
            className={`${aqiColor} border-current text-xl px-6 py-2 font-mono uppercase tracking-wider`}
          >
            {aqiLevel}
          </Badge>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-mono pt-2">
            <span>{data.date || new Date(data.timestamp).toLocaleDateString()}</span>
            <span>•</span>
            <span>
              {data.latitude.toFixed(4)}°N, {Math.abs(data.longitude).toFixed(4)}°W
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {pollutants.map((pollutant) => {
          const Icon = pollutant.icon
          const level = getAQILevel(pollutant.value || 0)
          const color = getAQIColor(level)
          const percentage = Math.min(((pollutant.value || 0) / pollutant.max) * 100, 100)

          return (
            <Card
              key={pollutant.name}
              className="border-glow bg-card/60 backdrop-blur-md p-6 hover:scale-105 hover:border-primary/60 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${pollutant.color} group-hover:scale-110 transition-transform`} />
                  <Badge variant="outline" className="text-xs font-mono border-border/50">
                    {pollutant.unit}
                  </Badge>
                </div>
                <div>
                  <div className={`text-4xl font-bold ${color}`}>{pollutant.value?.toFixed(1) || "N/A"}</div>
                  <div className="text-sm text-muted-foreground font-mono mt-2 uppercase tracking-wide">
                    {pollutant.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className={`h-full ${color.replace("text", "bg")} transition-all duration-500 shadow-lg`}
                      style={{
                        width: `${percentage}%`,
                        boxShadow: `0 0 10px ${
                          color.includes("chart-1")
                            ? "rgba(59, 130, 246, 0.5)"
                            : color.includes("chart-3")
                              ? "rgba(139, 92, 246, 0.5)"
                              : "rgba(239, 68, 68, 0.5)"
                        }`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono text-right">
                    {percentage.toFixed(0)}% of max
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
