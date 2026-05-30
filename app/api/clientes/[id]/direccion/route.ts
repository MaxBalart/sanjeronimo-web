import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL ?? "https://sanjeronimo-backend.vercel.app";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const res = await fetch(`${backendUrl}/clientes/${id}/direccion`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false });
  }
}
