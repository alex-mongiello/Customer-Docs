import React from 'react';
import {SVGDrawOn} from './SVGDrawOn';

// A hand-drawn heart SVG path
const HEART_PATH =
  'M 25 45 C 25 45, 5 30, 5 18 C 5 8, 12 2, 20 6 C 24 8, 25 14, 25 14 C 25 14, 26 8, 30 6 C 38 2, 45 8, 45 18 C 45 30, 25 45, 25 45 Z';

export const DoodleHeart: React.FC = () => {
  return (
    <div style={{position: 'absolute', left: 76, top: 130}}>
      <SVGDrawOn
        d={HEART_PATH}
        pathLength={140}
        startFrame={20}
        endFrame={50}
        stroke="#F9A8D4"
        strokeWidth={2}
        fill="none"
        width={50}
        height={50}
        viewBox="0 0 50 50"
      />
    </div>
  );
};
