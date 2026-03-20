import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

interface HighlighterSwipeProps {
  startFrame: number;
  endFrame: number;
  width: number;
  height?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

export const HighlighterSwipe: React.FC<HighlighterSwipeProps> = ({
  startFrame,
  endFrame,
  width,
  height = 18,
  color = '#F9A8D4',
  opacity = 0.35,
  rotation = -0.8,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        width: width * progress,
        height,
        backgroundColor: color,
        borderRadius: 4,
        opacity,
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    />
  );
};
