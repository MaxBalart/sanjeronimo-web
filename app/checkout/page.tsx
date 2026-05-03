"use client";

import { useCart } from "@/components/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    metodoPago: "flow",
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total,
        cliente: form,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* DATOS CLIENTE */}
      <input
        placeholder="Nombre"
        className="w-full border p-2 mb-3"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        placeholder="Teléfono"
        className="w-full border p-2 mb-3"
        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
      />

      <input
        placeholder="Dirección"
        className="w-full border p-2 mb-3"
        onChange={(e) => setForm({ ...form, direccion: e.target.value })}
      />

      {/* MÉTODO DE PAGO */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Método de pago</p>

        <label className="block">
          <input
            type="radio"
            name="metodo"
            value="flow"
            checked={form.metodoPago === "flow"}
            onChange={() => setForm({ ...form, metodoPago: "flow" })}
          />
          Flow
        </label>

        <label className="block">
          <input
            type="radio"
            name="metodo"
            value="mercadopago"
            onChange={() =>
              setForm({ ...form, metodoPago: "mercadopago" })
            }
          />
          MercadoPago
        </label>
      </div>

      {/* RESUMEN */}
      <div className="mb-4">
        <p>Total: ${total.toLocaleString("es-CL")}</p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#162B45] text-white py-3 rounded-full"
      >
        Ir a pagar
      </button>
    </main>
  );
}