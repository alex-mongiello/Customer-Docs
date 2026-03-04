import React from 'react';
import { CORAL_RED, DEEP_INDIGO, MUTED_GRAY, FONT_PRIMARY, SHADOW_CARD } from '../theme';

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

const Star: React.FC<{ filled: boolean; half?: boolean }> = ({ filled, half }) => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <defs>
      <clipPath id="halfClip">
        <rect x="0" y="0" width="9" height="18" />
      </clipPath>
    </defs>
    {filled && !half && (
      <polygon
        points="9,1 11.5,6.5 17,7 13,11 14,16.5 9,13.5 4,16.5 5,11 1,7 6.5,6.5"
        fill={CORAL_RED}
      />
    )}
    {half && (
      <>
        <polygon
          points="9,1 11.5,6.5 17,7 13,11 14,16.5 9,13.5 4,16.5 5,11 1,7 6.5,6.5"
          fill={MUTED_GRAY}
          opacity={0.3}
        />
        <polygon
          points="9,1 11.5,6.5 17,7 13,11 14,16.5 9,13.5 4,16.5 5,11 1,7 6.5,6.5"
          fill={CORAL_RED}
          clipPath="url(#halfClip)"
        />
      </>
    )}
    {!filled && !half && (
      <polygon
        points="9,1 11.5,6.5 17,7 13,11 14,16.5 9,13.5 4,16.5 5,11 1,7 6.5,6.5"
        fill={MUTED_GRAY}
        opacity={0.3}
      />
    )}
  </svg>
);

const DocumentIcon: React.FC = () => (
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
    <path d="M0 2C0 0.9 0.9 0 2 0H16L24 8V26C24 27.1 23.1 28 22 28H2C0.9 28 0 27.1 0 26V2Z" fill={CORAL_RED} opacity={0.15} />
    <path d="M16 0L24 8H18C16.9 8 16 7.1 16 6V0Z" fill={CORAL_RED} opacity={0.3} />
    <rect x="4" y="12" width="16" height="2" rx="1" fill={CORAL_RED} opacity={0.4} />
    <rect x="4" y="17" width="12" height="2" rx="1" fill={CORAL_RED} opacity={0.3} />
    <rect x="4" y="22" width="14" height="2" rx="1" fill={CORAL_RED} opacity={0.2} />
  </svg>
);

const QuoteContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 32, color: CORAL_RED, lineHeight: 1, marginBottom: -4 }}>"</span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 15, color: DEEP_INDIGO, fontStyle: 'italic', lineHeight: 1.5 }}>
      Peerbound cut our deal prep time in half.
    </span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 12, color: MUTED_GRAY, fontWeight: 500, marginTop: 8 }}>
      — VP Sales, FinCo
    </span>
  </div>
);

const CaseStudyContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <DocumentIcon />
      <span style={{ fontFamily: FONT_PRIMARY, fontSize: 16, color: DEEP_INDIGO, fontWeight: 600, lineHeight: 1.4 }}>
        How FinCo Reduced Churn by 42%
      </span>
    </div>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 11, color: MUTED_GRAY }}>
      Enterprise · Fintech · 12 min read
    </span>
  </div>
);

const ReviewContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4].map((i) => <Star key={i} filled />)}
      <Star filled={false} half />
    </div>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 12, color: MUTED_GRAY }}>
      4.8 out of 5 on G2
    </span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 14, color: DEEP_INDIGO, lineHeight: 1.4 }}>
      Best-in-class proof automation for enterprise teams.
    </span>
  </div>
);

const MetricContent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 48, color: CORAL_RED, fontWeight: 700 }}>42%</span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 15, color: DEEP_INDIGO, fontWeight: 500 }}>reduction in churn</span>
    <span style={{ fontFamily: FONT_PRIMARY, fontSize: 12, color: MUTED_GRAY }}>within 6 months of deployment</span>
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

  return (
    <div
      style={{
        width: 340,
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: SHADOW_CARD,
        borderLeft: `3px solid ${CORAL_RED}`,
        padding: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: FONT_PRIMARY,
          fontSize: 10,
          fontWeight: 600,
          color: MUTED_GRAY,
          letterSpacing: 1.5,
          marginBottom: 12,
        }}
      >
        {LABELS[type]}
      </span>
      <Content />
    </div>
  );
};
