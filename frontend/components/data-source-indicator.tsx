import { Card } from "@/components/ui/card"
import { Satellite, Radio, CheckCircle2 } from "lucide-react"

export function DataSourceIndicator() {
  return (
    <Card className="border-glow bg-card/50 backdrop-blur-sm p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="text-sm font-mono text-muted-foreground">DATA SOURCES</div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
            <Satellite className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground font-mono">SATELLITE</div>
              <div className="text-sm font-semibold">NASA Pandora Network</div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-primary ml-2" />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 bg-accent/5">
            <Radio className="w-5 h-5 text-accent" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground font-mono">GROUND STATIONS</div>
              <div className="text-sm font-semibold">AirNow Network</div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-accent ml-2" />
          </div>
        </div>
      </div>
    </Card>
  )
}
