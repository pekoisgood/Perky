import { AuthContext } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useContext } from "react";

type Props = {
  roomId: string;
};

const MeetingProvider = dynamic(
  () =>
    import("@videosdk.live/react-sdk").then((module) => module.MeetingProvider),
  {
    ssr: false,
  }
);
const MeetingView = dynamic(
  () => import("../../../components/videoMeeting/MeetingView"),
  {
    ssr: false,
  }
);

const Video = ({ roomId }: Props) => {
  const { user } = useContext(AuthContext);
  const API_KEY = process.env.NEXT_PUBLIC_VIDEO_SDK_API_KEY;

  if (!roomId || !API_KEY) return <></>;

  return (
    <MeetingProvider
      config={{
        meetingId: roomId,
        micEnabled: true,
        webcamEnabled: true,
        participantId: user.id,
        name: user.name,
      }}
      token={API_KEY}
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default Video;
