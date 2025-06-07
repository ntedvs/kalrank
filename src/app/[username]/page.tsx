import { usersTable } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { ilike } from "drizzle-orm"
import Link from "next/link"
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

export default async function List({ params }: Props) {
  const { username } = await params
  const user = await getUser(username)

  const session = await auth()

  return (
    <>
      <h1>{user.username}</h1>

      {session && session.user.id === user.id && <Link href="/edit">Edit</Link>}

      <div className="space-y-4">
        {user.ranks.map(({ id, name, position }) => (
          <div className="input flex items-center gap-8 text-xl" key={id}>
            <p className="button flex size-20 items-center justify-center">
              {position}
            </p>

            <p>{name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
