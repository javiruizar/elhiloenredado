import React from 'react';

export const About = () => {
  return (
    <section id="about" className="bg-secondary py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <h2 className="text-3xl font-bold text-primary mb-6">Sobre El Hilo Enredado</h2>
        <p className="text-foreground/80 leading-relaxed">
          Hola, soy [Tu Nombre], la artesana detrás de El Hilo Enredado. Mi pasión es crear objetos hermosos y duraderos con mis propias manos. Cada pieza es un pedazo de mi dedicación, utilizando técnicas tradicionales como el crochet y el macramé con un toque moderno. Espero que encuentres algo que te encante y que traiga alegría a tu hogar.
        </p>
      </div>
    </section>
  );
};
