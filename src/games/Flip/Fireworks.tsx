import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const Fireworks = () => {
  const particles = useRef<THREE.Points>(null!);
  const velocities = useRef<Array<THREE.Vector3>>([]);

  React.useEffect(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const tempVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      tempVelocities.push(new THREE.Vector3(
        randomInRange(-1, 1),
        randomInRange(0.5, 1.5),
        randomInRange(-1, 1)
      ));
    }
    
    particles.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    velocities.current = tempVelocities;
  }, []);

  useFrame(() => {
    const positions = particles.current.geometry.attributes.position.array;
    for (let i = 0; i < velocities.current.length; i++) {
      positions[i * 3] += velocities.current[i].x * 0.1;
      positions[i * 3 + 1] += velocities.current[i].y * 0.1;
      positions[i * 3 + 2] += velocities.current[i].z * 0.1;
      velocities.current[i].y -= 0.02; // Apply gravity
    }
    particles.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial attach="material" size={1.05} color={'#ffcc00'} />
    </points>
  );
};

export default Fireworks; // 确保这里是默认导出
