import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { items, total } = body;

  // Aquí vas a construir la orden
  const orderId = Date.now().toString();

  // ⚠️ luego conectamos con Flow
  console.log("Orden creada:", { orderId, items, total });

  return NextResponse.json({
    success: true,
    orderId,
  });
}