import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { MUTED_GRAY, LIGHT_GRAY, FONT_PRIMARY } from '../theme';

interface Fragment {
  id: number;
  width: number;
  height: number;
  initialX: number;
  initialY: number;
  driftX: number;
  driftY: number;
  driftSpeed: number;
  label?: string;
}

const FRAGMENTS: Fragment[] = [
  { id: 1, width: 140, height: 50, initialX: 120, initialY: 80, driftX: 20, driftY: -15, driftSpeed: 0.9, label: '★★★★★' },
  { id: 2, width: 100, height: 40, initialX: 1650, initialY: 150, driftX: -25, driftY: 10, driftSpeed: 1.1, label: 'transcript' },
  { id: 3, width: 120, height: 45, initialX: 350, initialY: 920, driftX: 15, driftY: -20, driftSpeed: 0.85, label: '\u201C' },
  { id: 4, width: 160, height: 55, initialX: 1400, initialY: 850, driftX: -20, driftY: 25, driftSpeed: 1.0, label: '42%' },
  { id: 5, width: 90, height: 35, initialX: 900, initialY: 60, driftX: 10, driftY: 18, driftSpeed: 1.15, label: 'case study' },
  { id: 6, width: 140, height: 50, initialX: 200, initialY: 500, driftX: -15, driftY: -10, driftSpeed: 0.95, label: 'review' },
  { id: 7, width: 120, height: 45, initialX: 1700, initialY: 530, driftX: 25, driftY: -20, driftSpeed: 1.05 },
  { id: 8, width: 100, height: 40, initialX: 750, initialY: 950, driftX: -10, driftY: 15, driftSpeed: 0.8 },
  { id: 9, width: 160, height: 55, initialX: 1200, initialY: 300, driftX: 20, driftY: -25, driftSpeed: 1.2 },
  { id: 10, width: 90, height: 35, initialX: 500, initialY: 350, driftX: -18, driftY: 12, driftSpeed: 0.9 },
];

export const ScatteredProof: React.FC = () => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(
    frame,
    [0, 150, 180, 600, 720, 840, 900],
    [0.6, 0.6, 0.2, 0.2, 0.1, 0.1, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fragments = useMemo(() => FRAGMENTS, []);

  return (
    <AbsoluteFill style={{ opacity: containerOpacity }}>
      {fragments.map((frag) => {
        const offsetX = Math.sin((frame / 900) * 2 * Math.PI * frag.driftSpeed) * frag.driftX;
        const offsetY = Math.cos((frame / 900) * 2 * Math.PI * frag.driftSpeed * 0.7) * frag.driftY;

        return (
          <div
            key={frag.id}
            style={{
              position: 'absolute',
              left: frag.initialX,
              top: frag.initialY,
              width: frag.width,
              height: frag.height,
              backgroundColor: MUTED_GRAY,
              opacity: 0.5,
              borderRadius: 10,
              border: `1px solid ${LIGHT_GRAY}`,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {frag.label && (
              <span
                style={{
                  fontFamily: FONT_PRIMARY,
                  fontSize: 11,
                  color: LIGHT_GRAY,
                  opacity: 0.4,
                  userSelect: 'none',
                }}
              >
                {frag.label}
              </span>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
