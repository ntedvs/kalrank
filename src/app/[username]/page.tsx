import { usersTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { ilike } from "drizzle-orm"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = { params: Promise<{ username: string }> }

const getUser = async (username: string) => {
  const user = await db.query.usersTable.findFirst({
    where: ilike(usersTable.username, username),
    with: { ranks: true },
  })

  if (!user) notFound()

  return user
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const user = await getUser(username)

  return { title: user.username }
}

export default async function Username({ params }: Props) {
  const { username } = await params
  const user = await getUser(username)

  return (
    <>
      <h1>{user.username}</h1>

      <div className="space-y-4">
        {user.ranks.map((rank, i) => (
          <div className="input flex items-center gap-4 text-lg" key={i}>
            <p className="button flex size-16 items-center justify-center">
              #{i + 1}
            </p>

            <p>{rank.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
