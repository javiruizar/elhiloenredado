import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "El nombre es demasiado corto"),
  phone: z.string().min(9, "Teléfono inválido"),
  address: z.string().min(10, "La dirección es demasiado corta"),
  city: z.string().min(2, "Ciudad inválida"),
  postalCode: z.string().min(5, "Código postal inválido"),
  deliveryNote: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
