"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { useState } from "react"

interface LocationInputProps {
  onLocationChange: (latitude: number, longitude: number) => void
}

export function LocationInput({ onLocationChange }: LocationInputProps) {
  const [latitude, setLatitude] = useState("34.0522")
  const [longitude, setLongitude] = useState("-118.2437")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lat = Number.parseFloat(latitude)
    const lon = Number.parseFloat(longitude)

    if (!isNaN(lat) && !isNaN(lon)) {
      onLocationChange(lat, lon)
    }
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4)
          const lon = position.coords.longitude.toFixed(4)
          setLatitude(lat)
          setLongitude(lon)
          onLocationChange(Number.parseFloat(lat), Number.parseFloat(lon))
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Location</CardTitle>
        <CardDescription>Enter coordinates or use your current location</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="34.0522"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="-118.2437"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Update Location
            </Button>
            <Button type="button" variant="outline" onClick={handleCurrentLocation}>
              <MapPin className="h-4 w-4 mr-2" />
              Use Current
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
