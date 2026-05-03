export default function Benefits() {
  const benefits = [
    {
      title: "Ingredientes 100% Naturales",
      description: "Limón sutil fresco y pisco seleccionado, sin preservantes artificiales.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ) // Replaced with a leaf icon
    },
    {
      title: "Receta Original y Casera",
      description: "Elaborado con la misma receta familiar que ha encantado por años.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 14c-2.4 0-4-1.6-4-4s1.6-4 4-4 4 1.6 4 4-1.6 4-4 4Z" />
          <path d="M7 14c-2.4 0-4-1.6-4-4s1.6-4 4-4 4 1.6 4 4-1.6 4-4 4Z" />
          <path d="M12 21c-3.9 0-7-3.1-7-7" />
          <path d="M19 14c0 3.9-3.1 7-7 7" />
          <path d="M12 2v8" />
        </svg>
      ) // Cocktail / drink inspired icon
    },
    {
      title: "Envíos a todo Chile",
      description: "Llevamos el mejor sabor directo a la puerta de tu casa, rápido y seguro.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      ) // Truck icon
    }
  ];

  // Actually let's use slightly better fitting icons for the leaf/lemon
  const icons = [
    // Leaf / Nature (Ingredientes)
    <svg key="leaf" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#128708]">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>,
    // Heart / Homemade (Receta original)
    <svg key="heart" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#128708]">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>,
    // Truck / Shipping (Envíos)
    <svg key="truck" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#128708]">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/>
      <circle cx="7" cy="18" r="2"/>
    </svg>
  ];

  return (
    <section className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#162B45]">
            ¿Por qué elegirnos?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#128708]/10 rounded-full flex items-center justify-center mb-6">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-[#162B45] mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
