"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const PRODUCTOS = [
  {
    nombre: "Clásico",
    titulo: "El equilibrio perfecto",
    descripcion: "Limón sutil, pisco seleccionado y receta artesanal. El verdadero sabor del pisco sour.",
    imagen: "/Botella.png",
    color: "#128708",
  },
  {
    nombre: "Maracuyá",
    titulo: "El toque tropical perfecto",
    descripcion: "Maracuyá fresco con nuestro sour clásico. Dulzor y acidez en perfecto equilibrio.",
    imagen: "/Botella_Maracuya.png",
    color: "#F5A300",
  },
  {
    nombre: "Sin azúcar",
    titulo: "Todo el sabor, sin azúcar",
    descripcion: "Misma receta artesanal, sin azúcar añadida. Disfruta sin compromisos.",
    imagen: "/Botella_SinAzucar.png",
    color: "#38BDF8",
  },
];

export default function FeatureProduct() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (index: number) => {
    if (index === current) return;
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % PRODUCTOS.length);
        setVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const producto = PRODUCTOS[current];

  return (
    <section className="bg-white py-20 px-6">

      {/* Línea superior */}
      <div
        className="h-[5px] w-full transition-colors duration-500 mb-12 opacity-80"
        style={{ backgroundColor: producto.color }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

{/* Imagen */}
<div
  className={`relative flex justify-center items-end transition-all duration-500 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`}
>
  {/* sombra mejorada animada */}
  <div className="absolute bottom-3 w-[140px] md:w-[180px] h-[22px] bg-[#162B45]/20 blur-2xl rounded-full animate-shadow" />

  <Image
    src={producto.imagen}
    alt={`Sour San Jerónimo ${producto.nombre}`}
    width={340}
    height={560}
    className="relative z-10 object-contain w-[160px] md:w-[220px] h-auto animate-float-bottle"
  />
</div>

        {/* Texto */}
        <div className="text-center md:text-left">

          {/* Pills */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
            {PRODUCTOS.map((p, i) => (
              <button
                key={p.nombre}
                onClick={() => goTo(i)}
                aria-pressed={i === current}
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: i === current ? `${p.color}18` : "transparent",
                  color: i === current ? p.color : "#9CA3AF",
                }}
              >
                {p.nombre}
              </button>
            ))}
          </div>

          {/* Contenido animado */}
          <div
            className={`transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#162B45] leading-tight mb-5 max-w-sm mx-auto md:mx-0">
              {producto.titulo}
            </h2>

            <p className="text-lg text-[#162B45]/60 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
              {producto.descripcion}
            </p>

            <a
              href="#sabores"
              className="inline-block text-white px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
              style={{ backgroundColor: producto.color }}
            >
              Lo quiero
            </a>
          </div>

        </div>
      </div>

      {/* Línea inferior */}
      <div
        className="h-[5px] w-full transition-colors duration-500 mt-16 opacity-80"
        style={{ backgroundColor: producto.color }}
      />

    </section>
  );
}
