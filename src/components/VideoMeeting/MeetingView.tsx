"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoOffFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import { MdCallEnd } from "react-icons/md";
import { PiFinnTheHumanFill } from "react-icons/pi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useAppSelector } from "@/redux/hooks";
import { PresenterId, Participant } from "@/utils/types/types";

const ParticipantView = dynamic(() => import("./ParticipantView"), {
  ssr: false,
});

const ScreenShareView = dynamic(() => import("./ScreenShareView"), {
  ssr: false,
});

const profileMotion = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  transition: {
    type: "ease",
    stiffness: 110,
    duration: 100,
  },
};

const MeetingView = () => {
  const { toggleMic, toggleWebcam } = useMeeting();
  const { leave, end } = useMeeting();
  const [joined, setJoined] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isWebCamOn, setIsWebCamOn] = useState<boolean>(true);
  const [presenterId, setPresenterId] = useState<string>("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const user = useAppSelector((state) => state.auth.value);

  const { join, participants, enableScreenShare, disableScreenShare } =
    useMeeting({
      onPresenterChanged,
      onParticipantJoined,
      onParticipantLeft,
    });

  const joinMeeting = async () => {
    await join();
    setJoined(true);
  };

  function onParticipantJoined(participant: Participant) {
    setParticipantIds((prev) => {
      return [...prev, participant.id];
    });
  }

  function onPresenterChanged(presenterId: PresenterId) {
    if (presenterId) {
      setPresenterId(presenterId);
    }
  }

  const handleLeaveMeeting = () => {
    leave();
    setJoined(false);
    setPresenterId("");
    setIsMicOn(true);
    setIsWebCamOn(true);
  };

  const handleEndMeeting = () => {
    end();
    setJoined(false);
    setPresenterId("");
    setIsMicOn(true);
    setIsWebCamOn(true);
  };

  function onParticipantLeft(participant: Participant) {
    const remainParticipants = participantIds.filter(
      (id) => id !== participant.id
    );
    setParticipantIds(remainParticipants);

    if (!presenterId) {
      setPresenterId("");
    }
  }

  const handleToggleMic = () => {
    toggleMic();
    setIsMicOn((prev) => !prev);
  };

  const handleToggleWebCam = () => {
    toggleWebcam();
    setIsWebCamOn((prev) => !prev);
  };

  const allParticipants = Array.from(participants.keys());

  const handleEnableScreenShare = () => {
    if (presenterId) return;
    enableScreenShare();
  };

  const handleDisableScreenShare = () => {
    disableScreenShare();
    setPresenterId("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      {joined ? (
        <>
          <div
            className={
              "grid grid-rows-1 auto-rows-[100px] justify-center items-center h-full"
            }
          >
            {presenterId && (
              <div className="w-full flex">
                {allParticipants.map((participantId: string) => (
                  <ScreenShareView
                    participantId={participantId}
                    presenterId={presenterId}
                    key={participantId}
                    handleDisableScreenShare={handleDisableScreenShare}
                  />
                ))}
              </div>
            )}
            <div
              className={`grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-fit max-w-[90vw] mx-auto items-center ${
                presenterId ? "h-[100px]" : "h-fit"
              }`}
            >
              {allParticipants.map((participantId: string) => (
                <ParticipantView
                  participantId={participantId}
                  presenterId={presenterId}
                  key={participantId}
                  isMicOn={isMicOn}
                  isCamOn={isWebCamOn}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-auto mb-[20px] absolute bottom-0 left-[50%] translate-x-[-50%]">
            <abbr
              className={`rounded-full bg-slate-200 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer ${
                presenterId && "hover:cursor-not-allowed"
              }`}
              onClick={handleEnableScreenShare}
              title="Share screen"
            >
              <LuScreenShare size={25} />
            </abbr>
            <abbr
              title="Stop share screen"
              className="rounded-full bg-slate-200 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={handleDisableScreenShare}
            >
              <LuScreenShareOff size={25} />
            </abbr>
            <abbr
              className={`rounded-full w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer
              ${isMicOn ? "bg-slate-200" : "bg-red-400"}
              `}
              onClick={handleToggleMic}
              title={isMicOn ? "Right now mic is on" : "Mic off"}
            >
              {isMicOn ? (
                <BsFillMicFill size={25} />
              ) : (
                <BsFillMicMuteFill size={25} />
              )}
            </abbr>
            <abbr
              className={`rounded-full w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer 
                ${isWebCamOn ? "bg-slate-200" : "bg-red-400"}
              `}
              onClick={handleToggleWebCam}
              title={isWebCamOn ? "disable camera" : "turn on camera"}
            >
              {isWebCamOn ? (
                <BsFillCameraVideoFill size={25} />
              ) : (
                <BsFillCameraVideoOffFill size={25} />
              )}
            </abbr>
            <abbr
              className="rounded-3xl bg-red-400 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={() => handleLeaveMeeting()}
              title="Leave Meeting"
            >
              <ImExit size={25} />
            </abbr>
            <abbr
              className="rounded-3xl bg-red-400 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={() => handleEndMeeting()}
              title="End Meeting"
            >
              <MdCallEnd size={25} />
            </abbr>
          </div>
        </>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={profileMotion}
          className="w-full h-full flex flex-col gap-3 justify-center items-center text-white"
        >
          {user.avatar !== "" ? (
            <Image
              src={user.avatar}
              alt="user avatar"
              width={100}
              height={100}
              className="rounded-full overflow-hidden object-cover w-[100px] h-[100px] border-2 border-white"
            />
          ) : (
            <PiFinnTheHumanFill size={100} />
          )}
          <p>{user.name}</p>
          <motion.button
            className={`rounded-3xl bg-[#245953] border-2 border-white text-white text-bold text-[20px] tacking-[1px]
            py-[5px] px-[14px] mx-auto w-fit hover:cursor-pointer hover:scale-110 hover:duration-75`}
            onClick={joinMeeting}
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 300, duration: 0.5 },
            }}
          >
            Join the meeting
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MeetingView;
