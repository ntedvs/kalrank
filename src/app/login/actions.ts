"use server"

import { signIn } from "@/lib/auth"
import { shape, validate } from "@/utils/client"
import { redirect } from "next/navigation"

export const login = async (state: any, fd: FormData) => {
  const { email: e } = shape(fd)
  const email = e.trim().toLowerCase()

  if (!validate(email, "email")) {
    return { error: "Invalid email", fd }
  }

  signIn("nodemailer", { email, redirect: false, redirectTo: "/" })
  redirect("/verify")
}
