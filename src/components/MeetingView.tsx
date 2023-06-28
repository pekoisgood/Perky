"use client";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
// import ParticipantView from "./ParticipantView";
// import ScreenShareView from "./ScreenShareView";
import dynamic from "next/dynamic";

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

const MeetingView = () => {
  const { toggleMic, toggleWebcam } = useMeeting();
  const { leave, end } = useMeeting();
  const [joined, setJoined] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isWebCamOn, setIsWebCamOn] = useState<boolean>(true);
  const [presenterId, setPresenterId] = useState<string>("");
  console.log(joined);

  const ParticipantView = dynamic(() => import("./ParticipantView"), {
    ssr: false,
  });

  const ScreenShareView = dynamic(() => import("./ScreenShareView"), {
    ssr: false,
  });

  const { join, participants, enableScreenShare, disableScreenShare } =
    useMeeting({
      onPresenterChanged,
      onParticipantJoined,
      onMeetingLeft,
      onParticipantLeft,
    });

  const joinMeeting = async () => {
    console.log("joinnn!");

    await join();
    setJoined(true);
  };

  function onParticipantJoined(participant: Participant) {
    console.log(" onParticipantJoined", participant);
  }

  function onPresenterChanged(presenterId: PresenterId) {
    if (presenterId) {
      console.log(presenterId, "started screen share");
      setPresenterId(presenterId);
    } else {
      console.log("someone stopped screen share");
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

  function onMeetingLeft() {
    console.log("onMeetingLeft");
  }

  function onParticipantLeft(participant: Participant) {
    console.log(" onParticipantLeft", participant);
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
    <div className="container border-2 border-rose-[200px] border-solid flex flex-col h-full">
      {joined ? (
        <>
          <div className={"flex flex-col"}>
            {/* presenter screen */}
            {presenterId && (
              <div className="w-full">
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
            <div className={`flex gap-2 ${presenterId && "w-full"}`}>
              {allParticipants.map((participantId: string) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-auto mb-[20px]">
            <button
              className={`rounded-full bg-slate-200 px-4 ${
                presenterId && "hover:cursor-not-allowed"
              }`}
              onClick={handleEnableScreenShare}
            >
              分享螢幕
            </button>
            <button
              className="rounded-full bg-slate-200 px-4"
              onClick={handleDisableScreenShare}
            >
              停止分享螢幕
            </button>
            <button
              className="rounded-full bg-slate-200 px-4"
              onClick={handleToggleMic}
            >
              {isMicOn ? "靜音" : "開聲音"}
            </button>
            <button
              className="rounded-3xl bg-slate-200 px-4"
              onClick={handleToggleWebCam}
            >
              {isWebCamOn ? "關閉鏡頭" : "開起鏡頭"}
            </button>
            <button
              className="rounded-3xl bg-red-400 px-4"
              onClick={() => handleLeaveMeeting()}
            >
              Leave Meeting
            </button>
            <button
              className="rounded-3xl bg-red-400 px-4"
              onClick={() => handleEndMeeting()}
            >
              End Meeting
            </button>
          </div>
        </>
      ) : (
        <div className="h-[300px] mt-4">
          <button
            className="rounded-3xl bg-slate-200 px-4"
            onClick={joinMeeting}
          >
            Join the meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingView;
