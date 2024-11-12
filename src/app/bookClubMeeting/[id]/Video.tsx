import dynamic from "next/dynamic";

import { useAppSelector } from "@/redux/hooks";

type Props = {
  roomId: string;
};

const MeetingProvider = dynamic(
  () =>
    import("@videosdk.live/react-sdk").then((module) => module.MeetingProvider),
  {
    ssr: false,
  },
);
const MeetingView = dynamic(
  () => import("../../../components/VideoMeeting/MeetingView"),
  {
    ssr: false,
  },
);

const Video = ({ roomId }: Props) => {
  const user = useAppSelector((state) => state.auth.value);

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
        debugMode: false,
      }}
      token={API_KEY}
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default Video;
