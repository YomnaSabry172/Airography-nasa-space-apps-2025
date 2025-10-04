"use client"

import { Card } from "@/components/ui/card"
import { Heart, Factory, Sprout, FlaskConical } from "lucide-react"

interface UserProfileSelectorProps {
  selectedProfile: "asthma" | "industrial" | "farmer" | "researcher"
  onProfileChange: (profile: "asthma" | "industrial" | "farmer" | "researcher") => void
}

export function UserProfileSelector({ selectedProfile, onProfileChange }: UserProfileSelectorProps) {
  const profiles = [
    {
      id: "asthma" as const,
      name: "Asthma & Respiratory",
      icon: Heart,
      description: "Monitor PM2.5, ozone, and respiratory irritants",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      borderColor: "border-chart-1/50",
    },
    {
      id: "industrial" as const,
      name: "Industrial Zone",
      icon: Factory,
      description: "Track SO₂, NO₂, and industrial emissions",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      borderColor: "border-chart-4/50",
    },
    {
      id: "farmer" as const,
      name: "Agriculture",
      icon: Sprout,
      description: "Monitor ozone levels for crop protection",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      borderColor: "border-chart-3/50",
    },
    {
      id: "researcher" as const,
      name: "Researchers",
      icon: FlaskConical,
      description: "Comprehensive data analysis and trends",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      borderColor: "border-chart-5/50",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Profile</h2>
        <p className="text-muted-foreground font-mono text-sm">Get personalized air quality insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles.map((profile) => {
          const Icon = profile.icon
          const isSelected = selectedProfile === profile.id

          return (
            <Card
              key={profile.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected
                  ? `border-glow ${profile.bgColor} border-2 ${profile.borderColor}`
                  : "border-border bg-card/50 hover:bg-card/80"
              } backdrop-blur-sm p-6`}
              onClick={() => onProfileChange(profile.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Icon className={`w-8 h-8 ${isSelected ? profile.color : "text-muted-foreground"}`} />
                  {isSelected && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{profile.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
