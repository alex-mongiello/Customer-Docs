import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CORAL_RED, DEEP_INDIGO, FONT_PRIMARY, SHADOW_CARD, SPRING_GENTLE } from '../theme';

const TOTAL_DURATION = 150;

const TriangleLogo: React.FC = () => (
  <svg width="80" height="70" viewBox="0 0 80 70">
    <polygon points="40,0 80,70 0,70" fill={CORAL_RED} />
  </svg>
);

const PulseRing: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const ringFrame = Math.max(0, frame - startFrame);
  const duration = 40;
  const progress = Math.min(1, ringFrame / duration);
  const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

  const diameter = 60 + (500 - 60) * eased;
  const opacity = interpolate(progress, [0, 0.3, 1], [0.5, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strokeWidth = 2 - 1.5 * progress;

  if (ringFrame < 0 || ringFrame > duration) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '42%',
        width: diameter,
        height: diameter,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: `${strokeWidth}px solid ${CORAL_RED}`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

export const BrandClose: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Card fade out (frames 0-25)
  const cardOpacity = interpolate(frame, [0, 25], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardScale = interpolate(frame, [0, 25], [1, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardY = interpolate(frame, [0, 25], [0, -20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: Logo entrance (frames 25-50)
  const logoFrame = Math.max(0, frame - 25);
  const logoProgress = spring({ frame: logoFrame, fps: 30, config: SPRING_GENTLE });
  const logoScale = interpolate(logoProgress, [0, 1], [0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoRotation = interpolate(logoProgress, [0, 1], [-10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Wordmark (frames 35+)
  const wordmarkOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Mission statement (frames 55+)
  const missionOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const missionY = interpolate(frame, [55, 75], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit animation (last 30 frames)
  const exitStart = TOTAL_DURATION - 30;
  const exitOpacity = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitScale = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0.96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      {/* Fading card from previous scene */}
      {frame < 25 && (
        <div
          style={{
            position: 'absolute',
            left: (1920 - 340) / 2,
            top: (1080 - 200) / 2,
            width: 340,
            height: 200,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            boxShadow: SHADOW_CARD,
            borderLeft: `3px solid ${CORAL_RED}`,
            opacity: cardOpacity,
            transform: `scale(${cardScale}) translateY(${cardY}px)`,
          }}
        />
      )}

      {/* Pulse rings (behind logo) */}
      {[30, 45, 60, 75].map((start) => (
        <PulseRing key={start} frame={frame} startFrame={start} />
      ))}

      {/* Logo and text container */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          transform: `translate(-50%, -50%) scale(${exitScale})`,
          opacity: frame >= 25 ? exitOpacity : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Triangle logo */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            opacity: logoOpacity,
          }}
        >
          <TriangleLogo />
        </div>

        {/* Wordmark */}
        <span
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 28,
            fontWeight: 700,
            color: DEEP_INDIGO,
            letterSpacing: 6,
            opacity: wordmarkOpacity,
          }}
        >
          PEERBOUND
        </span>

        {/* Mission statement */}
        <div
          style={{
            opacity: missionOpacity,
            transform: `translateY(${missionY}px)`,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: FONT_PRIMARY, fontSize: 20, fontWeight: 400, color: DEEP_INDIGO, letterSpacing: 0.5 }}>
            <span style={{ color: CORAL_RED }}>Unlock</span> and{' '}
            <span style={{ color: CORAL_RED }}>amplify</span> the voices of your happy customers.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
