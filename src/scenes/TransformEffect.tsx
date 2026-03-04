import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { ProofCard, CardType } from '../components/ProofCard';
import { CARD_POSITIONS } from './ProofCards';
import { DEEP_INDIGO, MUTED_GRAY, CORAL_RED, FONT_PRIMARY, SHADOW_CARD, SPRING_SMOOTH } from '../theme';

const CENTER_X = (1920 - 340) / 2;
const CENTER_Y = (1080 - 200) / 2;

interface LabelConfig {
  title: string;
  description: string;
  startFrame: number;
  endFrame: number;
}

const LABELS: LabelConfig[] = [
  { title: 'Customer Quotes', description: 'Surface authentic voices from your customers', startFrame: 35, endFrame: 55 },
  { title: 'Case Studies', description: 'Draft compelling stories automatically', startFrame: 55, endFrame: 75 },
  { title: 'G2 Reviews', description: 'Generate and manage review campaigns', startFrame: 75, endFrame: 95 },
  { title: 'Impact Metrics', description: 'Quantify the impact of customer proof', startFrame: 95, endFrame: 115 },
  { title: 'Sales Proof', description: 'Arm your reps with the right proof, instantly', startFrame: 115, endFrame: 120 },
];

export const TransformEffect: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Cards converge (frames 0-30)
  const convergeProgress = spring({ frame, fps: 30, config: SPRING_SMOOTH });

  // Phase 2: Label cycling (frames 35+)
  const showLabels = frame >= 35;

  return (
    <AbsoluteFill>
      {/* Converging cards */}
      {frame < 35 && CARD_POSITIONS.map((card, i) => {
        const targetX = CENTER_X;
        const targetY = CENTER_Y;
        const currentX = interpolate(convergeProgress, [0, 1], [card.x, targetX], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const currentY = interpolate(convergeProgress, [0, 1], [card.y, targetY], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const opacity = i === 0
          ? 1
          : interpolate(convergeProgress, [0, 0.7, 1], [1, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const scale = interpolate(convergeProgress, [0, 0.5, 1], [1, 1.05, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        return (
          <div
            key={card.type}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <ProofCard type={card.type} />
          </div>
        );
      })}

      {/* Centered card with cycling labels */}
      {showLabels && (
        <div
          style={{
            position: 'absolute',
            left: CENTER_X,
            top: CENTER_Y,
            width: 340,
            height: 200,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            boxShadow: SHADOW_CARD,
            borderLeft: `3px solid ${CORAL_RED}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          {LABELS.map((label, i) => {
            const isLast = i === LABELS.length - 1;
            const fadeInStart = label.startFrame;
            const fadeInEnd = fadeInStart + 8;
            const fadeOutStart = isLast ? label.endFrame : label.endFrame - 8;
            const fadeOutEnd = isLast ? label.endFrame : label.endFrame;

            const inOpacity = interpolate(frame, [fadeInStart, fadeInEnd], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const outOpacity = isLast ? 1 : interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const opacity = Math.min(inOpacity, outOpacity);

            const inY = interpolate(frame, [fadeInStart, fadeInEnd], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const outY = isLast ? 0 : interpolate(frame, [fadeOutStart, fadeOutEnd], [0, -15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const translateY = frame < fadeOutStart ? inY : outY;

            if (opacity <= 0) return null;

            return (
              <div
                key={label.title}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <span style={{ fontFamily: FONT_PRIMARY, fontSize: 22, fontWeight: 600, color: DEEP_INDIGO }}>
                  {label.title}
                </span>
                <span style={{ fontFamily: FONT_PRIMARY, fontSize: 13, color: MUTED_GRAY, textAlign: 'center', maxWidth: 280 }}>
                  {label.description}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
