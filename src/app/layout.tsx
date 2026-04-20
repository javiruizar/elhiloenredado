import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | El Hilo Enredado",
    default: "El Hilo Enredado | Artículos Artesanales y Regalos Personalizados",
  },
  description: "Descubre nuestras creaciones únicas, hechas a mano con dedicación. Costura creativa, puericultura textil, canastillas personalizadas y decoración del hogar.",
  keywords: ["artesanía", "costura", "regalos personalizados", "puericultura", "canastillas", "decoración hogar", "hecho a mano", "bordados"],
  authors: [{ name: "El Hilo Enredado" }],
  creator: "El Hilo Enredado",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://elhiloenredado.com",
    title: "El Hilo Enredado | Artículos Artesanales y Regalos Personalizados",
    description: "Descubre nuestras creaciones únicas, hechas a mano con dedicación.",
    siteName: "El Hilo Enredado",
    images: [
      {
        url: "/Bolsas ropa interior.png", // Usa una imagen genérica bonita que ya tengas
        width: 1200,
        height: 630,
        alt: "El Hilo Enredado - Artículos Artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Hilo Enredado | Artículos Artesanales",
    description: "Descubre nuestras creaciones únicas, hechas a mano con dedicación.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans", inter.variable)}>
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen bg-cream text-gray-800">
            <Navbar />
            <CartSidebar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
