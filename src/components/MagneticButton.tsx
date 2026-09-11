'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number; // Distance threshold in px
  magneticStrength?: number; // Fraction of translation (0 to 1)
  onClick?: () => void;
  cursorType?: 'default' | 'view' | 'send' | 'hover';
  cursorText?: string;
  as?: 'button' | 'div' | 'a';
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticRadius = 75,
  magneticStrength = 0.35,
  onClick,
  cursorType = 'hover',
  cursorText,
  as = 'button',
  href,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < magneticRadius) {
        // Translate element proportionally towards cursor
        const pullX = distX * magneticStrength;
        const pullY = distY * magneticStrength;
        setPosition({ x: pullX, y: pullY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [magneticRadius, magneticStrength]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.15s ease-out',
  };

  const Component = as;

  return (
    <div
      ref={ref}
      className="inline-block"
      style={style}
      data-cursor={cursorType}
      data-cursor-text={cursorText}
    >
      <Component
        onClick={onClick}
        href={href}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
};
