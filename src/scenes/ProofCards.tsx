import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ProofCard, CardType } from '../components/ProofCard';
import { SPRING_BOUNCY } from '../theme';

interface CardConfig {
  type: CardType;
  x: number;
  y: number;
  delay: number;
}

const GRID_WIDTH = 704; // 340 + 24 + 340
const GRID_HEIGHT = 424; // 200 + 24 + 200
const LEFT = (1920 - GRID_WIDTH) / 2;
const TOP = (1080 - GRID_HEIGHT) / 2;

export const CARD_POSITIONS: CardConfig[] = [
  { type: 'quote', x: LEFT, y: TOP, delay: 0 },
  { type: 'case-study', x: LEFT + 364, y: TOP, delay: 10 },
  { type: 'review', x: LEFT, y: TOP + 224, delay: 20 },
  { type: 'metric', x: LEFT + 364, y: TOP + 224, delay: 30 },
];

export const ProofCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Overall exit (last 30 frames)
  const exitOpacity = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {CARD_POSITIONS.map((card) => {
        const cardFrame = Math.max(0, frame - card.delay);
        const progress = spring({ frame: cardFrame, fps: 30, config: SPRING_BOUNCY });
        const translateY = interpolate(progress, [0, 1], [80, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scale = interpolate(progress, [0, 1], [0.88, 1]);

        // Subtle floating after arrival
        const floatFrame = Math.max(0, cardFrame - 20);
        const floatY = floatFrame > 0 ? Math.sin(floatFrame * 0.04 + card.delay * 0.5) * 2 : 0;

        return (
          <div
            key={card.type}
            style={{
              position: 'absolute',
              left: card.x,
              top: card.y,
              transform: `translateY(${translateY + floatY}px) scale(${scale})`,
              opacity,
            }}
          >
            <ProofCard type={card.type} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
