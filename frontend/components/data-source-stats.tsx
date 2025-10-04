"use client"

import { Card } from "@/components/ui/card"
import { Satellite, Radio, Database, Zap } from "lucide-react"

export function DataSourceStats() {
  const stats = [
    {
      icon: Satellite,
      label: "Satellite Readings",
      value: "1",
      change: "+12%",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
    {
      icon: Radio,
      label: "Ground Stations",
      value: "3",
      change: "Active",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
    },
    {
      icon: Database,
      label: "Data Points",
      value: "20K",
      change: "+8.3%",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      borderColor: "border-chart-3/30",
    },
    {
      icon: Zap,
      label: "Predictions Made",
      value: "10",
      change: "Today",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      borderColor: "border-chart-4/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-glow ${stat.bgColor} backdrop-blur-md p-6 hover:scale-105 transition-all duration-300 group`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <span
              className={`text-xs font-mono ${stat.color} px-2 py-1 rounded-md ${stat.bgColor} border ${stat.borderColor}`}
            >
              {stat.change}
            </span>
          </div>
          <div className="space-y-1">
            <div className={`text-3xl font-bold ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground font-mono uppercase tracking-wide">{stat.label}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
