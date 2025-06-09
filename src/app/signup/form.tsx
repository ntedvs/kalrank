"use client"

import Pending from "@/components/pending"
import { useActionState } from "react"
import { signup } from "./actions"

export default function Form() {
  const [state, action] = useActionState(signup, undefined)

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

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        required
        placeholder="Username"
        className="input mb-4"
        defaultValue={state && (state.fd.get("username") as string)}
      />

      {state && (
        <p className="-mt-2 mb-2 text-center text-red-500">{state.error}</p>
      )}

      <Pending />
    </form>
  )
}
