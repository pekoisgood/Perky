"use client";
// import { useState } from "react";
import dynamic from "next/dynamic";

const MeetingProvider = dynamic(
  () =>
    import("@videosdk.live/react-sdk").then((module) => module.MeetingProvider),
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

const Video = () => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0YzcyNzQ0Yi03M2RkLTQ2MzctYTFkMS0xZGUxODY2NGFmNTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzA2ODQ0MiwiZXhwIjoxNjk0ODQ0NDQyfQ.RHWaGaFGbMDATcOixhDZmswjA7FSzb7-b7pOjg9iG7g";
  // const [meetingId, setMeetingId] = useState<string>("izv6-qwal-uk0d");
  const meetingId = "izv6-qwal-uk0d";

  return (
    <div className="border-solid border-[1px] border-black h-full">
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
    </div>
  );
};

export default Video;
