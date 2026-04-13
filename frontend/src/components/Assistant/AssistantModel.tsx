import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Points,
  PointMaterial,
  Icosahedron,
  Sphere
} from '@react-three/drei';
import * as THREE from 'three';

// A dynamic particle swarm that reacts to mouse
const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  // Generate sphere points
  const particleCount = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // distribute randomly on a sphere
        const r = 2.5 + Math.random() * 2.5;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        p[i*3] = r * Math.sin(phi) * Math.cos(theta);
        p[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        p[i*3+2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Mouse interaction target
    const targetX = (state.pointer.x * Math.PI) * 0.15;
    const targetY = (state.pointer.y * Math.PI) * 0.15;

    if (pointsRef.current) {
        // Slow constant rotation
        pointsRef.current.rotation.y += delta * 0.05;
        // Interactive tilt
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetY, 0.05);
        pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, -targetX, 0.05);

        // Gentle pulse
        const s = 1 + Math.sin(time * 1.5) * 0.02;
        pointsRef.current.scale.set(s, s, s);
    }

    if (shellRef.current) {
        shellRef.current.rotation.y -= delta * 0.1;
        shellRef.current.rotation.x = THREE.MathUtils.lerp(shellRef.current.rotation.x, targetY * 1.2, 0.08);
        shellRef.current.rotation.z = THREE.MathUtils.lerp(shellRef.current.rotation.z, -targetX * 1.2, 0.08);
    }
  });

  return (
    <group>
        {/* Inner Core Element */}
        <Sphere args={[0.9, 32, 32]}>
             <meshStandardMaterial 
                color="#6d28d9" 
                emissive="#7c3aed" 
                emissiveIntensity={1.5} 
                wireframe={true} 
             />
        </Sphere>
        <Sphere args={[0.6, 32, 32]}>
             <meshStandardMaterial 
                color="#a855f7" 
                emissive="#c084fc" 
                emissiveIntensity={2} 
                wireframe={false} 
             />
        </Sphere>

        {/* Core Shell Geometry */}
        <Icosahedron ref={shellRef} args={[1.6, 2]}>
            <meshStandardMaterial 
                color="#0ea5e9" 
                wireframe 
                emissive="#0ea5e9" 
                emissiveIntensity={0.8}
                transparent
                opacity={0.4}
            />
        </Icosahedron>

        {/* Outer Particle Swarm */}
        <Points ref={pointsRef} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#06b6d4" // cyan-500
                size={0.035}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.7}
            />
        </Points>
    </group>
  );
};

// Deep background grid overlay
const BackgroundField = () => {
    return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black z-0 pointer-events-none" />
    );
};

export const AssistantModel = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <BackgroundField />
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={55} />
        <ambientLight intensity={0.4} />
        
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={4} color="#8b5cf6" />
        <pointLight position={[0, 5, -5]} intensity={2} color="#06b6d4" />
        
        <ParticleSwarm />
        
        <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
    </div>
  );
};
