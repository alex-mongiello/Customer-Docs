import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {HandwrittenText} from './HandwrittenText';
import {HighlighterSwipe} from './HighlighterSwipe';
import {FONT_HANDWRITING} from './fonts';

const QUOTE_TEXT =
  'Start small and test out a theory or prompt and then start optimizing';

export const Quote: React.FC = () => {
  const frame = useCurrentFrame();

  // Quote fades in starting at frame 275 (after speaker card settles)
  const quoteOpacity = interpolate(frame, [275, 285], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 520,
        width: 860,
        opacity: quoteOpacity,
      }}
    >
      {/* Opening curly quote mark */}
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 80,
          color: '#D8D6D3',
          position: 'absolute',
          top: -40,
          left: -30,
          transform: 'rotate(-8deg)',
          opacity: 0.5,
        }}
      >
        {'\u201C'}
      </span>

      {/* Quote text */}
      <div style={{position: 'relative', paddingLeft: 10}}>
        <HandwrittenText
          text={QUOTE_TEXT}
          startFrame={280}
          endFrame={350}
          style={{
            fontFamily: FONT_HANDWRITING,
            fontSize: 28,
            color: '#1C1917',
            lineHeight: 1.6,
          }}
        />

        {/* Highlighter behind "start optimizing" */}
        <HighlighterSwipe
          startFrame={348}
          endFrame={358}
          width={230}
          height={18}
          style={{bottom: 4, right: 0, zIndex: -1}}
        />
      </div>

      {/* Closing curly quote mark */}
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 80,
          color: '#D8D6D3',
          position: 'absolute',
          bottom: -50,
          right: 20,
          transform: 'rotate(8deg)',
          opacity: 0.5,
        }}
      >
        {'\u201D'}
      </span>
    </div>
  );
};
