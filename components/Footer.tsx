import { WHATSAPP_NUMBER } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#162B45] text-white px-6 pt-16 pb-10 mt-20">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 pb-12 border-b border-white/10">

          {/* Marca */}
          <div>
            <Image
              src="/Logo%20y%20letras%20lateral_navbar%20web.png"
              alt="Sour San Jerónimo"
              width={180}
              height={48}
              className="object-contain brightness-0 invert opacity-90"
            />
            <p className="text-white/40 text-sm mt-3 max-w-xs leading-relaxed">
              Pisco sour artesanal elaborado con receta tradicional y ingredientes naturales.
            </p>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-3 text-sm">
            <span className="text-white/30 uppercase tracking-widest text-xs font-medium mb-1">Navegar</span>
            <Link href="/#sabores" className="text-white/60 hover:text-white transition-colors">Sabores</Link>
            <Link href="/#contacto" className="text-white/60 hover:text-white transition-colors">Contacto</Link>
            <Link href="/checkout" className="text-white/60 hover:text-white transition-colors">Mi carrito</Link>
          </nav>

          {/* Contacto */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="text-white/30 uppercase tracking-widest text-xs font-medium mb-1">Contacto</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.858L0 24l6.335-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.513-5.215-1.411l-.374-.221-3.758.888.951-3.656-.244-.389A9.933 9.933 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Sour San Jerónimo. Todos los derechos reservados.</p>
          <p>Hecho con cuidado en Chile 🇨🇱</p>
        </div>

      </div>
    </footer>
  );
}
