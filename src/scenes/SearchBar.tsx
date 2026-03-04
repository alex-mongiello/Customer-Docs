import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import {
  DEEP_INDIGO, WARM_GRAY, MUTED_GRAY, CORAL_RED, FONT_PRIMARY,
  SPRING_SNAPPY, SHADOW_SEARCH, SHADOW_GLOW,
} from '../theme';

const QUERY_TEXT = 'Do we have any fintech customers who reduced churn?';
const CHARS_PER_FRAME = 1.5;
const TYPING_START = 30;
const TYPING_FRAMES = Math.ceil(QUERY_TEXT.length / CHARS_PER_FRAME);
const TYPING_END = TYPING_START + TYPING_FRAMES;
const CURSOR_HOLD_END = TYPING_END + 30;
const TOTAL_DURATION = 270;

const MagnifyingGlass: React.FC<{ glowProgress: number }> = ({ glowProgress }) => {
  const strokeColor = interpolate(glowProgress, [0, 1], [0, 1]);
  const color = strokeColor > 0.5 ? CORAL_RED : MUTED_GRAY;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="9.5" cy="9.5" r="6.5" stroke={color} strokeWidth="2" />
      <line x1="14.5" y1="14.5" x2="19.5" y2="19.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const SearchBar: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance spring
  const entranceProgress = spring({ frame, fps: 30, config: SPRING_SNAPPY });
  const entranceY = interpolate(entranceProgress, [0, 1], [50, 0]);
  const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const entranceScale = interpolate(entranceProgress, [0, 1], [0.96, 1]);

  // Exit
  const exitStart = TOTAL_DURATION - 30;
  const exitOpacity = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitY = interpolate(frame, [exitStart, TOTAL_DURATION], [0, -30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitScale = interpolate(frame, [exitStart, TOTAL_DURATION], [1, 0.97], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Typing
  const typingFrame = Math.max(0, frame - TYPING_START);
  const numChars = Math.min(QUERY_TEXT.length, Math.floor(typingFrame * CHARS_PER_FRAME));
  const visibleText = QUERY_TEXT.substring(0, numChars);
  const typingDone = numChars >= QUERY_TEXT.length;

  // Cursor
  const cursorBlink = Math.sin(frame * 0.35) > 0 ? 1 : 0;
  const isTyping = frame >= TYPING_START && !typingDone;
  const cursorVisible = frame >= TYPING_START && frame <= CURSOR_HOLD_END;
  const cursorFadeOut = interpolate(frame, [CURSOR_HOLD_END - 10, CURSOR_HOLD_END], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOpacity = cursorVisible ? (isTyping ? 1 : cursorBlink) * cursorFadeOut : 0;

  // Glow on completion
  const glowProgress = interpolate(frame, [TYPING_END, TYPING_END + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const borderColor = glowProgress > 0
    ? `rgba(254, 71, 89, ${0.4 * glowProgress})`
    : 'rgba(22, 3, 64, 0.08)';

  const boxShadow = glowProgress > 0
    ? `${SHADOW_SEARCH}, 0 0 ${30 * glowProgress}px rgba(254, 71, 89, ${0.12 * glowProgress}), 0 0 ${60 * glowProgress}px rgba(254, 71, 89, ${0.06 * glowProgress})`
    : SHADOW_SEARCH;

  // Subtle idle breathing when not typing
  const breathe = typingDone ? Math.sin(frame * 0.06) * 0.5 : 0;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '38%',
          transform: `translate(-50%, -50%) translateY(${entranceY + exitY + breathe}px) scale(${entranceScale * exitScale})`,
          opacity: entranceOpacity * exitOpacity,
          width: 720,
          height: 62,
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          boxShadow,
          border: `1.5px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 22,
          paddingRight: 22,
          gap: 14,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <MagnifyingGlass glowProgress={glowProgress} />

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Placeholder text */}
          {numChars === 0 && frame < TYPING_START && (
            <span
              style={{
                fontFamily: FONT_PRIMARY,
                fontSize: 17,
                color: MUTED_GRAY,
                opacity: 0.6,
                whiteSpace: 'nowrap',
              }}
            >
              Search customer proof...
            </span>
          )}

          {/* Typed text */}
          <span
            style={{
              fontFamily: FONT_PRIMARY,
              fontSize: 17,
              color: DEEP_INDIGO,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              letterSpacing: 0.1,
            }}
          >
            {visibleText}
          </span>

          {/* Cursor */}
          <div
            style={{
              width: 2,
              height: 22,
              backgroundColor: CORAL_RED,
              opacity: cursorOpacity,
              marginLeft: 1,
              flexShrink: 0,
              borderRadius: 1,
            }}
          />
        </div>

        {/* Subtle send button appears on completion */}
        {glowProgress > 0 && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${CORAL_RED} 0%, #E03347 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: glowProgress,
              transform: `scale(${interpolate(glowProgress, [0, 1], [0.7, 1])})`,
              boxShadow: `0 2px 12px rgba(254, 71, 89, ${0.3 * glowProgress})`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M9 3L14 8L9 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
