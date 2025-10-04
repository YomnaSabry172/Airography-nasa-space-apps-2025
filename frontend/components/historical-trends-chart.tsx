"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Activity, Clock } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DataMerged } from "@/lib/types"

interface HistoricalTrendsChartProps {
  data: DataMerged[]
  loading: boolean
}

export function HistoricalTrendsChart({ data, loading }: HistoricalTrendsChartProps) {
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

  return (
    <Card className="border-glow-cyan bg-card/60 backdrop-blur-md p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold glow-cyan">Historical Trends</h2>
          </div>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">All pollutants over time</p>
        </div>
        <Badge variant="outline" className="border-accent/50 text-accent font-mono px-4 py-1.5">
          <Clock className="w-3 h-3 mr-2" />
          7-DAY HISTORY
        </Badge>
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
        className="h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.15)" vertical={false} />
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
                value: "Level",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: "12px", fill: "hsl(var(--muted-foreground))" },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", fontFamily: "var(--font-mono)", paddingTop: "20px" }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="PM25"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="PM10"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="Ozone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-3))", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="NO2"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-4))", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="SO2"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-5))", r: 3 }}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  )
}
