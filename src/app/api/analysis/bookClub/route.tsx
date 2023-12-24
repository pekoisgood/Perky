import { NextResponse } from "next/server";
import { getRecord } from "@/utils/firebase/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) throw "user not found";

  const data = await getRecord(
    "bookClubs",
    "attendees",
    "array-contains",
    userId,
    "time",
    true
  );

  return NextResponse.json(data);
}
