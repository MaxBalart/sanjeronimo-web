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

  return (
    <section className="bg-gradient-to-b from-[#FAF3DE] to-[#fefcf8] py-24 md:py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto text-left">
        <div className="h-[1px] bg-[#162B45]/10 mb-16" />
        
        <h2
          className={`text-4xl md:text-5xl font-bold text-[#162B45] tracking-tight mb-20 max-w-xl text-center md:text-left mx-auto md:mx-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          Hecho como debe ser
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-28 items-start">
          
          {/* COLUMNA IZQUIERDA (PROTAGONISTA) */}
          <div 
            className={`max-w-md mx-auto md:mx-0 text-center md:text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-3xl md:text-4xl tracking-tight leading-tight font-semibold text-[#162B45] mb-4">
              Sin atajos.
            </h3>
            <p className="mt-4 text-[#162B45]/70 text-lg md:text-xl leading-relaxed transition-colors duration-300 md:hover:text-[#162B45]/90">
              Exprimimos limón real. Nada de concentrados ni sabores artificiales.
            </p>
          </div>

          {/* COLUMNA DERECHA (SECUNDARIOS) */}
          <div className="flex flex-col space-y-8 md:mt-4">
            
            <div
              className={`text-center md:text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:translate-x-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#162B45] mb-1">
                Receta que se respeta
              </h3>
              <p className="text-[#162B45]/65 text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0 transition-colors duration-300 md:hover:text-[#162B45]/90">
                No optimizamos para costo, optimizamos para sabor.
              </p>
            </div>

            <div
              className={`text-center md:text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:translate-x-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#162B45] mb-1">
                Un sour de verdad
              </h3>
              <p className="text-[#162B45]/65 text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0 transition-colors duration-300 md:hover:text-[#162B45]/90">
                El mismo que compartirías con amigos.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
