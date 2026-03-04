import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CORAL_RED, DEEP_INDIGO, MUTED_GRAY, FONT_PRIMARY } from '../theme';

interface Fragment {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  driftX: number;
  driftY: number;
  speed: number;
  icon: string;
  label: string;
  accentColor: string;
}

function seeded(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

const FRAGMENTS: Fragment[] = [
  { id: 1, width: 160, height: 56, x: 100, y: 90, rotation: -3, driftX: 18, driftY: -12, speed: 0.8, icon: '\u2605', label: '4.8 Stars', accentColor: CORAL_RED },
  { id: 2, width: 140, height: 48, x: 1640, y: 140, rotation: 2, driftX: -20, driftY: 8, speed: 1.0, icon: '\uD83C\uDFA4', label: 'Transcript', accentColor: '#7C5CFC' },
  { id: 3, width: 130, height: 52, x: 320, y: 890, rotation: -2, driftX: 12, driftY: -16, speed: 0.75, icon: '\u201C', label: 'Customer Quote', accentColor: CORAL_RED },
  { id: 4, width: 170, height: 56, x: 1380, y: 830, rotation: 3, driftX: -16, driftY: 20, speed: 0.9, icon: '\uD83D\uDCC8', label: '42% Reduction', accentColor: '#00C48C' },
  { id: 5, width: 120, height: 44, x: 880, y: 55, rotation: 1, driftX: 8, driftY: 14, speed: 1.1, icon: '\uD83D\uDCD6', label: 'Case Study', accentColor: '#4A90D9' },
  { id: 6, width: 150, height: 50, x: 160, y: 480, rotation: -4, driftX: -10, driftY: -8, speed: 0.85, icon: '\u2713', label: 'G2 Review', accentColor: '#FF6B35' },
  { id: 7, width: 110, height: 42, x: 1720, y: 520, rotation: 2, driftX: 22, driftY: -14, speed: 1.0, icon: '\uD83C\uDFAF', label: 'Win Rate', accentColor: '#7C5CFC' },
  { id: 8, width: 140, height: 48, x: 720, y: 940, rotation: -1, driftX: -8, driftY: 12, speed: 0.7, icon: '\uD83D\uDCCA', label: 'Metrics', accentColor: '#00C48C' },
  { id: 9, width: 160, height: 52, x: 1180, y: 280, rotation: 3, driftX: 16, driftY: -20, speed: 1.15, icon: '\uD83D\uDD0D', label: 'Proof Search', accentColor: CORAL_RED },
  { id: 10, width: 120, height: 44, x: 480, y: 330, rotation: -2, driftX: -14, driftY: 10, speed: 0.9, icon: '\uD83D\uDCDD', label: 'Evidence', accentColor: '#4A90D9' },
];

export const ScatteredProof: React.FC = () => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(
    frame,
    [0, 30, 150, 200, 600, 720, 840, 900],
    [0, 0.7, 0.7, 0.25, 0.25, 0.15, 0.15, 0.7],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity: containerOpacity }}>
      {FRAGMENTS.map((frag) => {
        const t = (frame / 900) * 2 * Math.PI * frag.speed;
        const offsetX = Math.sin(t) * frag.driftX;
        const offsetY = Math.cos(t * 0.7) * frag.driftY;
        const rotOffset = Math.sin(t * 0.5) * 1.5;

        // Staggered entrance
        const entranceDelay = frag.id * 3;
        const entranceOpacity = interpolate(frame, [entranceDelay, entranceDelay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const entranceScale = interpolate(frame, [entranceDelay, entranceDelay + 20], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        return (
          <div
            key={frag.id}
            style={{
              position: 'absolute',
              left: frag.x,
              top: frag.y,
              width: frag.width,
              height: frag.height,
              transform: `translate(${offsetX}px, ${offsetY}px) rotate(${frag.rotation + rotOffset}deg) scale(${entranceScale})`,
              opacity: entranceOpacity,
            }}
          >
            {/* Glassmorphism card */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 4px 16px rgba(22, 3, 64, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingLeft: 14,
                paddingRight: 14,
                overflow: 'hidden',
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: frag.accentColor,
                  borderRadius: '12px 0 0 12px',
                  opacity: 0.6,
                }}
              />

              {/* Icon */}
              <span style={{ fontSize: 16, opacity: 0.7, marginLeft: 4 }}>
                {frag.icon}
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: FONT_PRIMARY,
                  fontSize: 12,
                  fontWeight: 500,
                  color: DEEP_INDIGO,
                  opacity: 0.5,
                  letterSpacing: 0.3,
                  whiteSpace: 'nowrap',
                }}
              >
                {frag.label}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
