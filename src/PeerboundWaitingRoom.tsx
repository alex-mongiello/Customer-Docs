import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SOFT_WHITE } from './theme';
import './fonts';
import { ScatteredProof } from './scenes/ScatteredProof';
import { SearchBar } from './scenes/SearchBar';
import { ThinkingIndicator } from './scenes/ThinkingIndicator';
import { ProofCards } from './scenes/ProofCards';
import { TransformEffect } from './scenes/TransformEffect';
import { BrandClose } from './scenes/BrandClose';
import { LoopReset } from './scenes/LoopReset';

export const PeerboundWaitingRoom: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: SOFT_WHITE }}>
      {/* Background layer — persists entire duration */}
      <Sequence from={0} durationInFrames={900}>
        <ScatteredProof />
      </Sequence>

      {/* Search bar — enters at 5s, persists through thinking indicator */}
      <Sequence from={150} durationInFrames={270}>
        <SearchBar />
      </Sequence>

      {/* Thinking dots — 12-14s */}
      <Sequence from={360} durationInFrames={60}>
        <ThinkingIndicator />
      </Sequence>

      {/* Proof cards delivered — 14-20s */}
      <Sequence from={420} durationInFrames={180}>
        <ProofCards />
      </Sequence>

      {/* Cards converge and labels cycle — 20-24s */}
      <Sequence from={600} durationInFrames={120}>
        <TransformEffect />
      </Sequence>

      {/* Brand close with logo and pulse rings — 24-29s */}
      <Sequence from={720} durationInFrames={150}>
        <BrandClose />
      </Sequence>

      {/* Loop reset — 28-30s */}
      <Sequence from={840} durationInFrames={60}>
        <LoopReset />
      </Sequence>
    </AbsoluteFill>
  );
};
