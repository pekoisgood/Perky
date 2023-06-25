import { NextResponse } from "next/server";
import { getRecord } from "@/utils/firebase";

export async function GET() {
  const data = await getRecord(
    "bookClubs",
    "attendees",
    "array-contains",
    "peko1234",
    "time"
  );

  return NextResponse.json(data);
}
