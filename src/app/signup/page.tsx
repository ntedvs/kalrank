import Pending from "@/components/pending"
import { usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { redirect } from "next/navigation"

export default function SignUp() {
  return (
    <>
      <h1>Sign Up</h1>

      <form
        action={async (fd) => {
          "use server"

          const { email, username } = shape(fd)
          await db.insert(usersTable).values({ email, username })

          signIn("nodemailer", { email, redirectTo: "/" + username })
          redirect("/verify")
        }}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required className="input" />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" required className="input" />

        <Pending />
      </form>
    </>
  )
}
