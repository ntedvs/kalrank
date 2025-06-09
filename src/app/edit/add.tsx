"use client"

import Pending from "@/components/pending"
import { useState } from "react"
import { createRank } from "./actions"

export default function Add() {
  const [name, setName] = useState("")

  const ran = ["Apple", "Banana", "Orange"]

  return (
    <>
      <form action={createRank} className="flex flex-col">
        <label htmlFor="name">Add Item</label>

        <div className="mb-2 flex gap-2">
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input w-full"
          />

          <button
            type="button"
            onClick={() => setName(ran[Math.floor(Math.random() * ran.length)])}
            className="button"
          >
            Random
          </button>
        </div>

        <Pending />
      </form>
    </>
  )
}
