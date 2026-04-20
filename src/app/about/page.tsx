import React from "react";
import Image from "next/image";
import { Instagram, Heart, Sparkles, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: "Conoce la historia detrás de El Hilo Enredado. Artesanía, pasión por la costura y detalles hechos a mano con mucho cariño.",
  openGraph: {
    title: "Sobre Mí | El Hilo Enredado",
    description: "Conoce la historia detrás de El Hilo Enredado y nuestra pasión por la artesanía.",
    url: "https://elhiloenredado.com/about",
  }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Sección Hero de "Sobre Mí" */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
             {/* Imagen representativa (en un caso real sería la dueña) */}
             <div className="absolute inset-0 bg-sand/30 flex items-center justify-center">
                <p className="text-muted-foreground italic">Foto de la artesana</p>
             </div>
             <Image 
                src="/product/adorno-puerta.png" // Usando una imagen existente como placeholder con efecto
                alt="Sobre El Hilo Enredado"
                fill
                className="object-cover opacity-80"
             />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
              Hola, soy la cara detrás de <span className="text-sage">El Hilo Enredado</span>
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Lo que empezó como un hobby heredado de mis abuelas, se convirtió en mi pasión. 
              En cada puntada, en cada hilo elegido, hay un pedacito de mi historia y del amor 
              que siento por las cosas hechas a mano.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Creo en el valor de lo único. En un mundo de producción en masa, mis creaciones 
              buscan traer calidez, personalidad y ese toque artesanal que hace que un objeto 
              se sienta verdaderamente tuyo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8">
                Ver mi catálogo
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                <Instagram className="h-5 w-5" />
                Sígueme en Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Valores / Características */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Lo que nos hace especiales</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Hecho con Amor</h3>
              <p className="text-sm text-muted-foreground">Cada pieza es única y recibe toda mi atención durante horas.</p>
            </div>
            
            <div className="bg-background p-8 rounded-xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Personalizado</h3>
              <p className="text-sm text-muted-foreground">Tú eliges los detalles para que el producto hable de ti.</p>
            </div>
            
            <div className="bg-background p-8 rounded-xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Materiales Eco</h3>
              <p className="text-sm text-muted-foreground">Selecciono telas naturales y sostenibles siempre que es posible.</p>
            </div>
            
            <div className="bg-background p-8 rounded-xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                <Instagram className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Cercanía</h3>
              <p className="text-sm text-muted-foreground">Estoy a un mensaje de distancia para resolver cualquier duda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center pb-20">
        <div className="bg-primary text-primary-foreground p-12 rounded-3xl shadow-xl overflow-hidden relative">
           <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Hablamos?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
                Si tienes un proyecto en mente o buscas algo específico, estaré encantada de escucharte y darle forma con mis hilos.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 font-bold">
                Contactar por WhatsApp
              </Button>
           </div>
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
