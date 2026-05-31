"use client";

import { useCart } from "@/components/CartContext";
import { useState } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export type Descuento = {
  codigo: string;
  tipo: "porcentaje" | "monto_fijo";
  valor: number;
  descripcion: string;
};

export default function CheckoutPage() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);

  // Descuento — estado compartido entre Form (lo envía) y Summary (lo muestra)
  const [codigoInput, setCodigoInput] = useState("");
  const [descuento, setDescuento] = useState<Descuento | null>(null);
  const [validandoCodigo, setValidandoCodigo] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState("");

  const aplicarCodigo = async () => {
    if (!codigoInput.trim()) return;
    setValidandoCodigo(true);
    setErrorCodigo("");
    setDescuento(null);
    try {
      const res = await fetch("/api/descuento/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: codigoInput.trim().toUpperCase(),
          items: cart.map(i => ({ productoId: i.productoId, cantidad: i.cantidad })),
        }),
      });
      const data = await res.json();
      if (data.valido) {
        setDescuento({
          codigo: codigoInput.trim().toUpperCase(),
          tipo: data.tipo,
          valor: data.valor,
          descripcion: data.descripcion,
        });
      } else {
        setErrorCodigo("Código no válido o expirado.");
      }
    } catch {
      setErrorCodigo("No se pudo verificar el código. Intenta de nuevo.");
    } finally {
      setValidandoCodigo(false);
    }
  };

  const quitarCodigo = () => {
    setDescuento(null);
    setCodigoInput("");
    setErrorCodigo("");
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-12 rounded-3xl border border-gray-100 max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1f3460] mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">Agrega algunos de nuestros exquisitos sabores antes de continuar.</p>
          <Link href="/#sabores" className="inline-block bg-[#128708] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
            Descubrir sabores
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f3460] mb-2">Finaliza tu compra</h1>
          <p className="text-gray-600 text-lg">Completa tus datos para finalizar tu pedido en pocos segundos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 items-start">

          <div className="order-2 md:order-1">
            <CheckoutForm loading={loading} setLoading={setLoading} descuento={descuento} />
          </div>

          <div className="order-1 md:order-2">
            <CheckoutSummary
              loading={loading}
              descuento={descuento}
              codigoInput={codigoInput}
              setCodigoInput={setCodigoInput}
              validandoCodigo={validandoCodigo}
              errorCodigo={errorCodigo}
              onAplicar={aplicarCodigo}
              onQuitar={quitarCodigo}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
