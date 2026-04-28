"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

const sabores = [
  {
    nombre: "Clásico",
    descripcion: "El equilibrio perfecto entre limón sutil y pisco.",
    color: "bg-[#128708]",
    precio: 10990,
  },
  {
    nombre: "Maracuyá",
    descripcion: "Tropical, fresco y ligeramente dulce.",
    color: "bg-orange-400",
    precio: 11990,
  },
  {
    nombre: "Sin azúcar",
    descripcion: "Todo el sabor, sin azúcar añadida.",
    color: "bg-sky-400",
    precio: 11990,
  },
];

export default function Flavors() {
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(sabores.map((s) => [s.nombre, 1]))
  );
  const [pressed, setPressed] = useState<string | null>(null);

  const updateQty = (nombre: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [nombre]: Math.max(1, prev[nombre] + delta),
    }));
  };

  const handleAdd = (sabor: (typeof sabores)[0]) => {
    addToCart({ nombre: sabor.nombre, precio: sabor.precio }, quantities[sabor.nombre]);
    setPressed(sabor.nombre);
    setTimeout(() => setPressed(null), 300);
  };

  return (
    <section id="sabores" className="bg-[#FAF3DE] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#162B45]">
          Nuestros sabores
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sabores.map((sabor) => (
          <div
            key={sabor.nombre}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`w-12 h-12 mx-auto mb-6 rounded-full ${sabor.color}`} />

            <h3 className="text-xl font-semibold text-[#162B45] mb-4">
              {sabor.nombre}
            </h3>

            <p className="text-gray-600 mb-4">{sabor.descripcion}</p>

            <p className="text-2xl font-bold text-[#162B45] mb-6">
              ${sabor.precio.toLocaleString("es-CL")}
            </p>

            {/* Contador de unidades */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => updateQty(sabor.nombre, -1)}
                className="w-8 h-8 rounded-full border border-[#162B45] text-[#162B45] flex items-center justify-center hover:bg-[#162B45] hover:text-white transition text-lg font-bold"
              >
                −
              </button>
              <span className="text-lg font-semibold text-[#162B45] w-4 text-center">
                {quantities[sabor.nombre]}
              </span>
              <button
                onClick={() => updateQty(sabor.nombre, 1)}
                className="w-8 h-8 rounded-full border border-[#162B45] text-[#162B45] flex items-center justify-center hover:bg-[#162B45] hover:text-white transition text-lg font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleAdd(sabor)}
              className={`bg-[#128708] text-white px-5 py-3 rounded-full font-semibold transition-all duration-150 ${
                pressed === sabor.nombre ? "scale-90 opacity-75" : "hover:opacity-90"
              }`}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
