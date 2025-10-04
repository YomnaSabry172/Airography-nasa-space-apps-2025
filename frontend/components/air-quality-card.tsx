"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DataMerged } from "@/lib/types"
import { getAQILevel, calculateOverallAQI } from "@/lib/air-quality-utils"
import { Wind, Droplets, Cloud, Factory, Flame } from "lucide-react"

interface AirQualityCardProps {
  data: DataMerged
}

export function AirQualityCard({ data }: AirQualityCardProps) {
  const overallAQI = calculateOverallAQI(data)
  const pm25Level = getAQILevel(data.pm25, "pm25")

  const pollutants = [
    { name: "PM2.5", value: data.pm25, unit: "µg/m³", icon: Droplets, pollutant: "pm25" },
    { name: "PM10", value: data.pm10, unit: "µg/m³", icon: Cloud, pollutant: "pm10" },
    { name: "Ozone", value: data.ozone, unit: "ppb", icon: Wind, pollutant: "ozone" },
    { name: "NO₂", value: data.no2, unit: "ppb", icon: Factory, pollutant: "no2" },
    { name: "SO₂", value: data.so2, unit: "ppb", icon: Flame, pollutant: "so2" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-sans">Current Air Quality</CardTitle>
            <CardDescription>
              {new Date(data.timestamp).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-foreground">{Math.round(overallAQI)}</div>
            <Badge variant="secondary" className="mt-1" style={{ backgroundColor: pm25Level.color, color: "white" }}>
              {pm25Level.level.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {pollutants.map((pollutant) => {
            const level = getAQILevel(pollutant.value, pollutant.pollutant)
            const Icon = pollutant.icon

            return (
              <div key={pollutant.name} className="flex flex-col items-center p-4 rounded-lg bg-muted">
                <Icon className="h-6 w-6 mb-2" style={{ color: level.color }} />
                <div className="text-sm font-medium text-muted-foreground">{pollutant.name}</div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {pollutant.value > 0 ? pollutant.value.toFixed(1) : "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">{pollutant.unit}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
