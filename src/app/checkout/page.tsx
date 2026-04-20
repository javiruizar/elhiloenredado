"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/checkout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutInput, string>>>({});
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState<CheckoutInput>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryNote: "",
  });

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const shipping = 5.0; // Mock shipping cost
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (errors[name as keyof CheckoutInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");
    setErrors({});

    // Validate with Zod
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutInput, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof CheckoutInput] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      // Concatenate fields for the current API address field
      // This ensures compatibility with the existing backend schema
      const fullAddress = `${formData.fullName}\nEmail: ${formData.email}\nTel: ${formData.phone}\nDir: ${formData.address}, ${formData.city}, ${formData.postalCode}`;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          address: fullAddress, 
          deliveryNote: formData.deliveryNote 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Error al procesar el pedido");
        setLoading(false);
        return;
      }

      // Clear Zustand cart
      clearCart();
      
      toast.success("¡Pedido confirmado!", {
        description: "Tu pedido se ha realizado correctamente."
      });
      
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      setServerError("Error de conexión al procesar el pedido");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">Agrega algunos productos antes de realizar el pedido.</p>
        <Button onClick={() => router.push("/products")} variant="outline" size="lg">
          Ver productos
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-12 text-center">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-xl shadow-sm border border-sand/30">
              <h2 className="text-xl font-semibold mb-6 text-primary flex items-center">
                <span className="w-8 h-8 rounded-full bg-cream text-primary flex items-center justify-center mr-3 text-sm">1</span>
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Nombre Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.fullName ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="Juan Pérez"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.email ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground/80">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.phone ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="600 000 000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-sand/30">
              <h2 className="text-xl font-semibold mb-6 text-primary flex items-center">
                <span className="w-8 h-8 rounded-full bg-cream text-primary flex items-center justify-center mr-3 text-sm">2</span>
                Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground/80">Dirección *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.address ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="Calle, número, piso, puerta"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Ciudad *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.city ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="Tu ciudad"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Código Postal *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-cream/20 border ${errors.postalCode ? 'border-red-500' : 'border-sand/40'} rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all`}
                    placeholder="00000"
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground/80">Notas para el artesano (Opcional)</label>
                  <textarea
                    name="deliveryNote"
                    value={formData.deliveryNote}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-sand/40 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all min-h-[100px] resize-none"
                    placeholder="¿Algún detalle especial sobre el envío o la personalización?"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-sand/30">
              <h2 className="text-xl font-semibold mb-6 text-primary flex items-center">
                <span className="w-8 h-8 rounded-full bg-cream text-primary flex items-center justify-center mr-3 text-sm">3</span>
                Método de Pago
              </h2>
              <div className="bg-sage/5 border border-sage/10 p-6 rounded-xl space-y-4">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Al tratarse de artículos personalizados y artesanales, gestionamos el pago de forma directa para asegurar que todos los detalles sean de tu agrado.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <p className="text-sm font-medium text-primary">Bizum o Transferencia Bancaria</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4 italic">
                    Una vez confirmado el pedido, nos pondremos en contacto contigo para facilitarte los datos de pago y confirmar la fecha de entrega.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <Card className="sticky top-28 border-sand/30 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif text-primary">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-sand/20">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-primary line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Cantidad: {item.quantity}</p>
                        {item.customization && (
                          <p className="text-xs italic text-sage mt-1 line-clamp-1">
                            &quot;{item.customization}&quot;
                          </p>
                        )}
                        <p className="text-sm font-medium text-foreground mt-2">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-sand/20" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>Envío</span>
                    <span>{shipping.toFixed(2)}€</span>
                  </div>
                  <Separator className="my-2 bg-sand/20" />
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2">
                {serverError && (
                  <div className="w-full p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                    {serverError}
                  </div>
                )}
                <Button 
                  className="w-full bg-sage hover:bg-sage/90 text-primary-foreground h-12 text-lg shadow-sm"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Confirmar Pedido"
                  )}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest px-4">
                  Pago 100% seguro y garantizado por artesanos locales
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
