import dynamic from "next/dynamic";

type Props = {
  roomId: string;
};

const MeetingProvider = dynamic(
  () =>
    import("@videosdk.live/react-sdk").then((module) => module.MeetingProvider),
  {
    ssr: false, // 關閉伺服器端渲染
  }
);
const MeetingView = dynamic(
  () => import("../../../components/videoMeeting/MeetingView"),
  {
    ssr: false,
  }
);

const Video = ({ roomId }: Props) => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0YzcyNzQ0Yi03M2RkLTQ2MzctYTFkMS0xZGUxODY2NGFmNTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzA2ODQ0MiwiZXhwIjoxNjk0ODQ0NDQyfQ.RHWaGaFGbMDATcOixhDZmswjA7FSzb7-b7pOjg9iG7g";

  if (!roomId || !API_KEY) return <></>;

  return (
    <div className="h-full w-full ml-2">
      <MeetingProvider
        config={{
          meetingId: roomId,
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
