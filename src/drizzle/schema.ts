import { relations, sql } from "drizzle-orm"
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

const uuid = text()
  .primaryKey()
  .default(sql`gen_random_uuid()`)

export const usersTable = pgTable("users", {
  id: uuid,
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  created: timestamp().notNull().defaultNow(),

  customer: text().unique(),
  type: text({ enum: ["free", "plus"] })
    .notNull()
    .default("free"),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  ranks: many(ranksTable),
}))

export const ranksTable = pgTable("ranks", {
  id: uuid,
  name: text().notNull(),
  position: integer().notNull(),
  created: timestamp().notNull().defaultNow(),

  userId: text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
})

export const ranksRelations = relations(ranksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [ranksTable.userId],
    references: [usersTable.id],
  }),
}))

export const sessionsTable = pgTable("sessions", {
  sessionToken: text().primaryKey(),
  expires: timestamp().notNull(),

  userId: text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
})

export const verificationsTable = pgTable(
  "verifications",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp().notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
)
