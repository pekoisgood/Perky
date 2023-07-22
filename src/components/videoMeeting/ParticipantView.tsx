"use client";

import React from "react";
import { useRef, useMemo, useEffect } from "react";
import Image from "next/image";

import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  participantId: string;
  presenterId: string;
  isMicOn: boolean;
  isCamOn: boolean;
};

const ParticipantView = ({
  participantId,
  presenterId,
  isMicOn,
  isCamOn,
}: Props) => {
  const guest = useAppSelector((state) => state.bookClubMeeting.value);
  const micRef = useRef<HTMLAudioElement | null>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const user = guest.find((guest) => guest.id === participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

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
    <>
      <div className={`h-fit max-h-full w-full relative`}>
        {webcamOn ? (
          <>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            <ReactPlayer
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={!isMicOn}
              playing={isCamOn}
              url={videoStream}
              height={presenterId ? "100px" : "100%"}
              width={"100%"}
              onError={(err) => {
                console.log(err, "participant video error");
              }}
              className="rounded-3xl overflow-hidden w-fit max-w-[1150px] mx-auto max-h-[calc(100vh-200px)] "
            />
            <p
              className={`absolute bottom-3 right-[50%] translate-x-[50%] ${
                presenterId ? "text-[12px]" : "text-[18px]"
              }`}
            >
              {displayName}
            </p>
          </>
        ) : (
          <div
            className={`flex flex-col items-center ${
              presenterId ? "w-[100px]" : "w-full"
            }`}
          >
            {user && user.avatar !== "" ? (
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full overflow-hidden border-[1px] border-white w-[40px] h-[40px] object-cover"
              />
            ) : (
              <PiFinnTheHumanFill
                size={40}
                className="rounded-full border-[1px] border-white text-white"
              />
            )}
            <p className="text-white text-[12px]">{displayName}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ParticipantView;
