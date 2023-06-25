const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0YzcyNzQ0Yi03M2RkLTQ2MzctYTFkMS0xZGUxODY2NGFmNTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzA2ODQ0MiwiZXhwIjoxNjk0ODQ0NDQyfQ.RHWaGaFGbMDATcOixhDZmswjA7FSzb7-b7pOjg9iG7g";
const getMeetingId = async (token: string) => {
  try {
    //We will use VideoSDK rooms API endpoint to create a meetingId
    const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // We will pass the token in the headers
        Authorization: token,
      },
    };
    const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { roomId } = await result.json();
        return roomId;
      })
      .catch((error) => console.log("error", error));

    //we will return the meetingId which we got from the response of the api
    return meetingId;
  } catch (e) {
    console.log(e);
  }
};
export const fetchMeetingId = async () => {
  const newMeetingId = await getMeetingId(API_KEY);
  return newMeetingId;
};
