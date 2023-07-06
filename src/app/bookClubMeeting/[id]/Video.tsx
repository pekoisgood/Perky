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
  const API_KEY = process.env.NEXT_PUBLIC_VIDEO_SDK_API_KEY;

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
