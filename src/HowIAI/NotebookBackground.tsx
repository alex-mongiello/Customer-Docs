import React from 'react';
import {AbsoluteFill} from 'remotion';

const LINE_SPACING = 32;
const MARGIN_LEFT = 48;
const HOLE_PUNCH_X = 24;
const HOLE_PUNCH_RADIUS = 8;
const HOLE_POSITIONS = [200, 540, 880];

export const NotebookBackground: React.FC = () => {
  const lines: React.ReactNode[] = [];
  for (let y = 80; y < 1080; y += LINE_SPACING) {
    lines.push(
      <line
        key={y}
        x1={0}
        y1={y}
        x2={1080}
        y2={y}
        stroke="#A8C4E0"
        strokeWidth={0.7}
        opacity={0.12}
      />,
    );
  }

  return (
    <AbsoluteFill>
      {/* Paper background */}
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1080,
          backgroundColor: '#FEFCF8',
        }}
      />

      {/* Subtle paper grain texture */}
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1080,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.5,
        }}
      />

      {/* Ruled lines */}
      <svg
        width={1080}
        height={1080}
        style={{position: 'absolute', top: 0, left: 0}}
      >
        {lines}
      </svg>

      {/* Margin line */}
      <div
        style={{
          position: 'absolute',
          left: MARGIN_LEFT,
          top: 0,
          width: 1.5,
          height: 1080,
          backgroundColor: '#E8A0A0',
          opacity: 0.35,
        }}
      />

      {/* Hole punches */}
      <svg
        width={1080}
        height={1080}
        style={{position: 'absolute', top: 0, left: 0}}
      >
        {HOLE_POSITIONS.map((y) => (
          <circle
            key={y}
            cx={HOLE_PUNCH_X}
            cy={y}
            r={HOLE_PUNCH_RADIUS}
            fill="#E8E6E3"
            stroke="#D5D3D0"
            strokeWidth={1}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
