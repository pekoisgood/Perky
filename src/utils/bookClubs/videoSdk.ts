const getMeetingId = async () => {
  try {
    const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_VIDEO_SDK_API_KEY!,
      },
    };

    const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { roomId } = await result.json();
        return roomId;
      })
      .catch((error) => error);
    return meetingId;
  } catch (e) {
    return;
  }
};
export const fetchMeetingId = async () => {
  const newMeetingId = await getMeetingId();
  return newMeetingId;
};
