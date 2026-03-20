import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

interface HandwrittenTextProps {
  text: string;
  startFrame: number;
  endFrame: number;
  style?: React.CSSProperties;
  showCursor?: boolean;
  cursorColor?: string;
}

export const HandwrittenText: React.FC<HandwrittenTextProps> = ({
  text,
  startFrame,
  endFrame,
  style = {},
  showCursor = true,
  cursorColor = '#1C1917',
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.floor(
    interpolate(frame, [startFrame, endFrame], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  const visibleText = text.substring(0, charsToShow);
  const isTyping = frame >= startFrame && charsToShow < text.length;
  const justFinished = charsToShow >= text.length && frame < endFrame + 20;

  const cursorBlink = Math.sin(frame * 0.35) > 0 ? 1 : 0;
  const cursorFadeOut = interpolate(
    frame,
    [endFrame + 10, endFrame + 25],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const cursorOpacity =
    showCursor && (isTyping || justFinished)
      ? (isTyping ? 1 : cursorBlink) * cursorFadeOut
      : 0;

  if (frame < startFrame) return null;

  return (
    <span style={{display: 'inline-flex', alignItems: 'baseline', ...style}}>
      <span>{visibleText}</span>
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '0.85em',
          backgroundColor: cursorColor,
          opacity: cursorOpacity,
          marginLeft: 1,
          verticalAlign: 'baseline',
          flexShrink: 0,
        }}
      />
    </span>
  );
};
