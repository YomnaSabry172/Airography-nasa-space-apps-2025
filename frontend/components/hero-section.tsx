import { Sparkles, Satellite, Globe, Orbit, Radar } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating satellite icons */}
        <Satellite className="absolute top-32 right-1/4 w-8 h-8 text-primary/30 animate-float" />
        <Orbit
          className="absolute bottom-32 left-1/4 w-10 h-10 text-secondary/30 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <Radar
          className="absolute top-1/2 right-1/3 w-6 h-6 text-accent/30 animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-glow bg-primary/10 backdrop-blur-md holographic-border">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-mono text-primary font-semibold tracking-wide">
              NASA SPACE APPS CHALLENGE 2025
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight tracking-tight">
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent glow-purple animate-pulse-slow">
              Airography
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed font-light">
            Real-time air quality intelligence powered by <span className="text-primary font-semibold">satellite</span>{" "}
            and <span className="text-accent font-semibold">ground station</span> data fusion.
            <span className="block mt-2">
              Protecting communities with precision forecasting and personalized health insights.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border-glow-purple bg-card/60 backdrop-blur-md hover:scale-105 transition-transform">
              <Satellite className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Satellite Network
                </div>
                <div className="text-base font-bold text-primary">Pandora SO₂</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border-glow-cyan bg-card/60 backdrop-blur-md hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 text-accent" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Ground Stations</div>
                <div className="text-base font-bold text-accent">AirNow Network</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
            <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary glow-blue">24/7</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">MONITORING</div>
            </div>
            <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-secondary glow-purple">5</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">POLLUTANTS</div>
            </div>
            <div className="p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-accent glow-cyan">AI</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">FORECASTING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
