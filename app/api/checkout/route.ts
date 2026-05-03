import { NextResponse } from "next/server";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export async function POST(req: Request) {
  const body = await req.json();
  const { items, total, cliente } = body;

  const orderId = Date.now().toString();

  const lineasProducto = items
    .map((i: { nombre: string; cantidad: number }) => `- ${i.nombre} x${i.cantidad}`)
    .join("\n");

  const mensaje = [
    `Hola! Quiero confirmar mi pedido #${orderId}:`,
    lineasProducto,
    `Total: $${Number(total).toLocaleString("es-CL")}`,
    cliente?.nombre ? `Nombre: ${cliente.nombre}` : "",
    cliente?.telefono ? `Teléfono: ${cliente.telefono}` : "",
    cliente?.direccion ? `Dirección: ${cliente.direccion}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

  // TODO: reemplazar url por pasarela Flow/MercadoPago cuando esté lista
  return NextResponse.json({ success: true, orderId, url });
}
