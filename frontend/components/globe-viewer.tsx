"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Map } from "lucide-react"
import { Globe3D } from "./globe-3d"
import { Globe2D } from "./globe-2d"
import type { DataMerged } from "@/lib/types"

interface GlobeViewerProps {
  data?: DataMerged[]
}

export function GlobeViewer({ data }: GlobeViewerProps) {
  const [view, setView] = useState<"2d" | "3d">("3d")

  return (
    <section id="globe" className="py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold glow-blue mb-2">Global Air Quality Visualization</h2>
            <p className="text-muted-foreground font-mono text-sm">Real-time pollution monitoring across the planet</p>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "2d" ? "default" : "outline"} onClick={() => setView("2d")} className="gap-2">
              <Map className="w-4 h-4" />
              2D Map
            </Button>
            <Button variant={view === "3d" ? "default" : "outline"} onClick={() => setView("3d")} className="gap-2">
              <Globe className="w-4 h-4" />
              3D Globe
            </Button>
          </div>
        </div>

        <div className="relative">{view === "3d" ? <Globe3D data={data} /> : <Globe2D data={data} />}</div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-mono text-muted-foreground">GOOD</span>
            </div>
            <div className="text-2xl font-bold text-green-500">0-50 AQI</div>
          </div>
          <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm font-mono text-muted-foreground">MODERATE</span>
            </div>
            <div className="text-2xl font-bold text-yellow-500">51-100 AQI</div>
          </div>
          <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm font-mono text-muted-foreground">UNHEALTHY</span>
            </div>
            <div className="text-2xl font-bold text-red-500">100+ AQI</div>
          </div>
        </div>
      </div>
    </section>
  )
}
