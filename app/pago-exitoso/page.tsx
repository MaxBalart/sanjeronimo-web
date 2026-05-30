"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function PagoExitosoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="bg-white rounded-3xl border border-gray-100 max-w-md w-full p-12">
        {/* Ícono de éxito */}
        <div className="w-20 h-20 bg-[#128708]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#128708]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[#1f3460] tracking-tight mb-3">
          ¡Pedido confirmado!
        </h1>

        <p className="text-[#1f3460]/60 mb-2">
          Gracias por tu compra. Te enviamos la confirmación y boleta a tu correo electrónico.
        </p>

        {orderId && (
          <p className="text-sm text-[#1f3460]/40 mt-4 mb-8 font-mono">
            Orden #{orderId}
          </p>
        )}

        {!orderId && <div className="mb-8" />}

        <div className="border-t border-[#1f3460]/10 pt-8 space-y-3">
          <p className="text-sm text-[#1f3460]/50 mb-4">
            Nos pondremos en contacto para coordinar el despacho.
          </p>

          <Link
            href="/"
            className="block bg-[#128708] text-white px-8 py-4 rounded-full font-bold hover:bg-[#0e6e06] active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            Volver al inicio
          </Link>

          <Link
            href="/#sabores"
            className="block text-[#1f3460]/60 hover:text-[#1f3460] py-3 text-sm transition-colors duration-150"
          >
            Ver más sabores
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PagoExitosoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF3DE]" />}>
      <PagoExitosoContent />
    </Suspense>
  );
}
