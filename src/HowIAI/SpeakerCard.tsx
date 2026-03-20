import React from 'react';
import {useCurrentFrame, interpolate, spring} from 'remotion';
import {HandwrittenText} from './HandwrittenText';

const PATRICK_HAND = "'Patrick Hand SC', cursive";
const INDIE_FLOWER = "'Indie Flower', cursive";
const SPRING_SNAPPY = {fps: 30, damping: 14, mass: 0.6, stiffness: 130};

export const SpeakerCard: React.FC<{translateY?: number}> = ({
  translateY = 0,
}) => {
  const frame = useCurrentFrame();

  // Photo frame drops in (frames 180–210)
  const dropFrame = Math.max(0, frame - 180);
  const dropProgress = spring({frame: dropFrame, fps: 30, config: SPRING_SNAPPY});
  const frameY = interpolate(dropProgress, [0, 1], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const frameOpacity = interpolate(dropProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const frameShadow = interpolate(dropProgress, [0, 1], [2, 6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tape strip slaps on (frames 200–220)
  const tapeFrame = Math.max(0, frame - 200);
  const tapeProgress = spring({
    frame: tapeFrame,
    fps: 30,
    config: {damping: 10, mass: 0.5, stiffness: 200},
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 370,
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Photo frame */}
      <div style={{position: 'relative', opacity: frameOpacity}}>
        <div
          style={{
            width: 100,
            height: 110,
            backgroundColor: '#D5F0F0',
            borderRadius: 4,
            transform: `translateY(${frameY}px) rotate(-2deg)`,
            boxShadow: `0 ${frameShadow}px ${frameShadow * 2}px rgba(0,0,0,0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: '#78716C',
              opacity: interpolate(frame, [210, 220], [0, 0.6], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            PHOTO
          </span>
        </div>

        {/* Tape strip */}
        <div
          style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            width: 50,
            height: 16,
            backgroundColor: '#5CBFB5',
            opacity: 0.75,
            borderRadius: 2,
            transform: `translateX(-50%) scale(${tapeProgress}) rotate(2deg)`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Speaker info */}
      <div style={{paddingTop: 8}}>
        <HandwrittenText
          text="Crystal Anderson"
          startFrame={215}
          endFrame={235}
          style={{
            fontFamily: PATRICK_HAND,
            fontSize: 26,
            color: '#1C1917',
            display: 'block',
          }}
        />
        <HandwrittenText
          text="Customer Marketing & Advocacy"
          startFrame={230}
          endFrame={255}
          style={{
            fontFamily: INDIE_FLOWER,
            fontSize: 18,
            color: '#57534E',
            display: 'block',
            marginTop: 4,
          }}
        />
        <HandwrittenText
          text="Canva"
          startFrame={250}
          endFrame={262}
          style={{
            fontFamily: INDIE_FLOWER,
            fontSize: 22,
            fontWeight: 700,
            color: '#7C3AED',
            display: 'block',
            marginTop: 4,
          }}
        />
      </div>
    </div>
  );
};
