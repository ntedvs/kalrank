import Pending from "@/components/pending"
import { usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { eq } from "drizzle-orm"

export default function Login() {
  return (
    <>
      <h1>Login</h1>

      <form
        action={async (fd) => {
          "use server"

          const { email: raw } = shape(fd)
          const email = raw.trim().toLowerCase()

          const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email),
          })

          if (!user) {
            return
          }

          signIn("nodemailer", { email, redirectTo: "/" + user.username })
        }}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required className="input mb-2" />

        <Pending />
      </form>
    </>
  )
}
