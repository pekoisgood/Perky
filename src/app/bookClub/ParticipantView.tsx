"use client";
import React from "react";
import { useRef, useMemo, useEffect } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

const ParticipantView = ({
  participantId,
  participantCount,
  presenterId,
}: {
  participantId: string;
  participantCount: number;
  presenterId: string | null;
}) => {
  const micRef = useRef<HTMLAudioElement | null>(null);
  const autoPlay = useRef();
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
    screenShareStream,
    screenShareAudioStream,
    screenShareOn,
    // audioPlayer,
  } = useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  // 分享螢幕
  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  //Callback for when the participant starts a stream
  //   function onStreamEnabled(stream: any) {
  //     if (stream.kind === "share") {
  //       console.log("Share Stream On: onStreamEnabled", stream);
  //     }
  //   }

  //Callback for when the participant stops a stream
  //   function onStreamDisabled(stream:any) {
  //     if (stream.kind === "share") {
  //       console.log("Share Stream Off: onStreamDisabled", stream);
  //     }
  //   }

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

  useEffect(() => {}, [screenShareAudioStream, screenShareOn, isLocal]);

  function toggleShowScreen() {
    // if (screenShareOn && presenterId === participantId) {
    //   return "abolute top-0 left-0 w-full flex items-center";
    // } else if (screenShareOn) {
    // }

    if (participantCount !== 1 && isLocal) {
      return "absolute bottom-0 right-0 w-[25%] rounded-md ";
    } else {
      return "flex border-[1px] border-solid border-rose-500 w-full min-h-200px items-center";
    }
  }

  return (
    <div className={toggleShowScreen()}>
      {webcamOn && (
        <div className="w-[500px]">
          <audio ref={micRef} autoPlay playsInline muted={isLocal} />

          <ReactPlayer
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={false}
            playing={true}
            url={videoStream}
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      )}
      {screenShareOn && (
        // {/* //   className={
        // // screenShareOn
        // //   ? "absolute top-0 left-0 w-full"
        // //   : "border-[1px] border-solid border-green-500"
        // //   } */}
        <div>
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

export default ParticipantView;
