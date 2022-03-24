import React from 'react';
import { AudioLevelDisplayType } from '../../types';
import { DisplayShapes } from '../Video/Video';
import InlineCircle from './InlineCircle';
import InlineWave from './InlineWave';
import { AudioLevelBorder, AudioLevelIndicatorClasses } from './Border';
import { AudioLevelStaticBorder } from './StaticBorder';

export interface AudioLevelIndicatorProps {
  audioTrackId?: string;
  type: AudioLevelDisplayType;
  level?: number;
  color?: string;
  displayShape?: DisplayShapes;
  classes?: AudioLevelIndicatorClasses;
  borderWidth?: number;
}

export const AudioLevelIndicator = ({
  audioTrackId,
  type,
  level = 0,
  color,
  displayShape = 'rectangle',
  classes,
  borderWidth = 1
}: AudioLevelIndicatorProps) => {
  switch (type) {
    case 'inline-circle':
      return <InlineCircle level={level} />;
    case 'inline-wave':
      return <InlineWave level={level} />;
    case 'border':
      return (
        <AudioLevelBorder
          audioTrackId={audioTrackId}
          displayShape={displayShape}
          color={color}
          classes={classes}
        />
      );
    case 'static-border':
      return (
        <AudioLevelStaticBorder
          borderWidth={borderWidth}
          audioTrackId={audioTrackId}
          displayShape={displayShape}
          color={color}
          classes={classes}
        />
      );
    default:
      return null;
  }
};
