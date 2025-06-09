"use client"

import Pending from "@/components/pending"
import { useActionState } from "react"
import { login } from "./actions"

export default function Form() {
  const [state, action] = useActionState(login, undefined)

  return (
    <form action={action} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        required
        placeholder="Email"
        className="input mb-2"
        defaultValue={state && (state.fd.get("email") as string)}
      />

      {state && <p className="mb-2 text-center text-red-500">{state.error}</p>}

      <Pending />
    </form>
  )
}
