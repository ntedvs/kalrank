"use client"

import Pending from "@/components/pending"
import { Trash } from "lucide-react"
import { useRef, useState } from "react"
import { deleteRank, updateRanks } from "./actions"

type Props = { ranks: { id: string; name: string }[] }

export default function List({ ranks: initial }: Props) {
  const [ranks, setRanks] = useState(initial)
  const item = useRef<number | null>(null)
  const over = useRef<number | null>(null)

  const start = (i: number) => (item.current = i)
  const enter = (i: number) => (over.current = i)

  const end = () => {
    const from = item.current
    const to = over.current

    if (from === null || to === null || from === to) return

    const order = [...ranks]
    const [moved] = order.splice(from, 1)
    order.splice(to, 0, moved)

    setRanks(order)
    item.current = over.current = null
  }

  if (!ranks.length) return

  return (
    <>
      <div className="mt-2 space-y-2">
        {ranks.map((rank, i) => (
          <div
            draggable
            onDragStart={() => start(i)}
            onDragEnter={() => enter(i)}
            onDragEnd={end}
            className="input flex cursor-grab justify-between border-gray-200!"
            key={i}
          >
            <p>{rank.name}</p>

            <form action={() => deleteRank(rank.id)} className="flex">
              <button>
                <Trash className="text-red-400" />
              </button>
            </form>
          </div>
        ))}

        <form action={() => updateRanks(ranks)} className="flex flex-col">
          <Pending />
        </form>
      </div>
    </>
  )
}
