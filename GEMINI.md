# El Hilo Enredado - Guía de Desarrollo para Gemini

Este archivo contiene las directrices, convenciones y contexto del proyecto para asegurar que las contribuciones de la IA sean coherentes y sigan los estándares establecidos.

## 🌟 Contexto del Proyecto
**El Hilo Enredado** es una tienda online de productos artesanales y personalizados (costura, bordados, accesorios). El objetivo es ofrecer una experiencia de compra elegante, artesanal y cercana.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Validación:** **Zod** (para esquemas de API y formularios)
- **Base de Datos:** SQLite con Prisma ORM
- **Estilos:** Tailwind CSS (Paleta personalizada: cream, sand, blush, sage, sky)
- **Estado Global:** Zustand (especialmente para el carrito)
- **Autenticación:** NextAuth.js v5 (Auth.js)
- **Iconos:** Lucide React

## 📏 Convenciones de Código
- **Idioma:**
  - Código (variables, funciones, componentes): **Inglés**.
  - Interfaz de usuario (textos, mensajes): **Español**.
  - Comentarios: **Español**.
- **Arquitectura:**
  - Seguir el patrón de **Next.js App Router**.
  - Priorizar **React Server Components (RSC)**. Usar `"use client"` solo cuando sea estrictamente necesario.
  - Componentes UI: **Implementaciones propias en `src/components/ui/`** (NO usamos shadcn/ui por ahora).
- **Tipado y Validación:**
  - Uso estricto de TypeScript. Evitar `any`.
  - Validar todas las entradas de la API y formularios con esquemas de **Zod**.

## 🚫 Exclusiones
- **Carpeta `gemini/`**: Ignorar completamente. Es una copia del proyecto para uso externo.

## 🎨 Estilo Visual
- Seguir la paleta de colores definida en `tailwind.config.ts`.
- Estilo minimalista, artesanal y limpio.
- Uso de sombras suaves (`shadow-sm`, `hover:shadow-md`) y transiciones fluidas.

## 📁 Estructura de Archivos Principal
- `src/app/`: Rutas, páginas y APIs.
- `src/components/`: Componentes React (organizados por dominio: layout, product, sections, ui).
- `src/lib/`: Utilidades y configuraciones compartidas (Prisma client, etc.).
- `src/store/`: Definiciones de estados globales con Zustand.
- `src/types/`: Definiciones de tipos TypeScript globales.

---

*Nota: Este archivo es dinámico y se actualizará a medida que el proyecto evolucione o se definan nuevas reglas.*
