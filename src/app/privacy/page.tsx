import React from 'react';

export const metadata = {
  title: 'Política de Privacidad | El Hilo Enredado',
  description: 'Información sobre cómo tratamos tus datos personales en El Hilo Enredado.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8 border-b border-sand/50 pb-4">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-sage max-w-none text-foreground/80 space-y-6">
          <p className="italic text-sm">Última actualización: 24 de abril de 2026</p>
          
          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">1. Información General</h2>
            <p>
              En <strong>El Hilo Enredado</strong>, nos tomamos muy en serio la privacidad de nuestros clientes. Esta política describe cómo recopilamos, utilizamos y protegemos tu información personal cuando visitas nuestra tienda y realizas una compra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">2. Datos que Recopilamos</h2>
            <p>Cuando interactúas con nuestra web, podemos recopilar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Información de contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono y dirección de envío.</li>
              <li><strong>Información de la cuenta:</strong> Si te registras a través de Google o mediante correo electrónico.</li>
              <li><strong>Detalles del pedido:</strong> Productos comprados y notas de personalización.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">3. Uso de la Información</h2>
            <p>Utilizamos tus datos exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestionar y enviar tus pedidos artesanales.</li>
              <li>Comunicarnos contigo sobre el estado de tu compra o para resolver dudas de personalización.</li>
              <li>Mejorar nuestra tienda y ofrecerte una experiencia más cercana.</li>
              <li>Enviar comunicaciones de servicio (como la recuperación de contraseña).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">4. Protección de Datos</h2>
            <p>
              Tus datos se almacenan de forma segura en nuestras bases de datos protegidas. No vendemos ni compartimos tu información personal con terceros con fines comerciales. Solo compartimos datos con proveedores de servicios necesarios para el funcionamiento de la web (como Google Auth para el inicio de sesión o Resend para el envío de correos).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-primary mt-8 mb-4">5. Tus Derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Puedes hacerlo directamente desde tu perfil de usuario o contactando con nosotros.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
