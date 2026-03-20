import React from 'react';
import {Composition} from 'remotion';
import {NotificationFlood} from './examples/code/NotificationFlood';
import {PeerboundWaitingRoom} from './PeerboundWaitingRoom';
import {ChrisDaltonCard} from './PersonnelCard';
import {CrystalAnderson} from './HowIAI/CrystalAnderson';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="NotificationFlood"
        component={NotificationFlood}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PeerboundWaitingRoom"
        component={PeerboundWaitingRoom}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChrisDaltonCard"
        component={ChrisDaltonCard}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="CrystalAndersonHowIAI"
        component={CrystalAnderson}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
