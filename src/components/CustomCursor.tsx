'use client';

import React, { useEffect, useState } from 'react';

export interface CursorState {
  type: 'default' | 'view' | 'send' | 'hover';
  text?: string;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile or touch device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check hovered element data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') as CursorState['type'];
        const text = cursorEl.getAttribute('data-cursor-text') || undefined;
        setCursorState({ type: type || 'hover', text });
      } else {
        setCursorState({ type: 'default' });
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  // Smooth lerp loop for trailing ring
  useEffect(() => {
    if (isMobile) return;

    let animId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.15),
        y: lerp(prev.y, position.y, 0.15),
      }));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [position, isMobile]);

  if (isMobile || !visible) return null;

  const isMorphBubble = cursorState.type === 'view' || cursorState.type === 'send';
  const labelText = cursorState.text || (cursorState.type === 'view' ? 'View' : cursorState.type === 'send' ? 'Send' : '');

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Sharp Dot */}
      <div
        className="fixed w-2.5 h-2.5 bg-[#E8A85C] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_#D98C4A]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isMorphBubble ? 0 : 1,
        }}
      />

      {/* Trailing Eased Ring / Bubble */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out border ${
          isMorphBubble
            ? 'w-16 h-16 bg-[#D98C4A]/25 backdrop-blur-md border-[#E8A85C]/60 scale-100 shadow-[0_0_20px_rgba(217,140,74,0.4)]'
            : cursorState.type === 'hover'
            ? 'w-12 h-12 bg-[#D98C4A]/10 border-[#E8A85C]/40 scale-110'
            : 'w-8 h-8 bg-transparent border-[#D98C4A]/40 scale-100'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {isMorphBubble && (
          <span className="text-xs font-mono font-bold tracking-wider text-[#F4F1EA] uppercase animate-pulse">
            {labelText}
          </span>
        )}
      </div>
    </div>
  );
};
