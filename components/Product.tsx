export default function Product() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Imagen */}
        <img
        src="/Botella.png"
        alt="Sour San Jerónimo"
        className="w-[220px] md:w-[280px] object-contain"
        />

        {/* Texto */}
        <div className="text-center md:text-left">

          <h2 className="text-3xl md:text-4xl font-bold text-[#162B45] mb-6">
  El equilibrio perfecto
</h2>

<p className="text-lg text-gray-700 mb-8">
  Preparado con limón sutil, pisco seleccionado y una receta artesanal 
  que respeta el verdadero sabor del pisco sour.
</p>

          <a
            href="#sabores"
            className="inline-block bg-[#128708] text-white px-6 py-3 rounded-full text-lg hover:opacity-90 transition"
          >
            Pedir ahora
          </a>

        </div>

      </div>

    </section>
  );
}