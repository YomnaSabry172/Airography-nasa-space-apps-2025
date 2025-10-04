"use client"

import { useEffect, useRef, useMemo } from "react"
import type { DataMerged } from "@/lib/types"

interface Globe2DProps {
  data?: DataMerged[]
}

export function Globe2D({ data }: Globe2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const markers = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        { lat: 40.7128, lon: -74.006, aqi: 85, color: "#fbbf24", name: "New York" },
        { lat: 34.0522, lon: -118.2437, aqi: 120, color: "#f97316", name: "Los Angeles" },
        { lat: 51.5074, lon: -0.1278, aqi: 65, color: "#22c55e", name: "London" },
        { lat: 35.6762, lon: 139.6503, aqi: 95, color: "#fbbf24", name: "Tokyo" },
        { lat: -33.8688, lon: 151.2093, aqi: 45, color: "#22c55e", name: "Sydney" },
        { lat: 19.4326, lon: -99.1332, aqi: 145, color: "#ef4444", name: "Mexico City" },
      ]
    }
    return data.slice(0, 10).map((d, i) => ({
      lat: d.latitude,
      lon: d.longitude,
      aqi: Math.round((d.pm25 + d.pm10 + d.ozone + d.no2) / 4),
      color: d.pm25 > 100 ? "#ef4444" : d.pm25 > 50 ? "#f97316" : "#22c55e",
      name: `Station ${i + 1}`,
    }))
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = "#0a0f1a"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#0070f3"
    ctx.globalAlpha = 0.15
    ctx.lineWidth = 1

    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 30) {
      const y = ((90 - lat) / 180) * height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Longitude lines
    for (let lon = -180; lon <= 180; lon += 30) {
      const x = ((lon + 180) / 360) * width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    ctx.globalAlpha = 1

    // Draw continents outline (simplified)
    ctx.strokeStyle = "#1e3a8a"
    ctx.fillStyle = "#0f172a"
    ctx.lineWidth = 2

    // Simplified world map paths
    const continents = [
      // North America
      [
        { lat: 70, lon: -170 },
        { lat: 70, lon: -50 },
        { lat: 25, lon: -80 },
        { lat: 15, lon: -100 },
        { lat: 50, lon: -130 },
      ],
      // South America
      [
        { lat: 10, lon: -80 },
        { lat: -55, lon: -70 },
        { lat: -20, lon: -35 },
        { lat: 10, lon: -50 },
      ],
      // Europe
      [
        { lat: 70, lon: -10 },
        { lat: 70, lon: 40 },
        { lat: 35, lon: 40 },
        { lat: 35, lon: -10 },
      ],
      // Africa
      [
        { lat: 35, lon: -10 },
        { lat: 35, lon: 50 },
        { lat: -35, lon: 40 },
        { lat: -35, lon: 10 },
      ],
      // Asia
      [
        { lat: 70, lon: 40 },
        { lat: 70, lon: 180 },
        { lat: 0, lon: 140 },
        { lat: 10, lon: 100 },
        { lat: 35, lon: 50 },
      ],
      // Australia
      [
        { lat: -10, lon: 110 },
        { lat: -10, lon: 155 },
        { lat: -45, lon: 150 },
        { lat: -40, lon: 115 },
      ],
    ]

    continents.forEach((continent) => {
      ctx.beginPath()
      continent.forEach((point, i) => {
        const x = ((point.lon + 180) / 360) * width
        const y = ((90 - point.lat) / 180) * height
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    })

    // Draw pollution markers
    markers.forEach((marker) => {
      const x = ((marker.lon + 180) / 360) * width
      const y = ((90 - marker.lat) / 180) * height

      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
      gradient.addColorStop(0, marker.color)
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(x - 20, y - 20, 40, 40)

      // Marker circle
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = marker.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px monospace"
      ctx.fillText(`${marker.name}: ${marker.aqi}`, x + 10, y - 10)
    })
  }, [markers])

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border-glow bg-card/20 backdrop-blur-sm">
      <canvas ref={canvasRef} width={1200} height={600} className="w-full h-full" />
    </div>
  )
}
