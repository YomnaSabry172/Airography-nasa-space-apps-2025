"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"
import { TrendingUp, Calendar, Zap } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DataMerged } from "@/lib/types"

interface ForecastPanelProps {
  data: DataMerged[]
  userProfile: "asthma" | "industrial" | "farmer" | "researcher"
  loading: boolean
}

export function ForecastPanel({ data, userProfile, loading }: ForecastPanelProps) {
  if (loading || !data.length) {
    return null
  }

  const chartData = data.map((d) => ({
    date: d.date
      ? new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : new Date(d.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    PM25: Math.round(d.pm25 * 10) / 10,
    PM10: Math.round(d.pm10 * 10) / 10,
    Ozone: Math.round(d.ozone * 10) / 10,
    NO2: Math.round(d.no2 * 10) / 10,
    SO2: Math.round(d.so2 * 10) / 10,
  }))

  const getProfileFocus = () => {
    switch (userProfile) {
      case "asthma":
        return {
          pollutants: ["PM25", "Ozone"],
          description: "Monitoring respiratory irritants",
          color: "primary",
        }
      case "industrial":
        return {
          pollutants: ["NO2", "SO2", "PM10"],
          description: "Tracking industrial emissions",
          color: "secondary",
        }
      case "farmer":
        return {
          pollutants: ["Ozone", "SO2"],
          description: "Monitoring crop-damaging pollutants",
          color: "accent",
        }
      case "researcher":
        return {
          pollutants: ["PM25", "PM10", "Ozone", "NO2", "SO2"],
          description: "Comprehensive multi-pollutant analysis",
          color: "primary",
        }
    }
  }

  const focus = getProfileFocus()

  return (
    <div className="space-y-6">
      <Card className="border-glow bg-card/60 backdrop-blur-md p-8 space-y-6 data-stream">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold glow-blue">7-Day Forecast</h2>
            </div>
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">{focus.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono px-4 py-1.5">
              <Calendar className="w-3 h-3 mr-2" />
              PREDICTIVE MODEL
            </Badge>
            <Badge variant="outline" className="border-accent/50 text-accent font-mono px-4 py-1.5">
              <Zap className="w-3 h-3 mr-2" />
              AI POWERED
            </Badge>
          </div>
        </div>

        <ChartContainer
          config={{
            PM25: {
              label: "PM2.5 (µg/m³)",
              color: "hsl(var(--chart-1))",
            },
            PM10: {
              label: "PM10 (µg/m³)",
              color: "hsl(var(--chart-2))",
            },
            Ozone: {
              label: "Ozone (ppb)",
              color: "hsl(var(--chart-3))",
            },
            NO2: {
              label: "NO₂ (ppb)",
              color: "hsl(var(--chart-4))",
            },
            SO2: {
              label: "SO₂ (DU)",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[450px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOzone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNO2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSO2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPM10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px", fontFamily: "var(--font-mono)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px", fontFamily: "var(--font-mono)" }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Concentration",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: "12px", fill: "hsl(var(--muted-foreground))" },
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", fontFamily: "var(--font-mono)", paddingTop: "20px" }}
                iconType="circle"
              />
              {focus.pollutants.includes("PM25") && (
                <Area
                  type="monotone"
                  dataKey="PM25"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  fill="url(#colorPM25)"
                  dot={{ fill: "hsl(var(--chart-1))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              )}
              {focus.pollutants.includes("Ozone") && (
                <Area
                  type="monotone"
                  dataKey="Ozone"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={3}
                  fill="url(#colorOzone)"
                  dot={{ fill: "hsl(var(--chart-3))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              )}
              {focus.pollutants.includes("NO2") && (
                <Area
                  type="monotone"
                  dataKey="NO2"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={3}
                  fill="url(#colorNO2)"
                  dot={{ fill: "hsl(var(--chart-4))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              )}
              {focus.pollutants.includes("SO2") && (
                <Area
                  type="monotone"
                  dataKey="SO2"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={3}
                  fill="url(#colorSO2)"
                  dot={{ fill: "hsl(var(--chart-5))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              )}
              {focus.pollutants.includes("PM10") && (
                <Area
                  type="monotone"
                  dataKey="PM10"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  fill="url(#colorPM10)"
                  dot={{ fill: "hsl(var(--chart-2))", r: 4, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {focus.pollutants.map((pollutant) => {
          const latestValue = chartData[chartData.length - 1][pollutant as keyof (typeof chartData)[0]]
          const previousValue = chartData[chartData.length - 2]?.[pollutant as keyof (typeof chartData)[0]]
          const change = previousValue
            ? ((Number(latestValue) - Number(previousValue)) / Number(previousValue)) * 100
            : 0

          return (
            <Card
              key={pollutant}
              className="border-glow bg-card/50 backdrop-blur-sm p-6 hover:scale-105 transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground uppercase">{pollutant}</span>
                  <Badge variant={change > 0 ? "destructive" : "default"} className="text-xs font-mono">
                    {change > 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-primary">{latestValue}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {change > 0 ? "Increasing trend" : "Decreasing trend"}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
