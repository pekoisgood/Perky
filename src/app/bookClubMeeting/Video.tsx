"use client";
import MeetingView from "./MeetingView";
// import { MeetingProvider } from "@videosdk.live/react-sdk";
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

  // const getMeetingId = async (token: string) => {
  //   try {
  //     //We will use VideoSDK rooms API endpoint to create a meetingId
  //     const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`;
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // We will pass the token in the headers
  //         Authorization: token,
  //       },
  //     };
  //     const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
  //       .then(async (result) => {
  //         const { roomId } = await result.json();
  //         console.log(roomId);
  //         return roomId;
  //       })
  //       .catch((error) => console.log("error", error));

  //     //we will return the meetingId which we got from the response of the api
  //     return meetingId;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const fetchMeetingIdandToken = async () => {
  //   const newMeetingId = await getMeetingId(API_KEY);
  //   console.log(newMeetingId);
  //   setMeetingId(newMeetingId);
  // };

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
