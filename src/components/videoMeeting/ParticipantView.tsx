"use client";
import React from "react";
import { useRef, useMemo, useEffect, useContext } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

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
  const { user } = useContext(AuthContext);
  const micRef = useRef<HTMLAudioElement | null>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal } =
    useParticipant(participantId);

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
      {/* // 這裡一定要設定 h-full 不然下面那個 height 如果是 % 會無法作用！！ */}
      <div className={`h-fit max-h-full w-full relative`}>
        {webcamOn ? (
          <>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            <ReactPlayer
              playsinline // very very imp prop
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
              {user.name}
            </p>
          </>
        ) : (
          <div
            className={`flex flex-col ${presenterId ? "w-[100px]" : "w-full"}`}
          >
            <Image
              src={user.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full overflow-hidden"
            />
            <p className="text-white text-[12px]">{user.name}</p>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col gap-2 justify-center items-center h-full w-[200px] border-[1px] border-orange-100">
          <Image
            src={user.avatar}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full overflow-hidden"
          />
          <p className="text-white text-[12px]">{user.name}</p>
        </div> */}
    </>
  );
};

export default ParticipantView;
