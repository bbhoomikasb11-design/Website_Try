'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  scrollProgress: number;
  isLowPower?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  scrollProgress,
  isLowPower = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  // Total particle count
  const count = isLowPower ? 1600 : 4200;

  // Generate target geometries & 3 depth layers
  const {
    positions,
    targetHero,
    targetWork,
    targetExpertise,
    targetStudio,
    targetBooking,
    colors,
    sizes,
    phases,
    depthLayers,
  } = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const heroArr = new Float32Array(count * 3);
    const workArr = new Float32Array(count * 3);
    const expArr = new Float32Array(count * 3);
    const studioArr = new Float32Array(count * 3);
    const bookingArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    const sizeArr = new Float32Array(count);
    const phaseArr = new Float32Array(count);
    const layerArr = new Float32Array(count); // 0 = Far, 1 = Mid, 2 = Near

    const copperBase = new THREE.Color('#D98C4A');
    const copperHighlight = new THREE.Color('#E8A85C');
    const copperDark = new THREE.Color('#B36A2A');
    const offWhite = new THREE.Color('#F4F1EA');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Assign Depth Layer (0: Far 20%, 1: Mid 60%, 2: Near 20%)
      let layer = 1;
      if (i % 5 === 0) layer = 0; // Far
      else if (i % 5 === 4) layer = 2; // Near
      layerArr[i] = layer;

      // --- Stage 1: HERO Turbulence Cloud ---
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = layer === 0 ? 5.5 + Math.random() * 4.0 : layer === 2 ? 2.5 + Math.random() * 2.5 : 3.5 + Math.random() * 3.5;

      heroArr[i3] = r * Math.sin(phi) * Math.cos(theta);
      heroArr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      heroArr[i3 + 2] = layer === 0 ? -4 - Math.random() * 4 : layer === 2 ? 3 + Math.random() * 3 : (Math.random() - 0.5) * 4;

      posArr[i3] = heroArr[i3];
      posArr[i3 + 1] = heroArr[i3 + 1];
      posArr[i3 + 2] = heroArr[i3 + 2];

      // --- Stage 2: WORK Formations (UI Grid Wireframes) ---
      const cardIndex = i % 4;
      const yBase = -6.0 - cardIndex * 4.5;
      const cardW = 4.2;
      const cardH = 2.6;

      if (i % 6 === 0) {
        // Outline perimeter
        const edge = Math.random();
        if (edge < 0.25) {
          workArr[i3] = (Math.random() - 0.5) * cardW;
          workArr[i3 + 1] = yBase + cardH / 2;
        } else if (edge < 0.5) {
          workArr[i3] = (Math.random() - 0.5) * cardW;
          workArr[i3 + 1] = yBase - cardH / 2;
        } else if (edge < 0.75) {
          workArr[i3] = cardW / 2;
          workArr[i3 + 1] = yBase + (Math.random() - 0.5) * cardH;
        } else {
          workArr[i3] = -cardW / 2;
          workArr[i3 + 1] = yBase + (Math.random() - 0.5) * cardH;
        }
        workArr[i3 + 2] = (Math.random() - 0.5) * 0.8;
      } else {
        workArr[i3] = (Math.random() - 0.5) * (cardW + 1.2);
        workArr[i3 + 1] = yBase + (Math.random() - 0.5) * (cardH + 1.2);
        workArr[i3 + 2] = (Math.random() - 0.5) * 2.5;
      }

      // --- Stage 3: EXPERTISE Orbital Streams ---
      const streamIdx = i % 3;
      const expY = -24.0 - streamIdx * 3.2;
      const streamRadius = 2.5 + Math.random() * 1.5;
      const streamAngle = (i / count) * Math.PI * 12 + streamIdx * ((Math.PI * 2) / 3);

      expArr[i3] = Math.cos(streamAngle) * streamRadius;
      expArr[i3 + 1] = expY + (Math.random() - 0.5) * 0.6;
      expArr[i3 + 2] = Math.sin(streamAngle) * streamRadius * 0.6;

      // --- Stage 4: STUDIO 3-into-1 Merge ---
      const clusterIdx = i % 3;
      const clusterAngle = clusterIdx * ((Math.PI * 2) / 3);
      const distFromCenter = 1.0 + Math.random() * 1.2;

      studioArr[i3] = distFromCenter * Math.cos(clusterAngle) + (Math.random() - 0.5) * 1.2;
      studioArr[i3 + 1] = -36.0 + (Math.random() - 0.5) * 1.8;
      studioArr[i3 + 2] = distFromCenter * Math.sin(clusterAngle) + (Math.random() - 0.5) * 1.2;

      // --- Stage 5: BOOKING Hearth Ring ---
      const ringAngle = Math.random() * Math.PI * 2;
      const ringR = 4.2 + Math.random() * 2.5;

      bookingArr[i3] = Math.cos(ringAngle) * ringR;
      bookingArr[i3 + 1] = -46.0 + (Math.random() - 0.5) * 2.0;
      bookingArr[i3 + 2] = Math.sin(ringAngle) * ringR;

      // Color distribution
      const randColor = Math.random();
      let chosenColor: THREE.Color;
      if (randColor > 0.88) chosenColor = offWhite;
      else if (randColor > 0.45) chosenColor = copperHighlight;
      else if (randColor > 0.15) chosenColor = copperBase;
      else chosenColor = copperDark;

      colorArr[i3] = chosenColor.r;
      colorArr[i3 + 1] = chosenColor.g;
      colorArr[i3 + 2] = chosenColor.b;

      // Size based on depth layer
      sizeArr[i] =
        layer === 0
          ? 0.08 + Math.random() * 0.06 // Far: larger/softer
          : layer === 2
          ? 0.03 + Math.random() * 0.04 // Near: smaller/sharper
          : 0.05 + Math.random() * 0.05; // Mid

      phaseArr[i] = Math.random() * Math.PI * 2;
    }

    return {
      positions: posArr,
      targetHero: heroArr,
      targetWork: workArr,
      targetExpertise: expArr,
      targetStudio: studioArr,
      targetBooking: bookingArr,
      colors: colorArr,
      sizes: sizeArr,
      phases: phaseArr,
      depthLayers: layerArr,
    };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  // Animation Loop with Particle Repulsion Force
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentArray = positionAttr.array as Float32Array;

    // Convert mouse normalized coords to 3D world space target near current camera position
    const mouse3D = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Calculate stage weights
    let wHero = 0, wWork = 0, wExp = 0, wStudio = 0, wBooking = 0;
    if (p <= 0.15) {
      wHero = 1.0;
    } else if (p <= 0.45) {
      const t = (p - 0.15) / 0.3;
      wHero = 1.0 - t;
      wWork = t;
    } else if (p <= 0.65) {
      const t = (p - 0.45) / 0.2;
      wWork = 1.0 - t;
      wExp = t;
    } else if (p <= 0.8) {
      const t = (p - 0.65) / 0.15;
      wExp = 1.0 - t;
      wStudio = t;
    } else {
      const t = (p - 0.8) / 0.2;
      wStudio = 1.0 - t;
      wBooking = t;
    }

    const repulsionRadius = 2.8;
    const repulsionStrength = 1.2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      const layer = depthLayers[i];

      // Depth layer parallax multiplier
      const parallaxSpeed = layer === 0 ? 0.4 : layer === 2 ? 1.6 : 1.0;

      // Harmonic turbulence
      const turbX = Math.sin(time * 0.7 * parallaxSpeed + phase) * 0.12;
      const turbY = Math.cos(time * 0.5 * parallaxSpeed + phase * 1.5) * 0.12;
      const turbZ = Math.sin(time * 0.4 * parallaxSpeed + phase * 2.0) * 0.12;

      let studioX = targetStudio[i3];
      let studioY = targetStudio[i3 + 1];
      let studioZ = targetStudio[i3 + 2];

      if (wStudio > 0.4) {
        const collapseFactor = 1.0 - (wStudio - 0.4) / 0.6;
        studioX *= collapseFactor;
        studioZ *= collapseFactor;
      }

      // Base target position
      let targetX =
        targetHero[i3] * wHero +
        targetWork[i3] * wWork +
        targetExpertise[i3] * wExp +
        studioX * wStudio +
        targetBooking[i3] * wBooking +
        turbX;

      let targetY =
        targetHero[i3 + 1] * wHero +
        targetWork[i3 + 1] * wWork +
        targetExpertise[i3 + 1] * wExp +
        studioY * wStudio +
        targetBooking[i3 + 1] * wBooking +
        turbY;

      let targetZ =
        targetHero[i3 + 2] * wHero +
        targetWork[i3 + 2] * wWork +
        targetExpertise[i3 + 2] * wExp +
        studioZ * wStudio +
        targetBooking[i3 + 2] * wBooking +
        turbZ;

      // Compute 3D Cursor Repulsion Force (Particles drift away from cursor)
      const dx = currentArray[i3] - mouse3D.x;
      const dy = currentArray[i3 + 1] - (mouse3D.y - p * 40); // Account for camera scroll y offset
      const distSq = dx * dx + dy * dy;

      if (distSq < repulsionRadius * repulsionRadius && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const force = (repulsionRadius - dist) / repulsionRadius;
        const pushX = (dx / dist) * force * repulsionStrength;
        const pushY = (dy / dist) * force * repulsionStrength;

        targetX += pushX;
        targetY += pushY;
      }

      // Lerp position
      currentArray[i3] += (targetX - currentArray[i3]) * 0.08;
      currentArray[i3 + 1] += (targetY - currentArray[i3 + 1]) * 0.08;
      currentArray[i3 + 2] += (targetZ - currentArray[i3 + 2]) * 0.08;
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isLowPower ? 0.06 : 0.05}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
