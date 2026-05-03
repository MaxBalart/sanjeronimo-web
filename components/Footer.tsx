import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#162B45] text-white py-10 px-6 mt-20">

      <div className="max-w-6xl mx-auto text-center">

        <p className="mb-4">
          © {new Date().getFullYear()} Sour San Jerónimo
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Contáctanos por WhatsApp
        </a>

      </div>

    </footer>
  );
}