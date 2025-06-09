import { ranksTable } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import Add from "./add"
import List from "./list"

export const metadata: Metadata = { title: "Edit" }

export default async function Edit() {
  const session = await auth()
  if (!session) redirect("/login")

  const ranks = await db.query.ranksTable.findMany({
    where: eq(ranksTable.userId, session.user.id),
  })

  return (
    <>
      <h1>Edit</h1>

      <Add />
      <List ranks={ranks} />
    </>
  )
}
