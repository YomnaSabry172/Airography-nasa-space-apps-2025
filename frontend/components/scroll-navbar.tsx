"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Satellite, TrendingUp, Users, AlertTriangle, BarChart3, Map, Globe } from "lucide-react"

export function ScrollNavbar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-xl font-bold glow-blue">Airography</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("data-sources")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Data Sources
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("profiles")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Profiles
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("monitor")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <Satellite className="w-4 h-4 mr-2" />
                Monitor
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("comparison")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analysis
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("heatmap")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <Map className="w-4 h-4 mr-2" />
                Heatmap
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("alerts")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alerts
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("forecast")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Forecast
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection("globe")}
                className="text-sm font-mono hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                Globe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
