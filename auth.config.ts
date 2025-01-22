import type { AuthConfig } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: "ADMIN" | "USER" | "GDA_USER"
}

interface ExtendedSession extends Session {
  user?: ExtendedUser
}

export const authConfig: AuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.email === process.env.ADMIN_EMAIL 
            ? "ADMIN" 
            : profile.email?.endsWith("@gda.co.id") 
              ? "GDA_USER" 
              : "USER",
        }
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: ExtendedSession; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "USER" | "GDA_USER"
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user, trigger, session }: { token: JWT; user?: ExtendedUser; trigger?: string; session?: any }) {
      if (user) {
        token.role = user.role
      }
      if (trigger === "update" && session) {
        token.role = session.user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/register'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET
} 