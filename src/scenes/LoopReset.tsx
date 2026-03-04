import React from 'react';
import { AbsoluteFill } from 'remotion';

export const LoopReset: React.FC = () => {
  // The actual loop reset is handled by:
  // 1. BrandClose's exit animation (fades out brand elements)
  // 2. ScatteredProof's opacity returning to 0.6 during frames 840-900
  // This component just ensures a clean transparent layer
  return <AbsoluteFill style={{ backgroundColor: 'transparent' }} />;
};
