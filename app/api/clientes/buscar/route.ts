import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL ?? "https://sanjeronimo-backend.vercel.app";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ found: false });

  try {
    const res = await fetch(
      `${backendUrl}/clientes/buscar?email=${encodeURIComponent(email)}`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) return NextResponse.json({ found: false });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ found: false });
  }
}
