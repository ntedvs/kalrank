import Pending from "@/components/pending"
import { ranksTable } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import List from "./list"

export default async function Edit() {
  const session = await auth()
  if (!session) redirect("/login")

  const ranks = await db.query.ranksTable.findMany({
    where: eq(ranksTable.userId, session.user.id),
  })

  return (
    <>
      <h1>Edit</h1>

      <form
        action={async (fd) => {
          "use server"

          const last = await db.query.ranksTable.findFirst({
            where: eq(ranksTable.userId, session.user.id),
            orderBy: desc(ranksTable.position),
          })

          const { name } = shape(fd)
          const position = last ? last.position + 1 : 1

          await db
            .insert(ranksTable)
            .values({ name, position, userId: session.user.id })
        }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required className="input" />

        <Pending />
      </form>

      <List ranks={ranks} />
    </>
  )
}
