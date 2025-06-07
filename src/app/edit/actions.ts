"use server"

import { ranksTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export const updateRanks = async (ranks: { id: string; name: string }[]) => {
  for (const [index, rank] of ranks.entries()) {
    await db
      .update(ranksTable)
      .set({ position: index + 1 })
      .where(eq(ranksTable.id, rank.id))
  }
}
