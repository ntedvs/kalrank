"use server"

import { ranksTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const updateRanks = async (ranks: { id: string; name: string }[]) => {
  for (const [index, rank] of ranks.entries()) {
    await db
      .update(ranksTable)
      .set({ position: index + 1 })
      .where(eq(ranksTable.id, rank.id))
  }

  const rank = await db.query.ranksTable.findFirst({
    with: { user: true },
    where: eq(ranksTable.id, ranks[0].id),
  })

  if (!rank) return

  redirect("/" + rank.user.username.toLowerCase())
}

export const deleteRank = async (id: string) => {
  await db.delete(ranksTable).where(eq(ranksTable.id, id))
  redirect("/edit")
}
