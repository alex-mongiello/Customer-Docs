import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { DEEP_INDIGO, MUTED_GRAY, CORAL_RED, FONT_PRIMARY, SHADOW_CARD_HOVER, SPRING_SMOOTH } from '../theme';

const CENTER_X = (1920 - 420) / 2;
const CENTER_Y = (1080 - 240) / 2;

interface LabelConfig {
  title: string;
  description: string;
  icon: string;
  startFrame: number;
  endFrame: number;
}

const LABELS: LabelConfig[] = [
  { title: 'Customer Quotes', description: 'Surface authentic voices from your customers', icon: '\u201C', startFrame: 30, endFrame: 50 },
  { title: 'Case Studies', description: 'Draft compelling stories automatically', icon: '\uD83D\uDCD6', startFrame: 50, endFrame: 70 },
  { title: 'G2 Reviews', description: 'Generate and manage review campaigns', icon: '\u2605', startFrame: 70, endFrame: 90 },
  { title: 'Impact Metrics', description: 'Quantify the impact of customer proof', icon: '\uD83D\uDCC8', startFrame: 90, endFrame: 110 },
  { title: 'Sales Proof', description: 'Arm your reps with the right proof, instantly', icon: '\uD83C\uDFAF', startFrame: 110, endFrame: 120 },
];

const PeerboundShield: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="48" y2="48">
        <stop offset="0%" stopColor={CORAL_RED} />
        <stop offset="100%" stopColor="#E03347" />
      </linearGradient>
    </defs>
    <path d="M24 4L6 12V22C6 33.1 13.8 43.4 24 46C34.2 43.4 42 33.1 42 22V12L24 4Z" fill="url(#shieldGrad)" opacity={0.12} />
    <path d="M24 8L10 14V22C10 31.2 16.2 39.8 24 42C31.8 39.8 38 31.2 38 22V14L24 8Z" stroke="url(#shieldGrad)" strokeWidth="1.5" fill="none" />
    <path d="M18 24L22 28L30 20" stroke={CORAL_RED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TransformEffect: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Convergence flash (frames 0-25)
  const convergeProgress = spring({ frame, fps: 30, config: SPRING_SMOOTH });
  const flashOpacity = interpolate(frame, [15, 20, 25], [0, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Card entrance
  const cardScale = interpolate(convergeProgress, [0, 1], [0.5, 1]);
  const cardOpacity = interpolate(convergeProgress, [0, 1], [0, 1]);

  // Subtle breathing
  const breathe = frame > 30 ? Math.sin(frame * 0.05) * 1.5 : 0;

  return (
    <AbsoluteFill>
      {/* Flash on convergence */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(254, 71, 89, ${flashOpacity}) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Centered premium card */}
      <div
        style={{
          position: 'absolute',
          left: CENTER_X,
          top: CENTER_Y,
          width: 420,
          height: 240,
          transform: `scale(${cardScale}) translateY(${breathe}px)`,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            boxShadow: SHADOW_CARD_HOVER,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Top gradient bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${CORAL_RED} 0%, #E03347 50%, ${CORAL_RED} 100%)`,
            }}
          />

          {/* Shield icon */}
          <div style={{ marginBottom: 12 }}>
            <PeerboundShield />
          </div>

          {/* Cycling labels */}
          {LABELS.map((label, i) => {
            const isLast = i === LABELS.length - 1;
            const fadeInStart = label.startFrame;
            const fadeInEnd = fadeInStart + 8;
            const fadeOutStart = isLast ? label.endFrame : label.endFrame - 8;
            const fadeOutEnd = isLast ? label.endFrame : label.endFrame;

            const inOpacity = interpolate(frame, [fadeInStart, fadeInEnd], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const outOpacity = isLast ? 1 : interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const opacity = Math.min(inOpacity, outOpacity);

            const inY = interpolate(frame, [fadeInStart, fadeInEnd], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const outY = isLast ? 0 : interpolate(frame, [fadeOutStart, fadeOutEnd], [0, -12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const translateY = frame < fadeOutStart ? inY : outY;

            const inScale = interpolate(frame, [fadeInStart, fadeInEnd], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            if (opacity <= 0) return null;

            return (
              <div
                key={label.title}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  opacity,
                  transform: `translateY(${translateY + 24}px) scale(${inScale})`,
                }}
              >
                <span style={{
                  fontFamily: FONT_PRIMARY,
                  fontSize: 22,
                  fontWeight: 700,
                  color: DEEP_INDIGO,
                  letterSpacing: -0.3,
                }}>
                  {label.icon} {label.title}
                </span>
                <span style={{
                  fontFamily: FONT_PRIMARY,
                  fontSize: 14,
                  color: MUTED_GRAY,
                  textAlign: 'center',
                  maxWidth: 320,
                  lineHeight: 1.4,
                }}>
                  {label.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
