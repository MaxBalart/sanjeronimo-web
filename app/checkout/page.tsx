"use client";

import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSubmit = async () => {
    if (!nombre || !telefono || !direccion) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
          cliente: { nombre, telefono, direccion },
        }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        setError("Ocurrió un error. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF3DE] pt-24 pb-16 px-6">
      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold text-[#162B45] mb-8">Tu pedido</h1>

        {/* Resumen del carrito */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 min-h-[200px]">
          <h2 className="font-semibold text-[#162B45] mb-4">Resumen</h2>
          
          {!mounted ? (
             <div className="text-center py-4 space-y-3">
               <p className="text-gray-400 text-sm">Cargando...</p>
             </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-4 space-y-3">
              <p className="text-gray-500">Tu carrito está vacío.</p>
              <Link href="/#sabores" className="text-[#128708] font-semibold hover:underline">
                Ver sabores →
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.nombre} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.nombre}
                      <span className="text-gray-400 ml-1">x{item.cantidad}</span>
                    </span>
                    <span className="font-medium text-[#162B45]">
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-[#162B45]">
                <span>Total</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>
            </>
          )}
        </div>

        {/* Formulario — solo si hay items */}
        {mounted && cart.length > 0 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-[#162B45] mb-4">Datos de envío</h2>
              <input
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:border-[#128708] transition"
              />
              <input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:border-[#128708] transition"
              />
              <input
                placeholder="Dirección de envío"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#128708] transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#162B45] text-white py-4 rounded-full font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </>
        )}

      </div>
    </main>
  );
}
