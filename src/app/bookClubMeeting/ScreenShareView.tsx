"use client";
import { useRef, useMemo, useEffect } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

const ScreenShareView = ({
  //   participantId,
  presenterId,
}: {
  //   participantId: string;
  presenterId: string;
}) => {
  const micRef = useRef<HTMLAudioElement | null>(null);
  const autoPlay = useRef();
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    screenShareStream,
    screenShareAudioStream,
    screenShareOn,
    // audioPlayer,
  } = useParticipant(presenterId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  console.log(presenterId, screenShareOn);

  return (
    <div>
      ScreenShareView
      {screenShareOn && presenterId && (
        <div className="w-full">
          <ReactPlayer
            playsinline // very very imp prop
            playIcon={<></>}
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={mediaStream} // passing mediastream here
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "presenter video error");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ScreenShareView;
