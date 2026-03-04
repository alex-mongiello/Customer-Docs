import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BG_GRADIENT, CORAL_RED } from '../theme';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = useMemo((): Particle[] => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3 + 1) * 1920,
      y: seededRandom(i * 3 + 2) * 1080,
      size: 2 + seededRandom(i * 3 + 3) * 4,
      speed: 0.3 + seededRandom(i * 3 + 4) * 0.7,
      phase: seededRandom(i * 3 + 5) * Math.PI * 2,
      opacity: 0.03 + seededRandom(i * 3 + 6) * 0.06,
    }));
  }, []);

  // Subtle vignette pulse
  const vignettePulse = 0.12 + Math.sin(frame * 0.02) * 0.02;

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: BG_GRADIENT,
        }}
      />

      {/* Subtle radial highlight in center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(254, 71, 89, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => {
        const t = (frame * p.speed * 0.01 + p.phase) % (Math.PI * 2);
        const driftX = Math.sin(t) * 30;
        const driftY = Math.cos(t * 0.7) * 20;
        const pulse = 0.7 + Math.sin(frame * 0.04 + p.phase) * 0.3;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x + driftX,
              top: p.y + driftY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: CORAL_RED,
              opacity: p.opacity * pulse,
              filter: `blur(${p.size * 0.5}px)`,
            }}
          />
        );
      })}

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(22, 3, 64, ${vignettePulse}) 100%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
