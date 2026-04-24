import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

console.log("Configuring Auth.js with Google ID:", process.env.AUTH_GOOGLE_ID?.substring(0, 10) + "...");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user || !user.password) return null;
        
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        // Incluimos el rol en el objeto devuelto por authorize
        return { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role 
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Al inicio de sesión (Google o Credenciales), el objeto 'user' está disponible
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      
      const userId = (token.sub || token.id) as string;
      
      // REFUERZO: Siempre buscamos el rol en la BD para que los cambios sean inmediatos
      // y no dependamos de que el token se caduque para actualizar permisos.
      if (userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true }
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub || token.id) as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "secreto-muy-largo-de-desarrollo",
  events: {
    async createUser({ user }) {
      // Cuando un usuario se crea (por ejemplo, vía Google), 
      // comprobamos si debe ser ADMIN.
      const adminEmail = "javiruizar@gmail.com";
      if (user.email?.toLowerCase() === adminEmail) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "ADMIN" },
        });
      }
    },
  },
});