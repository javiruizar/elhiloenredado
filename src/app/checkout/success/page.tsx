import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="bg-cream min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-sage/20 rounded-full animate-ping" />
            <div className="relative bg-white p-4 rounded-full shadow-sm border border-sand/20">
              <CheckCircle2 className="h-16 w-16 text-sage" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold text-primary">
            ¡Gracias por tu pedido!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Tu solicitud ha sido recibida con éxito. Nos pondremos manos a la obra para preparar tus artículos artesanales con todo el cariño.
          </p>
        </div>

        {orderId && (
          <div className="bg-white p-4 rounded-xl border border-sand/30 shadow-sm inline-block px-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Número de pedido</p>
            <p className="font-mono font-bold text-primary">#{orderId.slice(-8).toUpperCase()}</p>
          </div>
        )}

        <div className="bg-sage/5 p-6 rounded-2xl border border-sage/10 text-left space-y-3">
          <h3 className="font-bold text-primary flex items-center gap-2">
            ¿Qué pasa ahora?
          </h3>
          <ul className="text-sm text-foreground/80 space-y-2">
            <li className="flex gap-2">
              <span className="text-sage font-bold">•</span>
              Recibirás un correo de confirmación con los detalles.
            </li>
            <li className="flex gap-2">
              <span className="text-sage font-bold">•</span>
              Nos pondremos en contacto contigo si necesitamos algún detalle sobre la personalización.
            </li>
            <li className="flex gap-2">
              <span className="text-sage font-bold">•</span>
              Te avisaremos en cuanto tu paquete salga de nuestro taller.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/products" className={buttonVariants({ className: "flex-1 bg-primary hover:bg-primary/90 h-12 rounded-xl" })}>
            Seguir comprando
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/profile" className={buttonVariants({ variant: "outline", className: "flex-1 border-sand text-primary h-12 rounded-xl hover:bg-sand/10" })}>
            Ver mis pedidos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
