"use client";

import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { SABORES } from "@/lib/data";
import Link from "next/link";

export default function Flavors() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="sabores" className="bg-[#FAF3DE] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#162B45]">
          Nuestros sabores
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {SABORES.map((sabor) => {
          const enCarrito = cart.find((i) => i.nombre === sabor.nombre);

          return (
            <div
              key={sabor.nombre}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <Link href={`/sabores/${sabor.slug}`} className="block group mb-6">
                <div className={`w-12 h-12 mx-auto mb-6 rounded-full ${sabor.color} transition-transform group-hover:scale-110`} />

                <h3 className="text-xl font-semibold text-[#162B45] mb-4 group-hover:text-[#128708] transition-colors">
                  {sabor.nombre}
                </h3>

                <p className="text-gray-600 mb-4">{sabor.descripcion}</p>

                <p className="text-2xl font-bold text-[#162B45]">
                  ${sabor.precio.toLocaleString("es-CL")}
                </p>
                <span className="text-[#128708] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Ver detalles →</span>
              </Link>

              {mounted && enCarrito ? (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => removeFromCart(sabor.nombre)}
                    className="w-9 h-9 rounded-full bg-[#128708] text-white flex items-center justify-center text-xl font-bold hover:opacity-80 transition"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold text-[#162B45] w-5 text-center">
                    {enCarrito.cantidad}
                  </span>
                  <button
                    onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                    className="w-9 h-9 rounded-full bg-[#128708] text-white flex items-center justify-center text-xl font-bold hover:opacity-80 transition"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart({ nombre: sabor.nombre, precio: sabor.precio })}
                  className="bg-[#128708] text-white px-5 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
