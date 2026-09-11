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
  const { mouse } = useThree();

  // Particle count based on device performance
  const count = isLowPower ? 1500 : 4000;

  // Generate target shapes for 5 scroll stages
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

    const copperBase = new THREE.Color('#D98C4A');
    const copperHighlight = new THREE.Color('#E8A85C');
    const copperDark = new THREE.Color('#B36A2A');
    const offWhite = new THREE.Color('#F4F1EA');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // --- Stage 1: HERO Turbulence Cloud (Sphere / Swirl) ---
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.5 + Math.random() * 4.5;

      heroArr[i3] = r * Math.sin(phi) * Math.cos(theta);
      heroArr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      heroArr[i3 + 2] = (Math.random() - 0.5) * 6;

      // Set initial positions to Hero
      posArr[i3] = heroArr[i3];
      posArr[i3 + 1] = heroArr[i3 + 1];
      posArr[i3 + 2] = heroArr[i3 + 2];

      // --- Stage 2: WORK Formations (UI Grid Frames & Wireframes) ---
      // Distribute particles across 4 project card wireframe outlines at y offsets
      const cardIndex = i % 4;
      const yBase = -6.0 - cardIndex * 4.5;
      const cardW = 4.2;
      const cardH = 2.6;

      if (i % 5 === 0) {
        // Outline perimeter of card
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
        // Floating UI node cloud inside card region
        workArr[i3] = (Math.random() - 0.5) * (cardW + 1.0);
        workArr[i3 + 1] = yBase + (Math.random() - 0.5) * (cardH + 1.0);
        workArr[i3 + 2] = (Math.random() - 0.5) * 2.0;
      }

      // --- Stage 3: EXPERTISE Orbital Streams (3 Horizontal Data Streams) ---
      const streamIdx = i % 3;
      const expY = -24.0 - streamIdx * 3.2;
      const streamRadius = 2.5 + Math.random() * 1.5;
      const streamAngle = (i / count) * Math.PI * 12 + streamIdx * (Math.PI * 2 / 3);

      expArr[i3] = Math.cos(streamAngle) * streamRadius;
      expArr[i3 + 1] = expY + (Math.random() - 0.5) * 0.6;
      expArr[i3 + 2] = Math.sin(streamAngle) * streamRadius * 0.6;

      // --- Stage 4: STUDIO 3-into-1 Core Merge ---
      // Particles start in 3 clusters at scroll transition, then collapse into 1 dense sphere core at y = -36
      const clusterIdx = i % 3;
      const clusterAngle = clusterIdx * ((Math.PI * 2) / 3);
      const distFromCenter = 0.8 + Math.random() * 1.2;

      studioArr[i3] = distFromCenter * Math.cos(clusterAngle) + (Math.random() - 0.5) * 1.2;
      studioArr[i3 + 1] = -36.0 + (Math.random() - 0.5) * 1.8;
      studioArr[i3 + 2] = distFromCenter * Math.sin(clusterAngle) + (Math.random() - 0.5) * 1.2;

      // --- Stage 5: BOOKING Hearth Ring ---
      // Large warm glowing ring surrounding the booking form at y = -46
      const ringAngle = Math.random() * Math.PI * 2;
      const ringR = 4.0 + Math.random() * 2.5;

      bookingArr[i3] = Math.cos(ringAngle) * ringR;
      bookingArr[i3 + 1] = -46.0 + (Math.random() - 0.5) * 2.0;
      bookingArr[i3 + 2] = Math.sin(ringAngle) * ringR;

      // --- Colors ---
      const randColor = Math.random();
      let chosenColor: THREE.Color;
      if (randColor > 0.85) {
        chosenColor = offWhite;
      } else if (randColor > 0.4) {
        chosenColor = copperHighlight;
      } else if (randColor > 0.15) {
        chosenColor = copperBase;
      } else {
        chosenColor = copperDark;
      }

      colorArr[i3] = chosenColor.r;
      colorArr[i3 + 1] = chosenColor.g;
      colorArr[i3 + 2] = chosenColor.b;

      // --- Sizes & Phases ---
      sizeArr[i] = 0.04 + Math.random() * 0.07;
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
    };
  }, [count]);

  // Buffer geometry setup
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  // Animation Loop
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const currentArray = positionAttr.array as Float32Array;

    // Mouse parallax offset (smooth dampening)
    const mouseX = mouse.x * 0.6;
    const mouseY = mouse.y * 0.6;

    // Calculate stage weights based on scrollProgress (0.0 to 1.0)
    // 0.0 - 0.15 : Hero
    // 0.15 - 0.45 : Work
    // 0.45 - 0.65 : Expertise
    // 0.65 - 0.80 : Studio
    // 0.80 - 1.00 : Booking

    let wHero = 0;
    let wWork = 0;
    let wExp = 0;
    let wStudio = 0;
    let wBooking = 0;

    const p = Math.max(0, Math.min(1, scrollProgress));

    if (p <= 0.15) {
      wHero = 1.0;
    } else if (p <= 0.45) {
      const t = (p - 0.15) / 0.30;
      wHero = 1.0 - t;
      wWork = t;
    } else if (p <= 0.65) {
      const t = (p - 0.45) / 0.20;
      wWork = 1.0 - t;
      wExp = t;
    } else if (p <= 0.80) {
      const t = (p - 0.65) / 0.15;
      wExp = 1.0 - t;
      wStudio = t;
    } else {
      const t = (p - 0.80) / 0.20;
      wStudio = 1.0 - t;
      wBooking = t;
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Organic turbulence offsets
      const turbX = Math.sin(time * 0.8 + phase) * 0.15;
      const turbY = Math.cos(time * 0.6 + phase * 1.5) * 0.15;
      const turbZ = Math.sin(time * 0.5 + phase * 2.0) * 0.15;

      // Studio special effect: merging 3 clusters into 1 core as studio weight increases
      let studioX = targetStudio[i3];
      let studioY = targetStudio[i3 + 1];
      let studioZ = targetStudio[i3 + 2];

      if (wStudio > 0.4) {
        // Collapse cluster positions towards center (0, -36, 0)
        const collapseFactor = 1.0 - (wStudio - 0.4) / 0.6;
        studioX *= collapseFactor;
        studioZ *= collapseFactor;
      }

      // Compute weighted target coordinate
      const targetX =
        targetHero[i3] * wHero +
        targetWork[i3] * wWork +
        targetExpertise[i3] * wExp +
        studioX * wStudio +
        targetBooking[i3] * wBooking +
        turbX +
        mouseX * (1.0 + (i % 3) * 0.3);

      const targetY =
        targetHero[i3 + 1] * wHero +
        targetWork[i3 + 1] * wWork +
        targetExpertise[i3 + 1] * wExp +
        studioY * wStudio +
        targetBooking[i3 + 1] * wBooking +
        turbY +
        mouseY * (1.0 + (i % 2) * 0.3);

      const targetZ =
        targetHero[i3 + 2] * wHero +
        targetWork[i3 + 2] * wWork +
        targetExpertise[i3 + 2] * wExp +
        studioZ * wStudio +
        targetBooking[i3 + 2] * wBooking +
        turbZ;

      // Smooth lerp towards target
      currentArray[i3] += (targetX - currentArray[i3]) * 0.08;
      currentArray[i3 + 1] += (targetY - currentArray[i3 + 1]) * 0.08;
      currentArray[i3 + 2] += (targetZ - currentArray[i3 + 2]) * 0.08;
    }

    positionAttr.needsUpdate = true;

    // Slow rotation of entire particle system for ambient life
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isLowPower ? 0.07 : 0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
