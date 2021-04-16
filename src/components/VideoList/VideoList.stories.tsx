import { useEffect } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { VideoList, VideoListProps } from '.';
import { closeMediaStream, getVideoTileLabel } from '../../utils';
import { MediaStreamWithInfo, Peer, VideoSource } from '../../types';
import { VideoTileControls } from '../VideoTile/Controls';
import { MicOff, MicOn } from '../../icons';

const meta: Meta = {
  title: 'Video/ List',
  component: VideoList,
  argTypes: {
    maxTileCount: { control: { type: 'range' } },
    maxRowCount: { control: { type: 'range' } },
    maxColCount: { control: { type: 'range' } },
    videoTileControls: { control: { disable: true } },
    width: { control: false },
    height: { control: { disable: true } },
  },
  parameters: { controls: { sort: 'requiredFirst' } },
};

export default meta;

interface VideoListStoryProps extends VideoListProps {
  width?: string;
  height?: string;
}

const Template: Story<VideoListStoryProps> = (args) => {
  const { streams, ...rest } = args;
  const isCameraStreamRequired: boolean = args.streams.some(
    (stream) => !stream.isVideoMuted && stream.videoSource === 'camera',
  );
  const isScreenStreamRequired: boolean = args.streams.some(
    (stream) => !stream.isVideoMuted && stream.videoSource === 'screen',
  );
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [screenStream, setScreenStream] = useState<MediaStream>();

  // useEffect(() => {
  //   const track = stream?.getVideoTracks()[0];
  //   if (track) track.enabled = !args.isVideoMuted;
  // }, [args.peer.isVideoMuted]);

  // useEffect(() => {
  //   const track = stream?.getAudioTracks()[0];
  //   if (track) track.enabled = !args.isAudioMuted;
  // }, [args.isAudioMuted]);

  useEffect(() => {
    closeMediaStream(cameraStream);
    closeMediaStream(screenStream);

    if (isCameraStreamRequired) {
      window.navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function (stream) {
          // @ts-ignore
          window.stream = stream;
          c; //onsole.log(stream);
          setCameraStream(stream);
        });
    }
    if (isScreenStreamRequired) {
      window.navigator.mediaDevices
        // @ts-ignore
        .getDisplayMedia({ video: true })
        .then(function (stream: MediaStream | undefined) {
          // @ts-ignore
          window.stream = stream;
          //console.log(stream);
          setScreenStream(stream);
        });
    }

    return () => {
      closeMediaStream(screenStream);
      closeMediaStream(cameraStream);
    };
  }, [
    args.streams,
    cameraStream,
    isCameraStreamRequired,
    isScreenStreamRequired,
    screenStream,
  ]);

  return (
    <div className="h-screen w-full flex flex-wrap justify-center content-evenly justify-items-center">
      <div style={{ width: args.width, height: args.height }} className="p-8">
        {cameraStream && (
          <VideoList
            {...rest}
            streams={streams
              .filter(
                (item) =>
                  item.videoSource === 'screen' ||
                  item.videoSource === 'camera',
              )
              .map((item): any => ({
                ...item,
                stream:
                  item.videoSource === 'screen' ? screenStream : cameraStream,
              }))}
          />
        )}
      </div>
    </div>
  );
};

const streams: MediaStreamWithInfo[] = [
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil1' },
    videoSource: 'camera',
    audioLevel: 50,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil2' },
    videoSource: 'camera',
    audioLevel: 100,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil3' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil4' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: true,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil5' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: true,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil6' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil7' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil8' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil9' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil10' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil11' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  {
    stream: new MediaStream(),
    peer: { id: '123', displayName: 'Nikhil12' },
    videoSource: 'camera',
    audioLevel: 10,
    isAudioMuted: true,
    isVideoMuted: false,
  },
  // {
  //   stream: new MediaStream(),
  //   peer: { id: '123', displayName: 'Nikhil' },
  //   videoSource: 'screen',
  // },
];

export const DefaultList = Template.bind({});
DefaultList.args = {
  streams: streams,
  maxTileCount: 3,
  height: '98vh',
  width: '100%',
  classes: {
    //videoTileRoot: 'p-1',
    video: 'rounded-lg shadow-lg',
  },
};

export const CenterStage = Template.bind({});
CenterStage.args = {
  streams: streams,
  maxTileCount: 2,
  overflow: 'hidden',
  audioLevelDisplayType: 'border',
  height: '98vh',
  width: '100%',
  classes: {
    videoTile: 'p-2',
    video: 'rounded-lg shadow-lg',
  },
};

export const Campfire = Template.bind({});
Campfire.args = {
  streams: streams,
  maxTileCount: 5,
  showAudioLevel: false,
  displayShape: 'circle',
  height: '200px',
  width: '100%',
  classes: {
    videoTile: 'p-2',
    video: 'rounded-lg shadow-lg',
    root: 'bg-gray-100 rounded-lg',
  },
  showAudioMuteStatus: false,
};

