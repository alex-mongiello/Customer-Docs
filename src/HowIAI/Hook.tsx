import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {HandwrittenText} from './HandwrittenText';
import {FONT_HANDWRITING} from './fonts';

interface HookProps {
  opacity?: number;
}

export const Hook: React.FC<HookProps> = ({opacity = 1}) => {
  const frame = useCurrentFrame();

  // Underline draws under "this possible" after text completes
  const underlineProgress = interpolate(frame, [175, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', left: 80, top: 320, opacity}}>
      <div style={{position: 'relative'}}>
        <HandwrittenText
          text="She built a system that makes this possible."
          startFrame={120}
          endFrame={175}
          style={{
            fontFamily: FONT_HANDWRITING,
            fontSize: 24,
            color: '#57534E',
          }}
        />
        {/* Underline under "this possible" */}
        {frame >= 175 && (
          <svg
            width={200}
            height={6}
            style={{
              position: 'absolute',
              bottom: -4,
              right: 12,
            }}
          >
            <line
              x1={0}
              y1={3}
              x2={180}
              y2={3}
              stroke="#57534E"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray={180}
              strokeDashoffset={180 * (1 - underlineProgress)}
            />
          </svg>
        )}
      </div>
    </div>
  );
};
