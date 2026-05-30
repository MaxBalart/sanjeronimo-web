import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { items, total, cliente, medioPago } = body;

  // Modo simulación: solo habilitado con variable de entorno privada en servidor
  if (medioPago === "simulacion") {
    if (process.env.SIMULATE_ENABLED !== "true") {
      return NextResponse.json({ error: "Método de pago no válido" }, { status: 400 });
    }
    const orderId = crypto.randomUUID();
    return NextResponse.json({
      success: true,
      orderId,
      url: `/pago-exitoso?orderId=${orderId}`,
    });
  }

  // Producción: delega al backend
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_URL no configurada" },
      { status: 500 }
    );
  }

  const response = await fetch(`${backendUrl}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      totalPesos: total,
      cliente,
      medioPago,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.error ?? "Error al crear el pedido" },
      { status: response.status }
    );
  }

  const { orderId, urlPago } = await response.json();
  return NextResponse.json({ success: true, orderId, url: urlPago });
}