export const SideBar = Template.bind({});
SideBar.args = {
  streams: streams.slice(0, 4),
  showAudioLevel: false,
  height: '100vh',
  width: '300px',
  classes: {
    videoTile: 'p-1',
    video: 'rounded-lg shadow-lg',
  },
};
const GoogleMeetControls = ({
  allowRemoteMute,
  isAudioMuted,
  peer,
  isLocal,
  videoSource,
  showAudioLevel,
  showAudioMuteStatus,
  audioLevel,
}: {
  allowRemoteMute: boolean;
  isAudioMuted?: boolean;
  peer: Peer;
  isLocal?: boolean;
  videoSource: VideoSource;
  showAudioLevel: boolean;
  showAudioMuteStatus: boolean;
  audioLevel?: number;
}) => {
  return (
    <>
      {allowRemoteMute && (
        <div className="inset-center">
          <div className="rounded-full text-white py-3 px-4 opacity-40 bg-gray-300 hover:opacity-70 ">
            {isAudioMuted ? MicOff : MicOn}
          </div>
        </div>
      )}
      <VideoTileControls
        label={getVideoTileLabel(
          peer.displayName,
          isLocal || false,
          videoSource,
        )}
        isAudioMuted={isAudioMuted}
        showAudioMuteStatus={showAudioMuteStatus}
        showGradient={false}
        allowRemoteMute={allowRemoteMute}
        showAudioLevel={showAudioLevel}
        audioLevelDisplayType="inline-wave"
        audioLevel={audioLevel}
        classes={{
          labelContainer: 'flex justify-around items-center w-min',
        }}
      />
      ;
    </>
  );
};

const MeetTemplate: Story<VideoListStoryProps> = (
  args: VideoListStoryProps,
) => {
  const { streams, ...rest } = args;
  const {
    allowRemoteMute = true,
    showAudioLevel = true,
    showAudioMuteStatus = true,
  } = rest;
  const isCameraStreamRequired: boolean = args.streams.some(
    (stream) => stream.videoSource === 'camera',
  );
  const isScreenStreamRequired: boolean = args.streams.some(
    (stream) => stream.videoSource === 'screen',
  );
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [screenStream, setScreenStream] = useState<MediaStream>();

  // useEffect(() => {
  //   const track = stream?.getVideoTracks()[0];
  //   if (track) track.enabled = !args.isVideoMuted;
  // }, [args.peer.isVideoMuted]);

  // useEffect(() => {
  //   const track = stream?.getAudioTracks()[0];
  //   if (track) track.enabled = !args.isAudioMuted;
  // }, [args.isAudioMuted]);

  useEffect(() => {
    closeMediaStream(cameraStream);
    closeMediaStream(screenStream);

    if (isCameraStreamRequired) {
      window.navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function (stream) {
          // @ts-ignore
          window.stream = stream;
          //console.log(stream);
          setCameraStream(stream);
        });
    }
    if (isScreenStreamRequired) {
      window.navigator.mediaDevices
        // @ts-ignore
        .getDisplayMedia({ video: true })
        .then(function (stream: MediaStream | undefined) {
          // @ts-ignore
          window.stream = stream;
          //console.log(stream);
          setScreenStream(stream);
        });
    }

    return () => {
      closeMediaStream(screenStream);
      closeMediaStream(cameraStream);
    };
  }, [
    args.streams,
    cameraStream,
    isCameraStreamRequired,
    isScreenStreamRequired,
    screenStream,
  ]);

  return (
    <div className="h-screen w-full flex flex-wrap justify-center content-evenly justify-items-center">
      <div style={{ width: args.width, height: args.height }} className="p-8">
        {cameraStream && (
          <VideoList
            {...rest}
            streams={streams
              .filter(
                (item) =>
                  item.videoSource === 'screen' ||
                  item.videoSource === 'camera',
              )
              .map((item): any => ({
                ...item,
                stream:
                  item.videoSource === 'screen' ? screenStream : cameraStream,
              }))}
            videoTileControls={streams.map((stream) => (
              <GoogleMeetControls
                allowRemoteMute={allowRemoteMute}
                isAudioMuted={stream.isAudioMuted}
                peer={stream.peer}
                isLocal={stream.isLocal}
                videoSource={stream.videoSource}
                showAudioLevel={showAudioLevel}
                audioLevel={stream.audioLevel}
                showAudioMuteStatus={showAudioMuteStatus}
              />
            ))}
          />
        )}
      </div>
    </div>
  );
};

export const GoogleMeet = MeetTemplate.bind({});
GoogleMeet.args = {
  streams: streams,
  maxTileCount: 6,
  overflow: 'hidden',
  aspectRatio: { width: 16, height: 9 },
  displayShape: 'rectangle',
  showAudioLevel: true,
  audioLevelDisplayType: 'inline-wave',
  allowRemoteMute: false,
  height: '100vh',
  width: '100%',
  showAudioMuteStatus: true,
};