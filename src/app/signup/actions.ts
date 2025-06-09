"use server"

import { usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape, validate } from "@/utils/client"
import { eq, ilike, or } from "drizzle-orm"
import { redirect } from "next/navigation"

export const signup = async (state: unknown, fd: FormData) => {
  const { email: e, username: u } = shape(fd)
  const email = e.trim().toLowerCase()
  const username = u.trim()

  if (!validate(email, "email")) {
    return { error: "Invalid email", fd }
  }

  if (!validate(username, "username")) {
    return { error: "Invalid username", fd }
  }

  const exist = await db.query.usersTable.findFirst({
    where: or(
      eq(usersTable.email, email),
      ilike(usersTable.username, username),
    ),
  })

  if (exist) {
    return {
      error:
        exist.email === email
          ? "Email already in use"
          : "Username already in use",
      fd,
    }
  }

  await db.insert(usersTable).values({ email, username })

  signIn("nodemailer", { email, redirect: false, redirectTo: "/" })
  redirect("/verify")
}
