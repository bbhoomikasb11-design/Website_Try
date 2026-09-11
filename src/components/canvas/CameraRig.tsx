'use client';

import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress }) => {
  const { camera } = useThree();
  const targetCamPos = React.useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = React.useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = React.useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Camera keyframe coordinates corresponding to y-offsets of 3D particle formations
    if (p <= 0.15) {
      // Stage 1: HERO
      const t = p / 0.15;
      targetCamPos.current.set(0, -t * 2, 8 - t * 1);
      targetLookAt.current.set(0, -t * 2, 0);
    } else if (p <= 0.45) {
      // Stage 2: WORK (Camera pushes forward through particles down to project cards)
      const t = (p - 0.15) / 0.30;
      const startY = -2;
      const endY = -18;
      targetCamPos.current.set(
        Math.sin(t * Math.PI) * 1.5,
        startY + (endY - startY) * t,
        7.0 - Math.sin(t * Math.PI) * 1.2
      );
      targetLookAt.current.set(
        Math.sin(t * Math.PI) * 0.5,
        startY + (endY - startY) * t,
        0
      );
    } else if (p <= 0.65) {
      // Stage 3: EXPERTISE (Calm, slightly wider view)
      const t = (p - 0.45) / 0.20;
      const startY = -18;
      const endY = -27;
      targetCamPos.current.set(
        -1.2 * (1 - t),
        startY + (endY - startY) * t,
        7.5
      );
      targetLookAt.current.set(0, startY + (endY - startY) * t, 0);
    } else if (p <= 0.80) {
      // Stage 4: STUDIO (Focus on 3-into-1 merging core at y = -36)
      const t = (p - 0.65) / 0.15;
      const startY = -27;
      const endY = -36;
      targetCamPos.current.set(0, startY + (endY - startY) * t, 6.5);
      targetLookAt.current.set(0, startY + (endY - startY) * t, 0);
    } else {
      // Stage 5: BOOKING (Camera pulls back wide for warm hearth ring)
      const t = (p - 0.80) / 0.20;
      const startY = -36;
      const endY = -46;
      targetCamPos.current.set(0, startY + (endY - startY) * t, 8.5 + t * 2.0);
      targetLookAt.current.set(0, startY + (endY - startY) * t, 0);
    }

    // Smooth camera position dampening
    camera.position.lerp(targetCamPos.current, 0.06);

    // Smooth camera lookAt dampening
    currentLookAt.current.lerp(targetLookAt.current, 0.06);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
