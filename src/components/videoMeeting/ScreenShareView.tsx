"use client";
import { useRef, useMemo, useEffect } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

const ScreenShareView = ({
  participantId,
  presenterId,
  handleDisableScreenShare,
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

  return (
    <div>
      ScreenShareView
      {screenShareOn && presenterId === participantId && (
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
          <button onClick={handleDisableScreenShare}>
            Disable screen share
          </button>
        </div>
      )}
    </div>
  );
};

export default ScreenShareView;
