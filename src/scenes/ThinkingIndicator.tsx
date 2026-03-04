import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CORAL_RED, SPRING_SNAPPY } from '../theme';

const DOT_COUNT = 3;
const DOT_SIZE = 10;
const DOT_GAP = 14;
const SCENE_DURATION = 60;

export const ThinkingIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance (first 12 frames)
  const entranceProgress = spring({ frame, fps: 30, config: { ...SPRING_SNAPPY, damping: 16, mass: 0.6 } });
  const entranceY = interpolate(entranceProgress, [0, 1], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit (last 15 frames)
  const exitOpacity = interpolate(frame, [SCENE_DURATION - 15, SCENE_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitY = interpolate(frame, [SCENE_DURATION - 15, SCENE_DURATION], [0, -15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 500,
          transform: `translate(-50%, 0) translateY(${entranceY + exitY}px)`,
          opacity: entranceOpacity * exitOpacity,
          display: 'flex',
          gap: DOT_GAP,
        }}
      >
        {Array.from({ length: DOT_COUNT }).map((_, i) => {
          const offset = i * 8;
          const pulse = Math.max(0, Math.sin((frame + offset) * 0.15));
          const scale = 1 + 0.4 * pulse;
          const opacity = 0.5 + 0.5 * pulse;
          const glowSize = 8 + 8 * pulse;
          const glowAlpha = 0.3 + 0.2 * pulse;

          return (
            <div
              key={i}
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: '50%',
                backgroundColor: CORAL_RED,
                transform: `scale(${scale})`,
                opacity,
                boxShadow: `0 0 ${glowSize}px rgba(254, 71, 89, ${glowAlpha})`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
