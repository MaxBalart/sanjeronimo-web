import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL ?? "https://sanjeronimo-backend.vercel.app";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const res = await fetch(`${backendUrl}/descuentos/validar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return NextResponse.json({ valido: false });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ valido: false });
  }
}
