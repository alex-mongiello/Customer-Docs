import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';

interface PageFlipProps {
  flipStartFrame: number;
  flipEndFrame: number;
  frontPage: React.ReactNode;
  backPage: React.ReactNode;
}

export const PageFlip: React.FC<PageFlipProps> = ({
  flipStartFrame,
  flipEndFrame,
  frontPage,
  backPage,
}) => {
  const frame = useCurrentFrame();

  const flipProgress = interpolate(
    frame,
    [flipStartFrame, flipEndFrame],
    [0, -180],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  );

  const isFlipping = frame >= flipStartFrame;
  const isFlipped = flipProgress <= -90;

  return (
    <div
      style={{
        position: 'absolute',
        width: 1080,
        height: 1080,
        perspective: 1200,
      }}
    >
      {/* Front page (page 1) */}
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1080,
          transformOrigin: 'left center',
          transform: isFlipping
            ? `rotateY(${flipProgress}deg)`
            : undefined,
          backfaceVisibility: 'hidden',
          zIndex: isFlipped ? 0 : 1,
        }}
      >
        {frontPage}
      </div>

      {/* Back page (page 2 / CTA) */}
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1080,
          zIndex: isFlipped ? 1 : 0,
        }}
      >
        {backPage}
      </div>
    </div>
  );
};
