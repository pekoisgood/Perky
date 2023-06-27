"use client";
// import { useState } from "react";
import dynamic from "next/dynamic";

const Video = () => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0YzcyNzQ0Yi03M2RkLTQ2MzctYTFkMS0xZGUxODY2NGFmNTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzA2ODQ0MiwiZXhwIjoxNjk0ODQ0NDQyfQ.RHWaGaFGbMDATcOixhDZmswjA7FSzb7-b7pOjg9iG7g";
  // const [meetingId, setMeetingId] = useState<string>("izv6-qwal-uk0d");
  const meetingId = "izv6-qwal-uk0d";

  const MeetingProvider = dynamic(
    () =>
      import("@videosdk.live/react-sdk").then(
        (module) => module.MeetingProvider
      ),
    {
      ssr: false, // 關閉伺服器端渲染
    }
  );
  const MeetingView = dynamic(
    () => import("../../components/videoMeeting/MeetingView"),
    {
      ssr: false,
    }
  );

  return (
    <div className="border-solid border-[1px] border-black h-full">
      {/* <button
        onClick={() => {
          setIsJoin(true);
          //   fetchMeetingIdandToken();
        }}
      >
        Create a new meeting room
      </button> */}
      {/* {isJoin && meetingId ? ( */}
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "張孟潔's Org",
        }}
        token={API_KEY}
      >
        <MeetingView />
      </MeetingProvider>
      {/* ) : (
        <div>
          <button
            onClick={() => {
              setIsJoin(true);
            }}
          >
            Enter Room
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Video;
