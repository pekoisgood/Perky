"use client";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useContext, useState } from "react";
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
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";

type PresenterId = null | string;

type Participant = {
  displayName: string;
  id: string;
  micOn: boolean;
  local: boolean;
  mode: string;
  quality: string;
  webcamOn: boolean;
};
const ParticipantView = dynamic(() => import("./ParticipantView"), {
  ssr: false,
});

const ScreenShareView = dynamic(() => import("./ScreenShareView"), {
  ssr: false,
});

const MeetingView = () => {
  const { user } = useContext(AuthContext);
  const { toggleMic, toggleWebcam } = useMeeting();
  const { leave, end } = useMeeting();
  const [joined, setJoined] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isWebCamOn, setIsWebCamOn] = useState<boolean>(true);
  const [presenterId, setPresenterId] = useState<string>("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const { join, participants, enableScreenShare, disableScreenShare } =
    useMeeting({
      onPresenterChanged,
      onParticipantJoined,
      // onMeetingLeft,
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

  // function onMeetingLeft() {
  //   console.log("onMeetingLeft");
  // }

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
            {/* presenter screen */}
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
            {/* 這裡 h 會控制 整個畫面視訊的版面 */}
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
              title="分享螢幕"
            >
              <LuScreenShare size={25} />
            </abbr>
            <abbr
              title="停止分享螢幕"
              className="rounded-full bg-slate-200 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={handleDisableScreenShare}
            >
              <LuScreenShareOff size={25} />
            </abbr>
            <abbr
              className="rounded-full bg-slate-200 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={handleToggleMic}
              title={isMicOn ? "靜音" : "開聲音"}
            >
              {isMicOn ? (
                <BsFillMicMuteFill size={25} />
              ) : (
                <BsFillMicFill size={25} />
              )}
            </abbr>
            <abbr
              className="rounded-full bg-slate-200 w-[40px] h-[40px] flex items-center justify-center hover:cursor-pointer"
              onClick={handleToggleWebCam}
              title={isWebCamOn ? "關閉鏡頭" : "開起鏡頭"}
            >
              {isWebCamOn ? (
                <BsFillCameraVideoOffFill size={25} />
              ) : (
                <BsFillCameraVideoFill size={25} />
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
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center text-white">
          {user.avatar !== " " ? (
            <Image
              src={user.avatar}
              alt="user avatar"
              width={100}
              height={100}
              className="rounded-full overflow-hidden"
            />
          ) : (
            <PiFinnTheHumanFill />
          )}
          <p>{user.name}</p>
          <motion.button
            className={`rounded-3xl bg-[#9575DE] border-2 border-white text-white text-bold text-[20px] tacking-[1px]
            py-[5px] px-[14px] mx-auto w-fit hover:cursor-pointer hover:scale-110 hover:duration-75`}
            onClick={joinMeeting}
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 300, duration: 0.5 },
            }}
          >
            Join the meeting
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default MeetingView;

{
  /* <div className="flex gap-2 mt-auto mb-[20px] absolute bottom-0 left-[50%] translate-x-[-50%]">
            <abbr
              className={`rounded-full bg-slate-200 px-4 ${
                presenterId && "hover:cursor-not-allowed"
              }`}
              onClick={handleEnableScreenShare}
              title="分享螢幕"
            >
              <LuScreenShare size={30} />
            </abbr>
            <button
              className="rounded-full bg-slate-200 px-4"
              onClick={handleDisableScreenShare}
            >
              停止分享螢幕 <LuScreenShareOff size={30} />
            </button>
            <button
              className="rounded-full bg-slate-200 px-4"
              onClick={handleToggleMic}
            >
              {isMicOn
                ? `靜音 ${(<BsFillMicMuteFill size={30} />)}`
                : `開聲音 ${(<BsFillMicFill size={30} />)}`}
            </button>
            <button
              className="rounded-3xl bg-slate-200 px-4"
              onClick={handleToggleWebCam}
            >
              {isWebCamOn
                ? `關閉鏡頭 ${(<BsFillCameraVideoOffFill size={30} />)}`
                : `開起鏡頭${(<BsFillCameraVideoFill size={30} />)}`}
            </button>
            <button
              className="rounded-3xl bg-red-400 px-4"
              onClick={() => handleLeaveMeeting()}
            >
              Leave Meeting <ImExit size={30} />
            </button>
            <button
              className="rounded-3xl bg-red-400 px-4"
              onClick={() => handleEndMeeting()}
            >
              End Meeting <MdCallEnd size={30} className="text-rose-400" />
            </button>
          </div> */
}
