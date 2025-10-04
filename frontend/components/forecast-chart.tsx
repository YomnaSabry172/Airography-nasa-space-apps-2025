"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { DataMerged } from "@/lib/types"

interface ForecastChartProps {
  historicalData: DataMerged[]
  forecastData: DataMerged[]
}

export function ForecastChart({ historicalData, forecastData }: ForecastChartProps) {
  const combinedData = [...historicalData, ...forecastData].map((item, index) => ({
    date: new Date(item.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    pm25: item.pm25 > 0 ? Number(item.pm25.toFixed(1)) : null,
    ozone: item.ozone > 0 ? Number(item.ozone.toFixed(1)) : null,
    so2: item.so2 > 0 ? Number(item.so2.toFixed(1)) : null,
    isForecast: index >= historicalData.length,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">7-Day Forecast & Trends</CardTitle>
        <CardDescription>Historical data and predicted air quality levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pm25"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="PM2.5 (µg/m³)"
              strokeDasharray={(entry: any) => (entry?.isForecast ? "5 5" : "0")}
            />
            <Line
              type="monotone"
              dataKey="ozone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Ozone (ppb)"
              strokeDasharray={(entry: any) => (entry?.isForecast ? "5 5" : "0")}
            />
            <Line
              type="monotone"
              dataKey="so2"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="SO₂ (ppb)"
              strokeDasharray={(entry: any) => (entry?.isForecast ? "5 5" : "0")}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Dashed lines indicate forecasted values based on recent trends
        </div>
      </CardContent>
    </Card>
  )
}
