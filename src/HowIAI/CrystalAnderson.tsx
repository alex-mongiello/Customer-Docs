import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {NotebookBackground} from './NotebookBackground';
import {Header} from './Header';
import {DoodleHeart} from './DoodleHeart';
import {Stats} from './Stats';
import {Hook} from './Hook';
import {SpeakerCard} from './SpeakerCard';
import {DoodleLightbulb} from './DoodleLightbulb';
import {Quote} from './Quote';
import {CTAPage} from './CTAPage';
import {PageFlip} from './PageFlip';

// Google Fonts — To enable, uncomment below (requires network access for render):
// import {loadFont as loadPatrickHand} from '@remotion/google-fonts/PatrickHandSC';
// import {loadFont as loadIndieFlower} from '@remotion/google-fonts/IndieFlower';
// import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
// loadPatrickHand('normal', {subsets: ['latin'], weights: ['400']});
// loadIndieFlower('normal', {subsets: ['latin'], weights: ['400']});
// loadInter('normal', {subsets: ['latin'], weights: ['500', '600', '700']});

/**
 * Crystal Anderson "How I AI" Spotlight
 * 1080x1080, 30fps, 450 frames (15 seconds)
 *
 * Phase 1: Header (0–60)
 * Phase 2: Stats (50–120)
 * Phase 3: Hook (120–180)
 * Phase 4: Speaker Card (180–270)
 * Phase 5: Quote — stats/hook fade, card slides up, quote appears (260–360)
 * Phase 6: Page Flip to CTA (360–420)
 * Phase 7: Hold CTA (420–450)
 */

const Page1Content: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 5: Stats and hook fade out (frames 260–275)
  const statsHookOpacity = interpolate(frame, [260, 275], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5: Speaker card slides up (frames 260–285)
  const cardSlideY = interpolate(frame, [260, 285], [0, -230], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <NotebookBackground />

      {/* Phase 1: Header + Heart doodle */}
      <Header />
      <DoodleHeart />

      {/* Phase 2: Stats */}
      <Stats opacity={statsHookOpacity} />

      {/* Phase 3: Hook line */}
      <Hook opacity={statsHookOpacity} />

      {/* Phase 4: Speaker Card + Lightbulb doodle */}
      <SpeakerCard translateY={cardSlideY} />
      <div
        style={{
          transform: `translateY(${cardSlideY}px)`,
        }}
      >
        <DoodleLightbulb />
      </div>

      {/* Phase 5: Quote (appears after stats fade) */}
      {frame >= 275 && (
        <div
          style={{
            transform: `translateY(${cardSlideY}px)`,
          }}
        >
          <Quote />
        </div>
      )}
    </AbsoluteFill>
  );
};

export const CrystalAnderson: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#FEFCF8'}}>
      <PageFlip
        flipStartFrame={360}
        flipEndFrame={410}
        frontPage={<Page1Content />}
        backPage={<CTAPage />}
      />
    </AbsoluteFill>
  );
};
