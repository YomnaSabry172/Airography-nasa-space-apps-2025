"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/lib/types"
import { Heart, Factory, Sprout, User } from "lucide-react"

interface ProfileSelectorProps {
  selectedProfile: UserProfile
  onProfileChange: (profile: UserProfile) => void
}

const profiles = [
  {
    id: "asthma" as UserProfile,
    name: "Asthma Patient",
    description: "Sensitive to PM2.5 and ozone",
    icon: Heart,
  },
  {
    id: "industrial" as UserProfile,
    name: "Industrial Resident",
    description: "Monitor SO₂ and NO₂ levels",
    icon: Factory,
  },
  {
    id: "farmer" as UserProfile,
    name: "Farmer",
    description: "Crop protection from pollutants",
    icon: Sprout,
  },
  {
    id: "general" as UserProfile,
    name: "General",
    description: "Overall air quality monitoring",
    icon: User,
  },
]

export function ProfileSelector({ selectedProfile, onProfileChange }: ProfileSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Select Your Profile</CardTitle>
        <CardDescription>Get personalized air quality recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {profiles.map((profile) => {
            const Icon = profile.icon
            const isSelected = selectedProfile === profile.id

            return (
              <Button
                key={profile.id}
                variant={isSelected ? "default" : "outline"}
                className="h-auto flex-col items-center gap-2 p-4"
                onClick={() => onProfileChange(profile.id)}
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{profile.name}</div>
                  <div className="text-xs opacity-80 mt-1 font-normal">{profile.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
