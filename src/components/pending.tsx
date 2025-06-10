"use client"

import { useFormStatus } from "react-dom"

export default function Pending({ text = "Submit" }: { text?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="button disabled:cursor-not-allowed disabled:opacity-50"
    >
      {text}
    </button>
  )
}
