"use client";

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
    precio: 10990,
  },
  {
    nombre: "Sin azúcar",
    descripcion: "Todo el sabor, sin azúcar añadida.",
    color: "bg-sky-400",
    precio: 11990,
  },
];

export default function Flavors() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <section id="sabores" className="bg-[#FAF3DE] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#162B45]">
          Nuestros sabores
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sabores.map((sabor) => {
          const enCarrito = cart.find((i) => i.nombre === sabor.nombre);

          return (
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

              {enCarrito ? (
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
