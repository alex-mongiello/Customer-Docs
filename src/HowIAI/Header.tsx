import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {SVGDrawOn} from './SVGDrawOn';
import {FONT_DISPLAY} from './fonts';

// SVG paths for spark/emphasis lines near "AI"
const SparkLines: React.FC<{startFrame: number}> = ({startFrame}) => {
  const frame = useCurrentFrame();
  const sparks = [
    {x1: 0, y1: 8, x2: 12, y2: 0, delay: 0},
    {x1: 6, y1: 0, x2: 6, y2: 14, delay: 3},
    {x1: 0, y1: 4, x2: 14, y2: 10, delay: 6},
  ];

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{position: 'absolute', right: -28, top: -8}}
    >
      {sparks.map((s, i) => {
        const progress = interpolate(
          frame,
          [startFrame + s.delay, startFrame + s.delay + 10],
          [0, 1],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        const len = Math.sqrt(
          (s.x2 - s.x1) ** 2 + (s.y2 - s.y1) ** 2,
        );
        return (
          <line
            key={i}
            x1={s.x1 + 5}
            y1={s.y1 + 5}
            x2={s.x2 + 5}
            y2={s.y2 + 5}
            stroke="#F9A8D4"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={len}
            strokeDashoffset={len * (1 - progress)}
          />
        );
      })}
    </svg>
  );
};

export const Header: React.FC = () => {
  const frame = useCurrentFrame();

  // Letter-by-letter reveal for "HOW I AI" with jitter
  const headerText = 'HOW I AI';
  const letterTimings = headerText.split('').map((_, i) => {
    const jitter = ((i * 7 + 3) % 5) - 2; // deterministic pseudo-random jitter
    return 5 + i * 6 + jitter;
  });

  // Circle around "AI" draws from frame 35–55
  const circleD =
    'M 2 18 C 2 6, 20 -2, 48 4 C 70 8, 72 28, 50 34 C 28 40, -4 32, 2 18 Z';

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 60,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Header text with letter-by-letter reveal */}
      <div style={{position: 'relative', display: 'inline-block'}}>
        <span
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 58,
            color: '#1C1917',
            letterSpacing: 3,
            position: 'relative',
          }}
        >
          {headerText.split('').map((char, i) => {
            const charProgress = interpolate(
              frame,
              [letterTimings[i], letterTimings[i] + 4],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

            return (
              <span
                key={i}
                style={{
                  opacity: charProgress,
                  display: 'inline-block',
                  transform: `translateY(${(1 - charProgress) * 8}px)`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>

        {/* Pink circle around "AI" (last 2 visible chars, positioned over them) */}
        <div style={{position: 'absolute', right: -10, top: 4}}>
          <SVGDrawOn
            d={circleD}
            pathLength={180}
            startFrame={35}
            endFrame={55}
            stroke="#F9A8D4"
            strokeWidth={2.5}
            fill="none"
            width={74}
            height={44}
            viewBox="0 0 74 44"
          />
        </div>

        {/* Spark lines near AI */}
        <SparkLines startFrame={45} />
      </div>
    </div>
  );
};
