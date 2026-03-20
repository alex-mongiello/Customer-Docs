import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

interface SVGDrawOnProps {
  d: string;
  pathLength: number;
  startFrame: number;
  endFrame: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  style?: React.CSSProperties;
}

export const SVGDrawOn: React.FC<SVGDrawOnProps> = ({
  d,
  pathLength,
  startFrame,
  endFrame,
  stroke = '#1C1917',
  strokeWidth = 2,
  fill = 'none',
  width = 100,
  height = 100,
  viewBox = '0 0 100 100',
  style = {},
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg width={width} height={height} viewBox={viewBox} style={style}>
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
    </svg>
  );
};
