import React, { useCallback, useMemo, useRef } from 'react';
import { AudioLevelIndicatorProps } from '.';
import { hmsUiClassParserGenerator } from '../../utils/classes';
import { sigmoid } from '../../utils';
import { useHMSTheme } from '../../hooks/HMSThemeProvider';
import { useAudioLevel } from './useAudioLevel';
export interface AudioLevelIndicatorClasses {
  /**
   * Style attached to avatar
   */
  root?: string;
  /**
   * Style attached when display shape is circle
   */
  videoCircle?: string;
}

type AudioLevelBorderProps = Omit<AudioLevelIndicatorProps, 'type'>;

const defaultClasses: AudioLevelIndicatorClasses = {
  root: 'w-full h-full absolute left-0 top-0 rounded-lg',
  videoCircle: 'rounded-full',
};

export const AudioLevelStaticBorder = ({
  borderWidth,
  color = '#0F6CFF',
  displayShape,
  classes,
  audioTrackId,
}: AudioLevelBorderProps) => {
  const { tw } = useHMSTheme();
  const styler = useMemo(
    () =>
      hmsUiClassParserGenerator<AudioLevelIndicatorClasses>({
        tw,
        classes,
        defaultClasses,
        tag: 'hmsui-audioLevelIndicator',
      }),
    [],
  );
  const getStyle = useCallback((level: number) => {
    const style: Record<string, string> = {
      transition: 'border 0.4s ease-in-out',
    };
    style['border'] = `${borderWidth}px solid ${color}`;
    return style;
  }, []);

  const ref = useRef(null);
  useAudioLevel({ ref, getStyle, trackId: audioTrackId });

  return (
    <div
      className={`${styler('root')} ${
        displayShape === 'circle' ? styler('videoCircle') : ''
      }
        `}
      ref={ref}
    ></div>
  );
};
