"use client";
import { useEffect, useRef, useState } from "react";

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const blocks = [
    {
      title: "Sin atajos",
      text: "Exprimimos limón real. Nada de concentrados ni sabores artificiales.",
    },
    {
      title: "Receta que se respeta",
      text: "No optimizamos para costo, optimizamos para sabor.",
    },
    {
      title: "Un sour de verdad",
      text: "El mismo que compartirías con amigos.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FAF3DE] to-white py-24 md:py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto text-center md:text-left">
        <div className="h-[1px] bg-[#162B45]/10 mb-16" />
        <h2
          className={`text-4xl md:text-5xl max-w-xl mx-auto md:mx-0 font-bold text-[#162B45] tracking-tight mb-12 md:mb-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Hecho como debe ser
        </h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {blocks.map((block, i) => (
            <div
              key={i}
              className={`flex flex-col items-center md:items-start transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ 
                transitionDelay: `${(i + 1) * 200}ms`,
                transform: isVisible && i === 0 ? "scale(1.02)" : "scale(1)"
              }}
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#162B45] mb-3">
                {block.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[280px] md:max-w-none">
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
