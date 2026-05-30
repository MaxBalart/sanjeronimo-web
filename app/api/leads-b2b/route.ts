import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL ?? "https://sanjeronimo-backend.vercel.app";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${backendUrl}/leads-b2b`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
