"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { BarChart3, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { DataMerged } from "@/lib/types"

interface PollutantComparisonChartProps {
  data: DataMerged | undefined
  loading: boolean
}

export function PollutantComparisonChart({ data, loading }: PollutantComparisonChartProps) {
  if (loading || !data) {
    return null
  }

  const chartData = [
    { name: "PM2.5", value: data.pm25, unit: "µg/m³", threshold: 35.4, color: "hsl(var(--chart-1))" },
    { name: "PM10", value: data.pm10, unit: "µg/m³", threshold: 154, color: "hsl(var(--chart-2))" },
    { name: "Ozone", value: data.ozone, unit: "ppb", threshold: 70, color: "hsl(var(--chart-3))" },
    { name: "NO₂", value: data.no2, unit: "ppb", threshold: 100, color: "hsl(var(--chart-4))" },
    { name: "SO₂", value: data.so2, unit: "DU", threshold: 75, color: "hsl(var(--chart-5))" },
  ]

  return (
    <Card className="border-glow bg-card/60 backdrop-blur-md p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold glow-blue">Pollutant Levels Comparison</h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">
            Current readings vs safety thresholds
          </p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary font-mono px-4 py-1.5">
          <TrendingUp className="w-3 h-3 mr-2" />
          REAL-TIME DATA
        </Badge>
      </div>

      <ChartContainer
        config={{
          value: {
            label: "Current Level",
            color: "hsl(var(--primary))",
          },
        }}
        className="h-[350px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {chartData.map((entry, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "13px", fontFamily: "var(--font-mono)", fontWeight: "600" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px", fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Value",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: "12px", fill: "hsl(var(--muted-foreground))" },
              }}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  const percentOfThreshold = ((data.value / data.threshold) * 100).toFixed(1)
                  return (
                    <div className="rounded-lg border border-border/50 bg-background/95 backdrop-blur-sm p-3 shadow-xl">
                      <div className="font-bold text-sm mb-1">{data.name}</div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {data.value.toFixed(1)} {data.unit}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Threshold: {data.threshold} {data.unit}
                      </div>
                      <div className="text-xs font-mono mt-1">
                        <span className={Number(percentOfThreshold) > 100 ? "text-destructive" : "text-chart-1"}>
                          {percentOfThreshold}% of threshold
                        </span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4">
        {chartData.map((item) => {
          const percentOfThreshold = ((item.value / item.threshold) * 100).toFixed(0)
          const isAboveThreshold = item.value > item.threshold
          return (
            <div
              key={item.name}
              className="p-3 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm space-y-1"
            >
              <div className="text-xs font-mono text-muted-foreground">{item.name}</div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                {percentOfThreshold}%
              </div>
              <div className="text-xs font-mono">
                {isAboveThreshold ? (
                  <span className="text-destructive">Above limit</span>
                ) : (
                  <span className="text-chart-1">Safe</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
