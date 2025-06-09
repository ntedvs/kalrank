"use client"

import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Error" }

export default function Error() {
  return (
    <div className="text-center">
      <h1>Error</h1>

      <Link href="/" className="underline">
        Back Home
      </Link>
    </div>
  )
}
