import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CORAL_RED, CORAL_RED_LIGHT, FONT_PRIMARY, MUTED_GRAY, SPRING_SNAPPY } from '../theme';

const DOT_COUNT = 3;
const DOT_SIZE = 10;
const DOT_GAP = 16;
const SCENE_DURATION = 60;

export const ThinkingIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance
  const entranceProgress = spring({ frame, fps: 30, config: { ...SPRING_SNAPPY, damping: 16 } });
  const entranceY = interpolate(entranceProgress, [0, 1], [20, 0]);
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.8, 1]);

  // Exit
  const exitOpacity = interpolate(frame, [SCENE_DURATION - 15, SCENE_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitY = interpolate(frame, [SCENE_DURATION - 15, SCENE_DURATION], [0, -15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateY(${entranceY + exitY}px) scale(${entranceScale})`,
          opacity: entranceOpacity * exitOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Pill container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: DOT_GAP,
            padding: '14px 28px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 24,
            boxShadow: '0 4px 24px rgba(22, 3, 64, 0.06), 0 1px 4px rgba(22, 3, 64, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          {Array.from({ length: DOT_COUNT }).map((_, i) => {
            // Wave-style offset animation
            const waveOffset = i * 10;
            const wave = Math.sin((frame + waveOffset) * 0.18);
            const normalizedWave = (wave + 1) / 2; // 0 to 1
            const bounceY = -8 * normalizedWave;
            const scale = 1 + 0.25 * normalizedWave;
            const opacity = 0.4 + 0.6 * normalizedWave;

            return (
              <div
                key={i}
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${CORAL_RED} 0%, ${CORAL_RED_LIGHT} 100%)`,
                  transform: `translateY(${bounceY}px) scale(${scale})`,
                  opacity,
                  boxShadow: `0 ${2 + 4 * normalizedWave}px ${8 + 8 * normalizedWave}px rgba(254, 71, 89, ${0.2 + 0.15 * normalizedWave})`,
                }}
              />
            );
          })}
        </div>

        {/* Searching text */}
        <span
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 13,
            color: MUTED_GRAY,
            fontWeight: 500,
            letterSpacing: 0.5,
            opacity: 0.8,
          }}
        >
          Searching proof library...
        </span>
      </div>
    </AbsoluteFill>
  );
};
