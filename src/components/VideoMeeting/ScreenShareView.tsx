"use client";
import { useRef, useMemo, useEffect } from "react";

import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

const ScreenShareView = ({
  participantId,
  presenterId,
}: {
  participantId: string;
  presenterId: string;
  handleDisableScreenShare: () => void;
}) => {
  const micRef = useRef<HTMLAudioElement | null>(null);
  const { micStream, micOn, screenShareStream, screenShareOn } =
    useParticipant(presenterId);

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
        micRef.current.play().catch((error) => error);
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      {screenShareOn && presenterId === participantId && (
        <div className="h-full max-h-[calc(100vh-290px)] relative">
          <ReactPlayer
            playsinline
            playIcon={<></>}
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={mediaStream}
            height={"100%"}
            width={"100%"}
          />
        </div>
      )}
    </div>
  );
};

export default ScreenShareView;
