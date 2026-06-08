import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './ParticleBackground.css';

const PARTICLE_COUNT = 250;
const SPREAD = 20;
const CURSOR_RADIUS = 3;
const REPEL_STRENGTH = 0.6;
const BASE_SIZE = 0.04;
const GLOW_SIZE = 0.09;

const PRIMARY = new THREE.Color('#66fcf1');
const SECONDARY = new THREE.Color('#45a29e');
const DIM_PRIMARY = new THREE.Color('#66fcf1').multiplyScalar(0.35);
const DIM_SECONDARY = new THREE.Color('#45a29e').multiplyScalar(0.35);

function Particles() {
  const meshRef = useRef();
  const lightRef = useRef();
  const { viewport } = useThree();

  const mouse3D = useRef(new THREE.Vector3(100, 100, 0));

  const { basePositions, velocities, isPrimary } = useMemo(() => {
    const bp = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const primary = new Uint8Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      bp[i3] = (Math.random() - 0.5) * SPREAD;
      bp[i3 + 1] = (Math.random() - 0.5) * SPREAD;
      bp[i3 + 2] = (Math.random() - 0.5) * SPREAD * 0.6;

      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

      primary[i] = Math.random() > 0.35 ? 1 : 0;
    }
    return { basePositions: bp, velocities: vel, isPrimary: primary };
  }, []);

  const positions = useRef(new Float32Array(basePositions));

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const pos = positions.current;
    const mx = mouse3D.current.x;
    const my = mouse3D.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Drift particles slowly
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Gentle sine wave motion
      const offset = i * 0.1;
      const px = pos[i3] + Math.sin(time * 0.3 + offset) * 0.02;
      const py = pos[i3 + 1] + Math.cos(time * 0.25 + offset) * 0.02;
      const pz = pos[i3 + 2];

      // Wrap around boundaries
      if (pos[i3] > SPREAD / 2) pos[i3] = -SPREAD / 2;
      if (pos[i3] < -SPREAD / 2) pos[i3] = SPREAD / 2;
      if (pos[i3 + 1] > SPREAD / 2) pos[i3 + 1] = -SPREAD / 2;
      if (pos[i3 + 1] < -SPREAD / 2) pos[i3 + 1] = SPREAD / 2;
      if (pos[i3 + 2] > SPREAD * 0.3) pos[i3 + 2] = -SPREAD * 0.3;
      if (pos[i3 + 2] < -SPREAD * 0.3) pos[i3 + 2] = SPREAD * 0.3;

      // Distance to cursor in 2D (ignore z for cursor interaction)
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Cursor repulsion
      let finalX = px;
      let finalY = py;
      if (dist < CURSOR_RADIUS && dist > 0.01) {
        const force = (1 - dist / CURSOR_RADIUS) * REPEL_STRENGTH;
        finalX += (dx / dist) * force;
        finalY += (dy / dist) * force;
      }

      // Scale based on proximity to cursor (glow effect)
      const proximity = dist < CURSOR_RADIUS ? 1 - dist / CURSOR_RADIUS : 0;
      const scale = BASE_SIZE + proximity * (GLOW_SIZE - BASE_SIZE);

      dummy.position.set(finalX, finalY, pz);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color: brighter near cursor
      if (isPrimary[i]) {
        tempColor.lerpColors(DIM_PRIMARY, PRIMARY, 0.3 + proximity * 0.7);
      } else {
        tempColor.lerpColors(DIM_SECONDARY, SECONDARY, 0.3 + proximity * 0.7);
      }
      colorArray[i3] = tempColor.r;
      colorArray[i3 + 1] = tempColor.g;
      colorArray[i3 + 2] = tempColor.b;
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update instance colors
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Move point light to follow cursor
    if (lightRef.current) {
      lightRef.current.position.set(mx, my, 3);
    }
  });

  // Initialize instance colors
  const initColors = useCallback(
    (mesh) => {
      if (!mesh) return;
      meshRef.current = mesh;
      const col = new THREE.Color();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        col.copy(isPrimary[i] ? DIM_PRIMARY : DIM_SECONDARY);
        mesh.setColorAt(i, col);
      }
      mesh.instanceColor.needsUpdate = true;
    },
    [isPrimary]
  );

  const handlePointerMove = useCallback(
    (e) => {
      // Convert NDC (-1 to 1) to world coordinates
      mouse3D.current.x = (e.point?.x ?? 0) || ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      mouse3D.current.y = (e.point?.y ?? 0) || (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    },
    [viewport]
  );

  return (
    <group onPointerMove={handlePointerMove}>
      {/* Invisible plane to capture pointer events */}
      <mesh visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      <ambientLight intensity={0.15} color="#45a29e" />
      <pointLight
        ref={lightRef}
        intensity={1.2}
        distance={8}
        color="#66fcf1"
        position={[0, 0, 3]}
      />

      <instancedMesh
        ref={initColors}
        args={[null, null, PARTICLE_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          emissive="#66fcf1"
          emissiveIntensity={0.5}
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      </instancedMesh>
    </group>
  );
}

export default function ParticleBackground() {
  try {
    return (
      <div className="particle-background">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Particles />
        </Canvas>
      </div>
    );
  } catch {
    return null;
  }
}
