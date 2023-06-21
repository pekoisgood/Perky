"use client";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import ParticipantView from "./ParticipantView";

type PresenterId = null | string;

const MeetingView = ({ meetingId }: { meetingId: string }) => {
  const {
    enableScreenShare,
    disableScreenShare,
    toggleScreenShare,
    // useParticipant,
    toggleMic,
    toggleWebcam,
  } = useMeeting();
  const { leave, end } = useMeeting();
  const [joined, setJoined] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isWebCamOn, setIsWebCamOn] = useState<boolean>(true);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const [presenterId, setPresenterId] = useState<string>("");

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    onPresenterChanged,
    //callback for when meeting is joined successfully
    // onMeetingJoined: () => {
    //   setJoined(true);
    // },
  });

  const joinMeeting = async () => {
    await join();
    setJoined(true);
  };

  const handleToggleScreenShare = () => {
    toggleScreenShare();
    setIsScreenShare((prev) => !prev);
  };

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
  };

  const handleEndMeeting = () => {
    end();
    setJoined(false);
    setIsScreenShare(false);
    setPresenterId("");
    setIsMicOn(true);
    setIsWebCamOn(true);
  };

  //Event to know meeting is left
  //   function onMeetingLeft() {
  //     console.log("onMeetingLeft");
  //   }

  //   function onParticipantLeft(participant) {
  //     console.log(" onParticipantLeft", participant);
  //   }

  //   console.log(participants.keys());

  const handleToggleMic = () => {
    toggleMic();
    setIsMicOn((prev) => !prev);
  };

  const handleToggleWebCam = () => {
    toggleWebcam();
    setIsWebCamOn((prev) => !prev);
  };

  return (
    <div className="container border-2 border-rose-[200px] border-solid">
      {joined ? (
        <div>
          {/* //   className={
        // presenterId
        //   ? "pb-[500px] relative border-2 border-black border-solid min-h-screen bg-sky-300"
        //   :
        // "relative border-2 border-black border-solid min-h-[300px] pb-[80px] bg-red-300"
        //   } */}

          <div
            className={
              // presenterId ? "absolute top-[50px] flex left-0" :
              "flex relative"
            }
          >
            {Array.from(participants.keys()).map((participantId: string) => (
              <ParticipantView
                participantCount={participants.size}
                participantId={participantId}
                presenterId={presenterId}
                key={participantId}
              />
            ))}
          </div>
          <div>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-slate-200 px-4"
                onClick={handleToggleScreenShare}
              >
                {isScreenShare ? "關閉螢幕分享" : "分享螢幕"}
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
            <div></div>
          </div>
        </div>
      ) : joined ? (
        <p>Joining the meeting...</p>
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
