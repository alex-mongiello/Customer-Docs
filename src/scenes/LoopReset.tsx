import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BG_GRADIENT } from '../theme';

export const LoopReset: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade overlay to match the background gradient for seamless loop
  const opacity = interpolate(frame, [0, 40, 60], [0, 0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};
