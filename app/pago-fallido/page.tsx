"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function PagoFallidoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="bg-white rounded-3xl border border-gray-100 max-w-md w-full p-12">
        {/* Ícono de error */}
        <div className="w-20 h-20 bg-[#ee7203]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#ee7203]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-[#1f3460] tracking-tight mb-3">
          Hubo un problema con el pago
        </h1>

        <p className="text-[#1f3460]/60 mb-2">
          No se realizó ningún cargo. Puedes intentarlo de nuevo o usar otro método de pago.
        </p>

        {orderId && (
          <p className="text-sm text-[#1f3460]/40 mt-4 mb-8 font-mono">
            Orden #{orderId}
          </p>
        )}

        {!orderId && <div className="mb-8" />}

        <div className="border-t border-[#1f3460]/10 pt-8 space-y-3">
          <Link
            href="/checkout"
            className="block bg-[#1f3460] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1f3460] active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            Intentar de nuevo
          </Link>

          <Link
            href="/"
            className="block text-[#1f3460]/60 hover:text-[#1f3460] py-3 text-sm transition-colors duration-150"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PagoFallidoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF3DE]" />}>
      <PagoFallidoContent />
    </Suspense>
  );
}
