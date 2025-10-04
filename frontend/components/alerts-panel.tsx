import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { getAQILevel } from '@/lib/air-quality-utils'
import type { DataMerged } from '@/lib/types'

interface AlertsPanelProps {
  data?: DataMerged
  userProfile: 'asthma' | 'industrial' | 'farmer'
}

export function AlertsPanel({ data, userProfile }: AlertsPanelProps) {
  if (!data) return null

  const alerts = []

  // Asthma alerts
  if (userProfile === 'asthma') {
    if ((data.pm25 || 0) > 35) {
      alerts.push({
        level: 'warning',
        title: 'High PM2.5 Levels',
        message: 'Consider limiting outdoor activities. Use air purifiers indoors.',
        icon: AlertTriangle,
      })
    }
    if ((data.ozone || 0) > 70) {
      alerts.push({
        level: 'warning',
        title: 'Elevated Ozone',
        message: 'Avoid strenuous outdoor exercise during peak hours (10am-4pm).',
        icon: AlertTriangle,
      })
    }
  }

  // Industrial alerts
  if (userProfile === 'industrial') {
    if ((data.so2 || 0) > 10) {
      alerts.push({
        level: 'warning',
        title: 'High SO₂ Detected',
        message: 'Industrial emissions elevated. Check facility compliance.',
        icon: AlertTriangle,
      })
    }
    if ((data.no2 || 0) > 40) {
      alerts.push({
        level: 'info',
        title: 'Moderate NO₂ Levels',
        message: 'Monitor traffic and combustion sources.',
        icon: Info,
      })
    }
  }

  // Farmer alerts
  if (userProfile === 'farmer') {
    if ((data.ozone || 0) > 60) {
      alerts.push({
        level: 'warning',
        title: 'Ozone Crop Damage Risk',
        message: 'High ozone can reduce crop yields. Consider protective measures for sensitive crops.',
        icon: AlertTriangle,
      })
    }
  }

  if (alerts.length === 0) {
    alerts.push({
      level: 'success',
      title: 'Air Quality Normal',
      message: 'No alerts for your profile. Conditions are favorable.',
      icon: CheckCircle,
    })
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const Icon = alert.icon
        const colors = {
          warning: 'border-destructive/50 bg-destructive/5 text-destructive',
          info: 'border-primary/50 bg-primary/5 text-primary',
          success: 'border-accent/50 bg-accent/5 text-accent',
        }
        
        return (
          <Card key={index} className={`border ${colors[alert.level as keyof typeof colors]} backdrop-blur-sm p-4`}>
            <div className="flex items-start gap-3">
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="font-semibold">{alert.title}</div>
                <div className="text-sm opacity-90">{alert.message}</div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
