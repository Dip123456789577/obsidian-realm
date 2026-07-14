// @ts-nocheck - TypeScript types for Three.js cannot be installed due to network issues
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const count = 1000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    // @ts-ignore - React Three Fiber handles Three.js elements declaratively
    <points ref={particlesRef}>
      {/* @ts-ignore */}
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* @ts-ignore */}
      <pointsMaterial size={0.05} color="white" />
    </points>
  )
}

export default function ThreeParticles() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Particles />
      </Canvas>
    </div>
  )
}
