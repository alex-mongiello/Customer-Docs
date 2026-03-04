import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import {
  DEEP_INDIGO, WARM_GRAY, MUTED_GRAY, CORAL_RED, FONT_PRIMARY,
  SPRING_SNAPPY, SHADOW_SEARCH,
} from '../theme';

const QUERY_TEXT = 'Do we have any fintech customers who reduced churn?';
const CHARS_PER_FRAME = 1.5;
const TYPING_START = 30;
const TYPING_FRAMES = Math.ceil(QUERY_TEXT.length / CHARS_PER_FRAME);
const TYPING_END = TYPING_START + TYPING_FRAMES;
const CURSOR_HOLD_END = TYPING_END + 30;
const TOTAL_DURATION = 270;

const MagnifyingGlass: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="6" stroke={MUTED_GRAY} strokeWidth="2" />
    <line x1="13" y1="13" x2="18" y2="18" stroke={MUTED_GRAY} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SearchBar: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance animation (first 25 frames)
  const entranceProgress = spring({ frame, fps: 30, config: SPRING_SNAPPY });
  const entranceY = interpolate(entranceProgress, [0, 1], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Exit animation (last 30 frames)
  const exitStart = TOTAL_DURATION - 30;
  const exitOpacity = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitY = interpolate(frame, [exitStart, TOTAL_DURATION], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitScale = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0.96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Typing
  const typingFrame = Math.max(0, frame - TYPING_START);
  const numChars = Math.min(QUERY_TEXT.length, Math.floor(typingFrame * CHARS_PER_FRAME));
  const visibleText = QUERY_TEXT.substring(0, numChars);
  const typingDone = numChars >= QUERY_TEXT.length;

  // Cursor
  const cursorBlink = Math.sin(frame * 0.31) > 0 ? 1 : 0;
  const cursorVisible = frame >= TYPING_START && frame <= CURSOR_HOLD_END;
  const cursorFadeOut = interpolate(frame, [CURSOR_HOLD_END, CURSOR_HOLD_END + 10], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOpacity = cursorVisible ? cursorBlink * cursorFadeOut : 0;

  // Glow on completion
  const glowProgress = interpolate(frame, [TYPING_END, TYPING_END + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxShadow = glowProgress > 0
    ? `${SHADOW_SEARCH}, 0 4px 30px rgba(254, 71, 89, ${0.15 * glowProgress})`
    : SHADOW_SEARCH;
  const borderColor = glowProgress > 0
    ? `rgba(254, 71, 89, ${0.3 * glowProgress})`
    : WARM_GRAY;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '38%',
          transform: `translate(-50%, -50%) translateY(${entranceY + exitY}px) scale(${exitScale})`,
          opacity: entranceOpacity * exitOpacity,
          width: 720,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow,
          border: `1.5px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          gap: 14,
        }}
      >
        <MagnifyingGlass />
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: FONT_PRIMARY,
              fontSize: 18,
              color: DEEP_INDIGO,
              whiteSpace: 'nowrap',
            }}
          >
            {visibleText}
          </span>
          <div
            style={{
              width: 2,
              height: 22,
              backgroundColor: CORAL_RED,
              opacity: cursorOpacity,
              marginLeft: 1,
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
