import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Not Found" }

export default function NotFound() {
  return (
    <div className="text-center">
      <h1>Not Found</h1>

      <Link href="/" className="underline">
        Back Home
      </Link>
    </div>
  )
}
