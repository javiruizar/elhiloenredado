# El Hilo Enredado — Contexto del proyecto

Tienda online de artículos artesanales y personalizados (costura, bordados, puericultura textil, canastillas, decoración). Experiencia de compra cercana, artesanal y visualmente cuidada. Dominio de producción: `https://elhiloenredado.javierruiz.org`.

> Este fichero sustituye a `GEMINI.md`, `plan.md` y `subplan.md` como fuente de verdad. Última verificación contra el código: 2026-10-06.

## Stack

- **Next.js 16.1** (App Router, `output: "standalone"`) + **React 19** + **TypeScript** estricto (prohibido `any`).
- **PostgreSQL** + **Prisma 5.22** (sin migraciones: se usa `prisma db push`).
- **Auth.js v5** (`next-auth@5 beta`) con `PrismaAdapter`, sesión **JWT**, proveedores **Google** y **Credenciales** (bcrypt). `allowDangerousEmailAccountLinking: true` para vincular cuentas por email.
- **UI:** Tailwind CSS 3 con variables HSL en `src/app/globals.css` + **shadcn/ui** (estilo `base-nova`, primitivas `@base-ui/react`). Componentes en `src/components/ui/`: button, card, separator, sheet, skeleton, sonner.
- **Paleta de marca** (`tailwind.config.ts` → `--brand-*`): cream (`#FDFBF4`), sand (`#EFECE3`), sage (verde salvia oscuro, `#4A5D4E` en emails; textos y botones principales), blush, sky.
- **Fuentes:** Inter (sans) y Lora (serif, `--font-lora`).
- **Estado global:** Zustand persistente (`src/store/cart.ts`, clave `cart-storage`).
- **Validación:** Zod 4 (`src/lib/validations/`).
- **Emails:** Resend (`src/lib/mail.ts`), remitentes `@elhiloenredado.javierruiz.org`.
- **Notificaciones UI:** Sonner. **Iconos:** Lucide React.

## Comandos

- `npm run dev` — levanta Postgres en Docker (`docker-compose.dev.yml`, puerto 5432), ejecuta `prisma db push` y arranca `next dev`.
- `npx prisma db seed` — puebla categorías y productos (`prisma/seed.ts`, vía `tsx`).
- `npx prisma studio` — explorar la BD.
- `npm run lint` — ESLint (debería pasar sin errores antes de desplegar).
- `npx tsc --noEmit` — comprobación de tipos.
- `./deploy.sh <version>` — despliegue a producción (ver abajo).

## Entornos y despliegue

- Variables de entorno en `env/dev/.env` y `env/pro/.env` (no versionadas). Variables usadas: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, `POSTGRES_USER/PASSWORD/DB`.
- **Producción:** servidor casero (host SSH `minipc`, "NAS"). `deploy.sh` construye la imagen Docker (`Dockerfile` multi-stage, Node 20 alpine), la exporta a `artifact/*.tar`, copia `docker-compose.yml` + `.env` de `env/pro`, genera `run.sh` y lo sincroniza por `rsync` a `minipc:web-projects/elhiloenredado/`. Después hay que ejecutar `./run.sh` en el servidor (carga la imagen, `docker compose up`, `prisma db push`).
- En producción la web escucha en el puerto **3002** y Postgres 15 en el **5434**. Las imágenes de producto viven en `public/product/` y se montan como volumen (`/home/javi/web-projects/elhiloenredado/public/product`).
- Ojo: `.gitignore` excluye `/public` y `/artifact`, así que las imágenes no están versionadas.

## Estructura

- `src/app/` — rutas:
  - Públicas: `/` (home: Hero, About, ProductGallery, InstagramCTA), `/products` (filtro por `category` y `search`), `/product/[id]`, `/about`, `/privacy`, `/terms`, `not-found`.
  - Usuario: `/login` (login + registro en `LoginForm`), `/auth/forgot-password`, `/auth/reset-password`, `/profile`, `/checkout`, `/checkout/success`.
  - Admin (`/admin`, protegido por rol en `admin/layout.tsx`): dashboard, `/admin/products` (listado, `new`, `[id]` editar), `/admin/orders` (listado, `[id]` detalle con cambio de estado).
  - SEO: `robots.ts`, `sitemap.ts`, `icon.png`.
- `src/app/api/` — `auth/[...nextauth]`, `auth/register`, `auth/forgot-password`, `auth/reset-password`, `cart` (GET/POST/PATCH/DELETE), `orders` (POST), `admin/products` (POST), `admin/products/[id]` (PATCH/DELETE), `admin/orders/[id]` (PATCH).
- `src/components/` — por dominio: `admin/`, `auth/`, `cart/` (sidebar, botón, `CartUpdater` que sincroniza Zustand con `/api/cart` al iniciar sesión), `layout/` (Navbar, MobileNav, UserNav, Footer), `product/`, `sections/`, `ui/`, `Providers.tsx`.
- `src/lib/` — `prisma.ts`, `mail.ts`, `tokens.ts` (tokens de reseteo de contraseña), `utils.ts`, `validations/checkout.ts`.
- `src/auth.ts` — configuración de Auth.js. `src/hooks/use-debounce.ts`, `src/types/index.ts`.
- `prisma/schema.prisma` — modelos: `Category`, `Product` (price Float, image = ruta string, stock, showInGallery), `User` (name, email, phone, password, role `"USER"|"ADMIN"`), `Account`, `Session`, `Cart`, `CartItem` (customization), `Order` (status string, `address` texto libre, deliveryNote), `OrderItem`, `PasswordResetToken`.

