"use server"

import { ranksTable } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const createRank = async (fd: FormData) => {
  const session = await auth()
  if (!session) return

  const last = await db.query.ranksTable.findFirst({
    where: eq(ranksTable.userId, session.user.id),
    orderBy: desc(ranksTable.position),
  })

  const { name } = shape(fd)
  const position = last ? last.position + 1 : 1

  await db
    .insert(ranksTable)
    .values({ name, position, userId: session.user.id })

  redirect("/edit")
}

export const updateRanks = async (ranks: { id: string; name: string }[]) => {
  const session = await auth()
  if (!session) return

  for (const [index, rank] of ranks.entries()) {
    await db
      .update(ranksTable)
      .set({ position: index + 1 })
      .where(eq(ranksTable.id, rank.id))
  }

  redirect("/" + session.user.username.toLowerCase())
}

export const deleteRank = async (id: string) => {
  await db.delete(ranksTable).where(eq(ranksTable.id, id))
  redirect("/edit")
}
