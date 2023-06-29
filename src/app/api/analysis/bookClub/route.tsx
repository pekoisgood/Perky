import { NextResponse } from "next/server";
import { getRecord } from "@/utils/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) return; //FIXME -> 我想throw error

  const data = await getRecord(
    "bookClubs",
    "attendees",
    "array-contains",
    userId,
    "time"
  );

  return NextResponse.json(data);
}
