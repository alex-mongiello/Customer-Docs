import React from 'react';
import {useCurrentFrame} from 'remotion';
import {HandwrittenText} from './HandwrittenText';
import {HighlighterSwipe} from './HighlighterSwipe';
import {FONT_DISPLAY, FONT_HANDWRITING} from './fonts';

const statLines = [
  {text: 'Team of 3.', start: 50, end: 75, font: FONT_DISPLAY, size: 30, bold: true},
  {text: '5,000 employees.', start: 70, end: 95, font: FONT_HANDWRITING, size: 28, bold: false},
  {text: '1,000s of customers.', start: 90, end: 120, font: FONT_HANDWRITING, size: 28, bold: false},
];

interface StatsProps {
  opacity?: number;
}

export const Stats: React.FC<StatsProps> = ({opacity = 1}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{position: 'absolute', left: 80, top: 190, opacity}}>
      {statLines.map((line, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          {/* Highlighter behind "Team of 3." */}
          {i === 0 && (
            <HighlighterSwipe
              startFrame={78}
              endFrame={90}
              width={190}
              height={20}
              style={{top: 8, left: -4, zIndex: 0}}
            />
          )}
          <HandwrittenText
            text={line.text}
            startFrame={line.start}
            endFrame={line.end}
            showCursor={frame >= line.start && frame < line.end + 15}
            style={{
              fontFamily: line.font,
              fontSize: line.size,
              fontWeight: line.bold ? 700 : 400,
              color: '#1C1917',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>
      ))}
    </div>
  );
};
