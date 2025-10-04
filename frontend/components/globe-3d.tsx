"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Html } from "@react-three/drei"
import * as THREE from "three"
import type { DataMerged } from "@/lib/types"

interface Globe3DProps {
  data?: DataMerged[]
}

function PollutionMarker({ lat, lon, aqi, color }: { lat: number; lon: number; aqi: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2)
    }
  })

  // Convert lat/lon to 3D coordinates on sphere
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const radius = 2.05

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return (
    <group position={[x, y, z]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono border border-primary/30">
          AQI: {aqi}
        </div>
      </Html>
    </group>
  )
}

function Earth({ data }: { data?: DataMerged[] }) {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  // Generate pollution markers from data
  const markers = useMemo(() => {
    if (!data || data.length === 0) {
      // Default locations with mock data
      return [
        { lat: 40.7128, lon: -74.006, aqi: 85, color: "#fbbf24" },
        { lat: 34.0522, lon: -118.2437, aqi: 120, color: "#f97316" },
        { lat: 51.5074, lon: -0.1278, aqi: 65, color: "#22c55e" },
        { lat: 35.6762, lon: 139.6503, aqi: 95, color: "#fbbf24" },
        { lat: -33.8688, lon: 151.2093, aqi: 45, color: "#22c55e" },
        { lat: 19.4326, lon: -99.1332, aqi: 145, color: "#ef4444" },
      ]
    }
    return data.slice(0, 10).map((d) => ({
      lat: d.latitude,
      lon: d.longitude,
      aqi: Math.round((d.pm25 + d.pm10 + d.ozone + d.no2) / 4),
      color: d.pm25 > 100 ? "#ef4444" : d.pm25 > 50 ? "#f97316" : "#22c55e",
    }))
  }, [data])

  return (
    <>
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial color="#0a1929" roughness={0.8} metalness={0.2} />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#0070f3" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
      {/* Grid lines */}
      <Sphere args={[2.02, 32, 32]}>
        <meshBasicMaterial color="#0070f3" wireframe transparent opacity={0.15} />
      </Sphere>
      {markers.map((marker, i) => (
        <PollutionMarker key={i} {...marker} />
      ))}
    </>
  )
}

export function Globe3D({ data }: Globe3DProps) {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border-glow bg-card/20 backdrop-blur-sm">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth data={data} />
        <OrbitControls enableZoom={true} enablePan={false} minDistance={3} maxDistance={8} />
      </Canvas>
    </div>
  )
}
