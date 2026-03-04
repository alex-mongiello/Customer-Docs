import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CORAL_RED, DEEP_INDIGO, FONT_PRIMARY, SPRING_GENTLE, SPRING_SMOOTH } from '../theme';

const TOTAL_DURATION = 150;

// Premium Peerbound logo — shield with checkmark
const PeerboundLogo: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="logoGrad" x1="10" y1="10" x2="70" y2="70">
        <stop offset="0%" stopColor={CORAL_RED} />
        <stop offset="100%" stopColor="#C8283A" />
      </linearGradient>
      <filter id="logoGlow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path
      d="M40 6L12 18V34C12 50.6 23.6 65.8 40 70C56.4 65.8 68 50.6 68 34V18L40 6Z"
      fill="url(#logoGrad)"
      filter="url(#logoGlow)"
    />
    <path
      d="M40 10L16 20V34C16 48.8 26 62.4 40 66C54 62.4 64 48.8 64 34V20L40 10Z"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
    />
    <path
      d="M28 40L36 48L52 32"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PulseRing: React.FC<{ frame: number; startFrame: number; maxDiameter: number }> = ({
  frame, startFrame, maxDiameter,
}) => {
  const ringFrame = Math.max(0, frame - startFrame);
  const duration = 50;
  const progress = Math.min(1, ringFrame / duration);
  const eased = 1 - Math.pow(1 - progress, 3);

  const diameter = 40 + (maxDiameter - 40) * eased;
  const opacity = interpolate(progress, [0, 0.15, 1], [0, 0.35, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const strokeWidth = 2 - 1.5 * progress;

  if (ringFrame < 0 || ringFrame > duration) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
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

  // Phase 1: Previous scene fade (frames 0-20)
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: Logo entrance (frames 15-40)
  const logoFrame = Math.max(0, frame - 15);
  const logoProgress = spring({ frame: logoFrame, fps: 30, config: SPRING_GENTLE });
  const logoScale = interpolate(logoProgress, [0, 1], [0.4, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoRotation = interpolate(logoProgress, [0, 1], [-8, 0]);

  // Wordmark (frames 30+)
  const wordmarkFrame = Math.max(0, frame - 30);
  const wordmarkProgress = spring({ frame: wordmarkFrame, fps: 30, config: SPRING_SMOOTH });
  const wordmarkOpacity = interpolate(wordmarkProgress, [0, 1], [0, 1]);
  const wordmarkY = interpolate(wordmarkProgress, [0, 1], [15, 0]);

  // Tagline (frames 50+)
  const taglineFrame = Math.max(0, frame - 50);
  const taglineProgress = spring({ frame: taglineFrame, fps: 30, config: SPRING_SMOOTH });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineProgress, [0, 1], [15, 0]);

  // URL (frames 65+)
  const urlOpacity = interpolate(frame, [65, 80], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit (last 30 frames)
  const exitStart = TOTAL_DURATION - 30;
  const exitOpacity = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitScale = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0.96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtle breathing
  const breathe = frame > 50 ? Math.sin(frame * 0.04) * 1.5 : 0;

  return (
    <AbsoluteFill>
      {/* Subtle radial glow behind logo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, rgba(254, 71, 89, ${0.06 * fadeIn}) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Pulse rings */}
      {[25, 38, 52, 66, 80].map((start) => (
        <PulseRing key={start} frame={frame} startFrame={start} maxDiameter={500} />
      ))}

      {/* Logo + text container */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          transform: `translate(-50%, -50%) scale(${exitScale}) translateY(${breathe}px)`,
          opacity: fadeIn * exitOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            opacity: logoOpacity,
            filter: `drop-shadow(0 4px 20px rgba(254, 71, 89, 0.25))`,
          }}
        >
          <PeerboundLogo size={80} />
        </div>

        {/* Wordmark */}
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `translateY(${wordmarkY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_PRIMARY,
              fontSize: 32,
              fontWeight: 800,
              color: DEEP_INDIGO,
              letterSpacing: 8,
            }}
          >
            PEERBOUND
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            maxWidth: 560,
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: FONT_PRIMARY, fontSize: 19, fontWeight: 400, color: DEEP_INDIGO, lineHeight: 1.6, letterSpacing: 0.3 }}>
            <span style={{ color: CORAL_RED, fontWeight: 600 }}>Unlock</span> and{' '}
            <span style={{ color: CORAL_RED, fontWeight: 600 }}>amplify</span> the voices{'\u00A0'}of{'\u00A0'}your happy customers.
          </span>
        </div>

        {/* URL */}
        <span
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 13,
            fontWeight: 500,
            color: DEEP_INDIGO,
            letterSpacing: 1.5,
            opacity: urlOpacity,
          }}
        >
          peerbound.com
        </span>
      </div>
    </AbsoluteFill>
  );
};
