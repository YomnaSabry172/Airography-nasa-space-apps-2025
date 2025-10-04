"use client"

import { useEffect, useRef } from "react"

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star field
    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Planets
    const planets = [
      {
        x: canvas.width * 0.15,
        y: canvas.height * 0.2,
        radius: 60,
        color: "rgba(59, 130, 246, 0.3)",
        glowColor: "rgba(59, 130, 246, 0.6)",
        orbitRadius: 80,
        orbitSpeed: 0.001,
        angle: 0,
      },
      {
        x: canvas.width * 0.85,
        y: canvas.height * 0.7,
        radius: 45,
        color: "rgba(139, 92, 246, 0.3)",
        glowColor: "rgba(139, 92, 246, 0.6)",
        orbitRadius: 60,
        orbitSpeed: 0.0015,
        angle: Math.PI,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.15,
        radius: 35,
        color: "rgba(6, 182, 212, 0.3)",
        glowColor: "rgba(6, 182, 212, 0.6)",
        orbitRadius: 50,
        orbitSpeed: 0.002,
        angle: Math.PI / 2,
      },
    ]

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.3, Math.min(1, star.opacity))

        // Move stars slowly
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw planets with glow
      planets.forEach((planet) => {
        // Update orbit position
        planet.angle += planet.orbitSpeed
        const offsetX = Math.cos(planet.angle) * planet.orbitRadius
        const offsetY = Math.sin(planet.angle) * planet.orbitRadius

        const currentX = planet.x + offsetX
        const currentY = planet.y + offsetY

        // Outer glow
        const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, planet.radius * 1.5)
        gradient.addColorStop(0, planet.glowColor)
        gradient.addColorStop(0.5, planet.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(currentX, currentY, planet.radius * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Planet body
        const planetGradient = ctx.createRadialGradient(
          currentX - planet.radius * 0.3,
          currentY - planet.radius * 0.3,
          0,
          currentX,
          currentY,
          planet.radius,
        )
        planetGradient.addColorStop(0, planet.glowColor)
        planetGradient.addColorStop(1, planet.color)

        ctx.fillStyle = planetGradient
        ctx.beginPath()
        ctx.arc(currentX, currentY, planet.radius, 0, Math.PI * 2)
        ctx.fill()

        // Orbit path (faint)
        ctx.strokeStyle = `${planet.color.replace("0.3", "0.1")}`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(planet.x, planet.y, planet.orbitRadius, 0, Math.PI * 2)
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
