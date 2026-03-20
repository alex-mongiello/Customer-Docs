import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_DISPLAY, FONT_HANDWRITING, FONT_LABEL} from './fonts';

export const CTAPage: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FEFCF8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* Intro line */}
      <p
        style={{
          fontFamily: FONT_HANDWRITING,
          fontSize: 28,
          color: '#57534E',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        She&apos;s sharing how.{' '}
        <span style={{color: '#FF4044', fontWeight: 700}}>April 24.</span>
      </p>

      {/* Main header */}
      <div style={{position: 'relative', marginBottom: 24}}>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 64,
            color: '#1C1917',
            letterSpacing: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          How I AI
        </h1>
        {/* Yellow highlight under "AI" */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: -4,
            width: 90,
            height: 20,
            backgroundColor: '#FEF9C3',
            borderRadius: 4,
            opacity: 0.7,
            zIndex: 0,
          }}
        />
      </div>

      {/* Time */}
      <p
        style={{
          fontFamily: FONT_HANDWRITING,
          fontSize: 24,
          color: '#1C1917',
          marginBottom: 28,
        }}
      >
        12pm PT / 3pm ET
      </p>

      {/* Register button */}
      <div
        style={{
          backgroundColor: '#FF4044',
          color: '#FFFFFF',
          fontFamily: FONT_LABEL,
          fontSize: 20,
          fontWeight: 700,
          paddingLeft: 36,
          paddingRight: 36,
          paddingTop: 14,
          paddingBottom: 14,
          borderRadius: 30,
          transform: 'rotate(-1deg)',
          boxShadow: '0 4px 16px rgba(255, 64, 68, 0.3)',
          letterSpacing: 0.5,
        }}
      >
        Register free →
      </div>

      {/* Details */}
      <p
        style={{
          fontFamily: FONT_LABEL,
          fontSize: 14,
          fontWeight: 500,
          color: '#78716C',
          marginTop: 24,
          letterSpacing: 1,
        }}
      >
        Free · Virtual · 45 min
      </p>

      {/* Peerbound watermark */}
      <p
        style={{
          fontFamily: FONT_LABEL,
          fontSize: 11,
          fontWeight: 700,
          color: '#D8D6D3',
          letterSpacing: 5,
          marginTop: 60,
        }}
      >
        PEERBOUND
      </p>
    </AbsoluteFill>
  );
};
