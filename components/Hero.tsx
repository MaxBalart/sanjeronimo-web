export default function Hero() {
  return (
    <section className="bg-[#FAF3DE] min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

      <h1 className="text-4xl md:text-6xl font-bold text-[#162B45] mb-6">
        Sour San Jerónimo
      </h1>

      <p className="text-lg md:text-xl text-[#162B45] mb-8 max-w-xl">
        Un sour premium con historia
      </p>

      <a
        href="#sabores"
        className="bg-[#128708] text-white px-6 py-3 rounded-full text-lg hover:opacity-90 transition"
      >
        Comprar ahora
      </a>

    </section>
  );
}