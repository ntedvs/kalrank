import { Metadata } from "next"

export const metadata: Metadata = { title: "Verify" }

export default function Plus() {
  return (
    <>
      <h1>Check your email</h1>

      <p className="text-center">
        A sign in link has been sent to your email address
      </p>
    </>
  )
}
