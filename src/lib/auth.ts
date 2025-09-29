import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser, verifyPassword, type User } from "@/lib/database"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user: User | undefined = getUser(credentials.email as string)

        if (!user) {
          return null
        }

        const isValidPassword = verifyPassword(
          credentials.password as string,
          user.password_hash
        )

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    }
  }
})