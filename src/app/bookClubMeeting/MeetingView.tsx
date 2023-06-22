"use client";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import ParticipantView from "./ParticipantView";
import ScreenShareView from "./ScreenShareView";

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

const MeetingView = ({ meetingId }: { meetingId: string }) => {
  const { toggleScreenShare, toggleMic, toggleWebcam } = useMeeting();
  const { leave, end } = useMeeting();
  const [joined, setJoined] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isWebCamOn, setIsWebCamOn] = useState<boolean>(true);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [presenterId, setPresenterId] = useState<string>("");
  const [participantsId, setParticipantsId] = useState<string[]>([]);

  const { join, participants, enableScreenShare, disableScreenShare } =
    useMeeting({
      onPresenterChanged,
      onParticipantJoined,
      onMeetingLeft,
      onParticipantLeft,
    });

  const joinMeeting = async () => {
    await join();
    setJoined(true);
  };

  function onParticipantJoined(participant: Participant) {
    console.log(" onParticipantJoined", participant);
    setParticipantsId((prev) => [...prev, participant.id]);
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
    setIsScreenShare(false);
    setPresenterId("");
    setIsMicOn(true);
    setIsWebCamOn(true);
    setParticipantsId([]);
  };

  const handleEndMeeting = () => {
    end();
    setJoined(false);
    setIsScreenShare(false);
    setPresenterId("");
    setIsMicOn(true);
    setIsWebCamOn(true);
    setParticipantsId([]);
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

  const handleToggleScreenShare = () => {
    toggleScreenShare();
    setIsScreenShare((prev) => !prev);
    setPresenterId("");
  };

  // other participants
  const otherParticipants = Array.from(participants.keys()).filter(
    (id) => id === participantsId.find((participantId) => participantId === id)
  );

  const localParticipantId = Array.from(participants.keys())[0];

  const allParticipants = Array.from(participants.keys());

  const handleEnableScreenShare = () => {
    if (presenterId) return;

    enableScreenShare();
  };

  const handleDisableScreenShare = () => {
    disableScreenShare();
    setPresenterId("");
    console.log("disble!!");
  };

  return (
    <div className="container border-2 border-rose-[200px] border-solid flex flex-col h-full">
      {joined ? (
        <>
          <div className="flex flex-col">
            {/* presenter screen */}
            {presenterId && (
              <div className="w-full">
                <ScreenShareView
                  // participantId={presenterId}
                  presenterId={presenterId}
                />
              </div>
            )}
            <div className={`flex ${presenterId && "h-[200px]"}`}>
              {/* participant myself */}
              {/* {localParticipantId && (
                <ParticipantView
                  participantId={localParticipantId}
                  presenterId={presenterId}
                />
              )} */}
              {/* other participant */}
              {/* {otherParticipants.map((participantId: string) => (
                <ParticipantView
                  participantId={participantId}
                  presenterId={presenterId}
                  key={participantId}
                />
              ))} */}
              {/* all */}
              {allParticipants.map((participantId: string) => (
                <ParticipantView
                  participantId={participantId}
                  presenterId={presenterId}
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
