import { WHATSAPP_NUMBER } from "@/lib/constants";
import B2BForm from "@/components/B2BForm";

const TIPOS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    titulo: "Restaurantes",
    texto: "Complementa tu carta con un sour artesanal que habla por sí solo. Sin capacitación, listo para servir.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-.659 1.591l-1.591 1.591M19.8 15l-3.43-3.43m0 0L12 15m4.37-3.43A2.25 2.25 0 0114.25 12H9.75a2.25 2.25 0 01-2.12-1.43M12 15v6m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
    titulo: "Bares y coctelería",
    texto: "Un sour premium que eleva la experiencia de tu barra. Consistente en cada copa, con la historia detrás.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    titulo: "Eventos y catering",
    texto: "Para matrimonios, corporativos y celebraciones que merecen algo distinto. Disponible en volumen.",
  },
];

const RAZONES = [
  {
    num: "01",
    titulo: "Listo para servir",
    texto: "Sin preparación compleja ni barman especializado. Se abre, se sirve. Tus operaciones no cambian.",
  },
  {
    num: "02",
    titulo: "Consistencia que cuida tu reputación",
    texto: "Misma receta, mismo sabor en cada botella. Tus clientes siempre reciben lo que esperan.",
  },
  {
    num: "03",
    titulo: "Marca con historia que suma a tu carta",
    texto: "San Jerónimo no es un sour genérico. Es una historia que tu equipo puede contar y tu cliente puede recordar.",
  },
];

export default function ParaTuNegocioPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-[#1f3460] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/30 mb-6 block">
            Canal B2B
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-2xl">
            El sour que sube el nivel de tu negocio.
          </h1>
          <p className="text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            San Jerónimo es pisco sour artesanal premium, listo para servir.
            Distribución directa, atención personalizada y una marca que tus clientes van a preguntar.
          </p>
          <a
            href="#contacto-b2b"
            className="inline-block bg-[#128708] text-white px-8 py-4 rounded-full font-bold text-base hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] duration-150"
          >
            Consultar disponibilidad
          </a>
        </div>
      </section>

      {/* Para quién */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1f3460]/35 mb-12 block">
            Para tu tipo de negocio
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIPOS.map(tipo => (
              <div key={tipo.titulo} className="group">
                <div className="w-12 h-12 rounded-xl bg-[#1f3460]/6 flex items-center justify-center text-[#1f3460] mb-5 transition-colors duration-300 group-hover:bg-[#1f3460]/10">
                  {tipo.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1f3460] mb-2 tracking-tight">{tipo.titulo}</h3>
                <p className="text-[#1f3460]/55 text-sm leading-relaxed">{tipo.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué San Jerónimo */}
      <section className="bg-[#FAF3DE] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#1f3460]/40">
              Por qué elegirnos
            </span>
            <div className="flex-1 h-px bg-[#1f3460]/10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1f3460] tracking-tight leading-none mb-20">
            Sin atajos.<br className="hidden md:block" /> Sin compromisos.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {RAZONES.map((r, i) => (
              <div key={r.num} className="group relative">
                {i > 0 && <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[#1f3460]/10" />}
                {i > 0 && <div className="md:hidden h-px bg-[#1f3460]/10 mb-10" />}
                <div className="md:px-10 pb-4 md:pb-0">
                  <span className="block text-[5rem] font-bold leading-none tracking-tighter text-[#1f3460] mb-6 transition-transform duration-500 group-hover:translate-x-1" style={{ opacity: 0.12 }}>
                    {r.num}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1f3460] mb-3 transition-transform duration-300 group-hover:translate-x-1">
                    {r.titulo}
                  </h3>
                  <p className="text-[#1f3460]/55 text-sm leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-[#1f3460]/80">
                    {r.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de contacto B2B */}
      <section id="contacto-b2b" className="bg-white py-20 px-6">
        <div className="max-w-2xl mx-auto">

          <div className="mb-10">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1f3460]/35 mb-4 block">
              Contacto B2B
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f3460] tracking-tight mb-3">
              Cuéntanos sobre tu negocio
            </h2>
            <p className="text-[#1f3460]/55 leading-relaxed">
              Completa el formulario y nos ponemos en contacto en menos de 24 horas.
            </p>
          </div>

          <B2BForm />

          {/* CTA alternativo WhatsApp */}
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-[#1f3460]/40 mb-4">¿Prefieres hablar directo?</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me interesa San Jerónimo para mi negocio")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#128708] font-semibold hover:opacity-80 transition-opacity duration-150"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.513-5.215-1.411l-.374-.221-3.758.888.951-3.656-.244-.389A9.933 9.933 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}
