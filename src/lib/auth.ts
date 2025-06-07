import {
  sessionsTable,
  usersTable,
  verificationsTable as verificationTokensTable,
} from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    sessionsTable,
    verificationTokensTable,
  } as any),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: "Kalrank <auth@latevote.com>",
    }),
  ],
})
