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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://elhiloenredado.javierruiz.org"),
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
    url: "/",
    title: "El Hilo Enredado | Artículos Artesanales y Regalos Personalizados",
    description: "Descubre nuestras creaciones únicas, hechas a mano con dedicación.",
    siteName: "El Hilo Enredado",
    images: [
      {
        url: "/elhiloenredado_logo_medium.png",
        width: 800,
        height: 800,
        alt: "El Hilo Enredado - Artículos Artesanales",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "El Hilo Enredado | Artículos Artesanales",
    description: "Descubre nuestras creaciones únicas, hechas a mano con dedicación.",
    images: ["/elhiloenredado_logo_medium.png"],
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
