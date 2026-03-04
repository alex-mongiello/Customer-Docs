import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Background } from './components/Background';
import { ScatteredProof } from './scenes/ScatteredProof';
import { SearchBar } from './scenes/SearchBar';
import { ThinkingIndicator } from './scenes/ThinkingIndicator';
import { ProofCards } from './scenes/ProofCards';
import { TransformEffect } from './scenes/TransformEffect';
import { BrandClose } from './scenes/BrandClose';
import { LoopReset } from './scenes/LoopReset';

export const PeerboundWaitingRoom: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Gradient background with floating particles — entire duration */}
      <Sequence from={0} durationInFrames={900}>
        <Background />
      </Sequence>

      {/* Scattered proof fragments — entire duration, fades with scenes */}
      <Sequence from={0} durationInFrames={900}>
        <ScatteredProof />
      </Sequence>

      {/* Search bar — 5s to 14s */}
      <Sequence from={150} durationInFrames={270}>
        <SearchBar />
      </Sequence>

      {/* Thinking dots — 12s to 14s */}
      <Sequence from={360} durationInFrames={60}>
        <ThinkingIndicator />
      </Sequence>

      {/* Proof cards — 14s to 20s */}
      <Sequence from={420} durationInFrames={180}>
        <ProofCards />
      </Sequence>

      {/* Cards converge + label cycling — 20s to 24s */}
      <Sequence from={600} durationInFrames={120}>
        <TransformEffect />
      </Sequence>

      {/* Brand close — 24s to 29s */}
      <Sequence from={720} durationInFrames={150}>
        <BrandClose />
      </Sequence>

      {/* Loop reset overlay — 28s to 30s */}
      <Sequence from={840} durationInFrames={60}>
        <LoopReset />
      </Sequence>
    </AbsoluteFill>
  );
};
