"use client";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    num: "01",
    titulo: "Sin atajos",
    texto: "Exprimimos limón real. Nada de concentrados ni sabores artificiales.",
  },
  {
    num: "02",
    titulo: "Receta que se respeta",
    texto: "No optimizamos para bajar costos, optimizamos para el sabor más puro.",
  },
  {
    num: "03",
    titulo: "Un sour de verdad",
    texto: "El mismo que compartirías con alguien importante.",
  },
];

export default function Benefits() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#FAF3DE] py-24 md:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Cabecera de sección */}
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#1f3460]/40">
            Elaboración
          </span>
          <div className="flex-1 h-px bg-[#1f3460]/10" />
        </div>

        {/* Título */}
        <h2
          className={`text-4xl md:text-6xl font-bold text-[#1f3460] tracking-tight leading-none mb-20 md:mb-24 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "80ms" }}
        >
          Hecho como<br className="hidden md:block" /> debe ser
        </h2>

        {/* Items editoriales */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <div
              key={item.num}
              className={`group relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${180 + i * 120}ms` }}
            >
              {/* Separador vertical entre columnas */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[#1f3460]/10" />
              )}

              {/* Separador horizontal en mobile */}
              {i > 0 && (
                <div className="md:hidden h-px bg-[#1f3460]/10 mb-10" />
              )}

              <div className="md:px-10 pb-4 md:pb-0">
                {/* Numeral */}
                <span
                  className="block text-[5rem] md:text-[6rem] font-bold leading-none tracking-tighter text-[#1f3460] mb-6 transition-all duration-500 group-hover:translate-x-1"
                  style={{ opacity: 0.15 }}
                >
                  {item.num}
                </span>

                {/* Título */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#1f3460] mb-3 transition-all duration-300 group-hover:translate-x-1">
                  {item.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-[#1f3460]/55 text-sm md:text-base leading-relaxed max-w-xs transition-all duration-300 group-hover:text-[#1f3460]/80">
                  {item.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
