"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { DataMerged, UserProfile } from "@/lib/types"
import { getRecommendations } from "@/lib/air-quality-utils"
import { Heart, Factory, Sprout, User } from "lucide-react"

interface RecommendationsCardProps {
  data: DataMerged
  profile: UserProfile
}

const profileIcons = {
  asthma: Heart,
  industrial: Factory,
  farmer: Sprout,
  general: User,
}

const profileTitles = {
  asthma: "Asthma & Respiratory Health",
  industrial: "Industrial Zone Residents",
  farmer: "Agricultural & Farming",
  general: "General Population",
}

export function RecommendationsCard({ data, profile }: RecommendationsCardProps) {
  const recommendations = getRecommendations(data, profile)
  const Icon = profileIcons[profile]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-sans">Personalized Recommendations</CardTitle>
            <CardDescription>{profileTitles[profile]}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <Alert key={index} className="border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
            <AlertDescription className="text-sm leading-relaxed">{rec}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
