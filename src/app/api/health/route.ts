import { NextResponse } from "next/server";

export async function GET() {
  console.log("/api/health hit");
  return NextResponse.json({ status: "ok" }, { status: 200 });
}


