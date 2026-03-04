import React from 'react';
import { CORAL_RED, CORAL_RED_LIGHT, DEEP_INDIGO, MUTED_GRAY, FONT_PRIMARY, SHADOW_CARD } from '../theme';

export type CardType = 'quote' | 'case-study' | 'review' | 'metric';

interface ProofCardProps {
  type: CardType;
  style?: React.CSSProperties;
}

const LABELS: Record<CardType, string> = {
  'quote': 'CUSTOMER QUOTE',
  'case-study': 'CASE STUDY',
  'review': 'G2 REVIEW',
  'metric': 'IMPACT METRIC',
};

const ICONS: Record<CardType, React.FC> = {
  'quote': () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="6" fill={CORAL_RED} opacity={0.1} />
      <path d="M6.5 12.5C6.5 11.5 7 10 8.5 8.5L9.5 9.5C8.5 10.5 8.2 11 8.2 11.5H9.5V13.5H6.5V12.5ZM11 12.5C11 11.5 11.5 10 13 8.5L14 9.5C13 10.5 12.7 11 12.7 11.5H14V13.5H11V12.5Z" fill={CORAL_RED} />
    </svg>
  ),
  'case-study': () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="6" fill="#4A90D9" opacity={0.1} />
      <path d="M6 4C6 3.45 6.45 3 7 3H11L15 7V16C15 16.55 14.55 17 14 17H7C6.45 17 6 16.55 6 16V4Z" fill="#4A90D9" opacity={0.3} />
      <path d="M11 3L15 7H12C11.45 7 11 6.55 11 6V3Z" fill="#4A90D9" opacity={0.5} />
      <rect x="8" y="9" width="5" height="1.2" rx="0.6" fill="#4A90D9" opacity={0.5} />
      <rect x="8" y="11.5" width="3.5" height="1.2" rx="0.6" fill="#4A90D9" opacity={0.35} />
    </svg>
  ),
  'review': () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="6" fill="#FF6B35" opacity={0.1} />
      <path d="M10 4L11.5 7.5L15 8L12.5 10.5L13 14L10 12.5L7 14L7.5 10.5L5 8L8.5 7.5L10 4Z" fill="#FF6B35" />
    </svg>
  ),
  'metric': () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="6" fill="#00C48C" opacity={0.1} />
      <path d="M5 14L8 10L11 12L15 6" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6H15V9" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const ACCENT_COLORS: Record<CardType, string> = {
  'quote': CORAL_RED,
  'case-study': '#4A90D9',
  'review': '#FF6B35',
  'metric': '#00C48C',
};

const Star: React.FC<{ filled: boolean; half?: boolean }> = ({ filled, half }) => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <defs>
      <clipPath id="halfStar">
        <rect x="0" y="0" width="8" height="16" />
      </clipPath>
    </defs>
    {filled && !half && (
      <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="#FF6B35" />
    )}
    {half && (
      <>
        <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill={MUTED_GRAY} opacity={0.25} />
        <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="#FF6B35" clipPath="url(#halfStar)" />
      </>
    )}
    {!filled && !half && (
      <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill={MUTED_GRAY} opacity={0.2} />
    )}
  </svg>
);

const QuoteContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 28, color: CORAL_RED, lineHeight: 1, fontWeight: 300 }}>
      {'\u201C'}
    </span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 14, color: DEEP_INDIGO, fontStyle: 'italic', lineHeight: 1.55, fontWeight: 400 }}>
      Peerbound cut our deal prep time in half. Every rep now has proof at their fingertips.
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
      {/* Avatar circle */}
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, ${CORAL_RED} 0%, #E03347 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: FONT_PRIMARY, fontSize: 10, color: 'white', fontWeight: 600 }}>JL</span>
      </div>
      <span style={{ fontFamily: FONT_PRIMARY, fontSize: 11, color: MUTED_GRAY, fontWeight: 500 }}>
        Jamie Lee, VP Sales @ FinCo
      </span>
    </div>
  </div>
);

const CaseStudyContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 15, color: DEEP_INDIGO, fontWeight: 600, lineHeight: 1.4 }}>
      How FinCo Reduced Churn by 42%
    </span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 12, color: MUTED_GRAY, lineHeight: 1.5 }}>
      FinCo leveraged Peerbound to surface customer proof at every touchpoint...
    </span>
    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
      {['Enterprise', 'Fintech', '12 min'].map((tag) => (
        <span key={tag} style={{
          fontFamily: FONT_PRIMARY, fontSize: 10, fontWeight: 500, color: '#4A90D9',
          backgroundColor: 'rgba(74, 144, 217, 0.08)', padding: '3px 8px', borderRadius: 6,
        }}>{tag}</span>
      ))}
    </div>
  </div>
);

const ReviewContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4].map((i) => <Star key={i} filled />)}
        <Star filled={false} half />
      </div>
      <span style={{ fontFamily: FONT_PRIMARY, fontSize: 14, color: DEEP_INDIGO, fontWeight: 700 }}>4.8</span>
      <span style={{ fontFamily: FONT_PRIMARY, fontSize: 11, color: MUTED_GRAY }}>on G2</span>
    </div>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 13, color: DEEP_INDIGO, lineHeight: 1.5 }}>
      {'\u201C'}Best-in-class proof automation for enterprise sales teams.{'\u201D'}
    </span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 11, color: MUTED_GRAY }}>
      Based on 127 verified reviews
    </span>
  </div>
);

const MetricContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontFamily: FONT_PRIMARY, fontSize: 44, color: CORAL_RED, fontWeight: 800, letterSpacing: -1 }}>42%</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L6 9M10 5L14 9" stroke="#00C48C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 15, color: DEEP_INDIGO, fontWeight: 600 }}>reduction in churn</span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 12, color: MUTED_GRAY, lineHeight: 1.4 }}>
      Within 6 months of deploying Peerbound proof automation
    </span>
  </div>
);

const CONTENT: Record<CardType, React.FC> = {
  'quote': QuoteContent,
  'case-study': CaseStudyContent,
  'review': ReviewContent,
  'metric': MetricContent,
};

export const ProofCard: React.FC<ProofCardProps> = ({ type, style }) => {
  const Content = CONTENT[type];
  const Icon = ICONS[type];
  const accentColor = ACCENT_COLORS[type];

  return (
    <div
      style={{
        width: 340,
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: SHADOW_CARD,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...style,
      }}
    >
      {/* Top accent gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '16px 20px 0 20px',
        }}
      >
        <Icon />
        <span
          style={{
            fontFamily: FONT_PRIMARY,
            fontSize: 10,
            fontWeight: 600,
            color: MUTED_GRAY,
            letterSpacing: 1.2,
          }}
        >
          {LABELS[type]}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 20px 16px 20px', display: 'flex', flex: 1 }}>
        <Content />
      </div>
    </div>
  );
};
