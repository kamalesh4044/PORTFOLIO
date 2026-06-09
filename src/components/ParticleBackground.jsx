import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './ParticleBackground.css';

const PARTICLE_COUNT = 4000;
const BASE_SPEED = 1.5; // Base drift speed
const SCROLL_MULTIPLIER = 0.8; // How much scrolling accelerates the particles

function WarpParticles() {
  const pointsRef = useRef();
  
  // Track scroll velocity
  const scrollData = useRef({
    lastY: window.scrollY,
    velocity: 0,
    targetVelocity: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - scrollData.current.lastY;
      
      // Absolute value so scrolling up OR down creates forward momentum
      scrollData.current.targetVelocity = Math.min(Math.abs(deltaY) * SCROLL_MULTIPLIER, 100);
      scrollData.current.lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const color1 = new THREE.Color('#00f0ff'); // Cyan
    const color2 = new THREE.Color('#bc13fe'); // Purple

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create a hollow cylinder/tunnel distribution
      const theta = Math.random() * 2 * Math.PI;
      const r = 3 + Math.random() * 35; // Don't put particles dead center to avoid clipping
      
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200; // Spread along Z axis

      // Mix cyan and purple randomly
      const mixedColor = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smoothly decay target velocity back to 0
    scrollData.current.velocity += (scrollData.current.targetVelocity - scrollData.current.velocity) * 5 * delta;
    scrollData.current.targetVelocity *= 0.9; 
    
    // Total speed calculation
    const currentSpeed = (BASE_SPEED + scrollData.current.velocity) * delta * 15;

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Move particles towards camera (+Z)
      positionsArray[i3 + 2] += currentSpeed;

      // Wrap around to the back if it passes the camera
      if (positionsArray[i3 + 2] > 20) {
        positionsArray[i3 + 2] = -150;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire tunnel
    pointsRef.current.rotation.z += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation={true} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  try {
    return (
      <div className="particle-background">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false }}
        >
          {/* Black background with fog to fade particles in the distance */}
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 10, 100]} />
          <WarpParticles />
        </Canvas>
      </div>
    );
  } catch {
    return null;
  }
}