## Convenciones

- Código (variables, funciones, componentes) en **inglés**; textos de UI y **comentarios en español**.
- Priorizar **React Server Components**; `"use client"` solo cuando sea imprescindible.
- Colores: usar los semánticos de Tailwind (`primary`, `secondary`, `muted`, `accent`) y los de marca (`cream`, `sand`, `sage`…), basados en variables HSL.
- Validar entradas de formularios y API con **Zod**.
- Las rutas API que usan `auth()` eliminan la cabecera `Set-Cookie` de la respuesta (workaround de un bug de Auth.js v5); mantener este patrón.
- Protección de admin: comprobar `session.user.role === "ADMIN"` tanto en páginas como en cada ruta API. El rol se relee de la BD en cada callback `jwt`.
- El email admin (`javiruizar@gmail.com`) se asigna automáticamente como ADMIN al registrarse (en `auth.ts` → `events.createUser` y en `api/auth/register`).

## Estado actual (verificado en código)

### Hecho
- Catálogo con categorías, búsqueda con debounce, skeletons de carga y galería destacada (`showInGallery`).
- Carrito persistente en Zustand, sincronizado con BD para usuarios logueados; personalización por artículo.
- Checkout validado con Zod; pago fuera de la web (Bizum/transferencia, se contacta al cliente). Página de éxito con número de pedido.
- Autenticación Google + credenciales con vinculación de cuentas (un usuario de Google puede añadir contraseña registrándose con el mismo email). Recuperación de contraseña por email.
- Emails transaccionales con Resend: bienvenida, reseteo de contraseña y confirmación de pedido.
- Perfil de usuario con historial de pedidos (solo lectura).
- Panel admin: dashboard, CRUD de productos (imagen como ruta/URL, sin subida de ficheros), gestión de estado de pedidos (`PENDING`, `SHIPPED`, `COMPLETED`, `CANCELLED`).
- SEO: metadata global con Open Graph/Twitter, `generateMetadata` por producto, metadata en `/products` y `/about`, `robots.ts` y `sitemap.ts`.
- Pipeline de despliegue Docker → servidor casero.
- `tsc --noEmit` pasa sin errores.

### Pendiente — siguiente tarea (antiguo `subplan.md`, nada iniciado)
1. **BD:** en `User`, sustituir `name` por `firstName` + `lastName` y añadir `address`, `city`, `postalCode` (`phone` ya existe). `prisma db push` y ajustar `seed.ts` si procede.
2. **Auth/registro:** exponer los nuevos campos en callbacks `jwt`/`session` de `src/auth.ts`; aceptarlos en `api/auth/register` y añadir los inputs en `LoginForm.tsx`. Revisar que el alta por Google rellene nombre/apellidos.
3. **Perfil editable:** crear `api/user/profile` (PATCH, validado con Zod) y modo edición en `/profile` (hoy el botón "Editar Perfil" no hace nada).
4. **Checkout pre-rellenado:** cargar los datos del usuario (sesión en servidor) como valores iniciales del formulario, que debe seguir siendo editable. Hoy `checkout/page.tsx` es 100% cliente y empieza vacío.
5. **Enlaces:**
   - `/about`: los botones "Ver mi catálogo" (→ `/products`) e "Sígueme en Instagram" no tienen enlace.
   - `InstagramCTA.tsx` apunta a `instagram.com/elhiloenredado_` y `Footer.tsx` a `instagram.com` genérico → ambos a `https://www.instagram.com/elhiloenredado/`.
6. **Validación final:** registro completo, login Google, checkout pre-rellenado y enlaces sociales.

### Deuda técnica y bugs conocidos
- **Envío:** el checkout muestra 5 € de envío, pero `api/orders` calcula el total sin él → el total guardado y el del email no coinciden con lo mostrado.
- **Stock:** no se valida ni se descuenta al crear un pedido.
- **Seguridad carrito:** `PATCH`/`DELETE` de `api/cart` no comprueban que el `itemId` pertenezca al carrito del usuario.
- **Pedidos:** nombre, teléfono y dirección se concatenan en el campo `Order.address` (texto libre); conviene estructurarlo al hacer la tarea de perfil.
- **Admin:** el sidebar enlaza a `/admin/users` y `/admin/settings`, que no existen (404). Las APIs admin no validan con Zod.
- **Lint:** `npm run lint` da 2 errores (`any` en `src/lib/mail.ts` ~l.103-104) y ~22 warnings (variables sin usar, `<img>` en `ProductForm`).
- `src/auth.ts` hace `console.log` del prefijo del Google Client ID y tiene un `AUTH_SECRET` de respaldo hardcodeado.
- Email admin hardcodeado en dos sitios (mejor en variable de entorno).
- `test-mail.ts` (raíz, sin versionar) es un script de prueba de Resend que usa `dotenv`, que no está en dependencias.
- `README.md` es el de plantilla de create-next-app.

## Roadmap posterior (ideas)
- Subida de imágenes desde el panel admin.
- Gestión de usuarios y ajustes en admin.
- Optimización de imágenes (`next/image` en todo el admin).
- Arreglar la deuda técnica listada arriba.
