import React from 'react';
import {SVGDrawOn} from './SVGDrawOn';

// A simple hand-drawn lightbulb
const LIGHTBULB_PATH =
  'M 20 8 C 20 2, 28 -2, 34 2 C 40 6, 42 14, 36 22 C 34 26, 32 28, 32 32 L 24 32 C 24 28, 22 26, 20 22 C 14 14, 14 8, 20 8 Z M 24 34 L 32 34 M 25 37 L 31 37';

// Rays around the bulb
const RAYS_PATH =
  'M 28 -2 L 28 -8 M 40 4 L 46 0 M 44 16 L 50 16 M 12 4 L 6 0 M 8 16 L 2 16';

export const DoodleLightbulb: React.FC = () => {
  return (
    <div style={{position: 'absolute', left: 340, top: 400}}>
      <SVGDrawOn
        d={LIGHTBULB_PATH}
        pathLength={160}
        startFrame={255}
        endFrame={275}
        stroke="#78716C"
        strokeWidth={2}
        width={56}
        height={48}
        viewBox="0 0 56 48"
      />
      <svg
        width={56}
        height={48}
        viewBox="0 0 56 48"
        style={{position: 'absolute', top: 0, left: 0}}
      >
        {/* Rays will be drawn by separate SVGDrawOn but we layer them */}
      </svg>
      <SVGDrawOn
        d={RAYS_PATH}
        pathLength={80}
        startFrame={268}
        endFrame={280}
        stroke="#FEF9C3"
        strokeWidth={2}
        width={56}
        height={48}
        viewBox="0 0 56 48"
        style={{position: 'absolute', top: 0, left: 0}}
      />
    </div>
  );
};
