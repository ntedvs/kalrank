"use client"

type Rank = { id: string; name: string }
type Props = { ranks: Rank[] }

import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { updateRanks } from "./actions"

export default function List({ ranks }: Props) {
  const [items, setItems] = useState(ranks)

  const end = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return

    setItems((items) => {
      const from = items.findIndex((item) => item.id === active.id)
      const to = items.findIndex((item) => item.id === over.id)

      return arrayMove(items, from, to)
    })
  }

  return (
    <>
      <DndContext onDragEnd={end}>
        <SortableContext items={items}>
          <div className="space-y-2">
            {items.map(({ id, name }) => (
              <Item id={id} name={name} key={id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button onClick={() => updateRanks(items)} className="button">
        Save
      </button>
    </>
  )
}

function Item({ id, name }: Rank) {
  const { listeners, transform, transition, setNodeRef } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="input cursor-move bg-background"
    >
      <p>{name}</p>
    </div>
  )
}
