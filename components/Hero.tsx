export default function Hero() {
  return (
    <section className="bg-[#FAF3DE] min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">

      <div className="flex flex-col items-center mb-6">
        <span className="text-2xl md:text-4xl font-bold text-[#162B45] tracking-widest uppercase mb-2">
          Sour
        </span>
        <h1 
          className="text-6xl md:text-[6rem] leading-none text-[#162B45] tracking-wide uppercase"
          style={{ fontFamily: '"Phosphate Inline", Phosphate, sans-serif' }}
        >
          San Jerónimo
        </h1>
      </div>

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