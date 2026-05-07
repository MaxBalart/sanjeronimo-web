"use client";

import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { SABORES } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Flavors() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="sabores" className="bg-[#FAF3DE] py-20 px-6">
      <div className="max-w-6xl mx-auto mb-14">
        <div className="h-px bg-[#162B45]/10 mb-12" />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#162B45]">
          Elige el tuyo
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SABORES.map((sabor) => {
          const enCarrito = cart.find((i) => i.nombre === sabor.nombre);

          return (
            <div
              key={sabor.nombre}
              className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-8 text-center transition-all duration-300 flex flex-col"
            >
              <Link href={`/sabores/${sabor.slug}`} className="block group mb-6 flex-1">
                <div className="h-[140px] flex items-end justify-center mb-6">
                  <Image
                    src={sabor.imagen}
                    alt={sabor.nombre}
                    width={80}
                    height={130}
                    className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                  />
                </div>

                <h3 className="text-xl font-semibold text-[#162B45] mb-3 group-hover:text-[#128708] transition-colors">
                  {sabor.nombre}
                </h3>

                <p className="text-[#162B45]/60 text-sm mb-4 leading-relaxed">{sabor.descripcion}</p>

                <p className="text-2xl font-bold text-[#162B45]">
                  ${sabor.precio.toLocaleString("es-CL")}
                </p>
                <span className="text-[#128708] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-1 block">Ver detalles →</span>
              </Link>

              {mounted && enCarrito ? (
                <div className="flex items-center justify-center gap-3 mt-2">
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
                  className="mt-2 bg-[#128708] text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 w-full"
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
