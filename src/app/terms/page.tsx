import React from 'react';

export const metadata = {
  title: 'Condiciones del Servicio | El Hilo Enredado',
  description: 'Términos y condiciones de uso de la tienda online El Hilo Enredado.',
};

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8 border-b border-sand/50 pb-4">
          Condiciones del Servicio
        </h1>
        
        <div className="prose prose-sage max-w-none text-foreground/80 space-y-6">
          <p className="italic text-sm">Última actualización: 24 de abril de 2026</p>
          
          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar este sitio web, aceptas quedar vinculado por estas Condiciones del Servicio y por todas las leyes y reglamentos aplicables. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">2. Productos y Artesanía</h2>
            <p>
              Muchos de nuestros productos son hechos a mano y personalizados. Debido a su naturaleza artesanal, pueden existir ligeras variaciones en el color, textura o acabado respecto a las imágenes mostradas en la web. Estas variaciones son parte del encanto de un producto único.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">3. Proceso de Pago y Confirmación</h2>
            <p>
              Actualmente gestionamos los pagos mediante métodos directos (Bizum o transferencia) para asegurar la personalización de cada pedido. El pedido solo se considerará firme una vez confirmado el pago por nuestra parte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">4. Política de Devoluciones</h2>
            <p>
              Al tratarse de artículos personalizados, no se aceptan devoluciones a menos que el producto presente un defecto de fabricación o error por nuestra parte en la personalización. Para artículos no personalizados, dispones de 14 días naturales para solicitar la devolución.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio (textos, logos, imágenes de productos artesanales) es propiedad de <strong>El Hilo Enredado</strong> y está protegido por las leyes de propiedad intelectual.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
