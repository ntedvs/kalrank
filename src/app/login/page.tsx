import { Metadata } from "next"
import Form from "./form"

export const metadata: Metadata = { title: "Log In" }

export default function Login() {
  return (
    <>
      <h1>Log In</h1>
      <Form />
    </>
  )
}
