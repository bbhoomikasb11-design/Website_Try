'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleSystem } from './ParticleSystem';
import { CameraRig } from './CameraRig';
import { Fallback2D } from './Fallback2D';

interface Scene3DProps {
  scrollProgress: number;
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress }) => {
  const [mounted, setMounted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setUseFallback(true);
      return;
    }

    // 2. Check WebGL support & Low Power Hardware (mobile or low concurrency)
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setUseFallback(true);
        return;
      }
    } catch {
      setUseFallback(true);
      return;
    }

    // Mobile / Low hardware concurrency check
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    if (isMobile) {
      // Degrade gracefully to lightweight low-power mode or fallback
      setIsLowPower(true);
    } else if (lowCores) {
      setIsLowPower(true);
    }
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#0B0E14] z-0" />;

  if (useFallback) {
    return <Fallback2D />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#0B0E14]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={isLowPower ? [1, 1.25] : [1, 2]}
        gl={{
          antialias: !isLowPower,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#E8A85C" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#D98C4A" />

        <CameraRig scrollProgress={scrollProgress} />
        <ParticleSystem scrollProgress={scrollProgress} isLowPower={isLowPower} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
