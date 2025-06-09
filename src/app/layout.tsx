import { auth } from "@/lib/auth"
import "@/styles/base.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ReactNode, Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Kalrank", template: "%s | Kalrank" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col bg-background text-foreground ${inter.className} mx-auto max-w-4xl p-4`}
      >
        <header className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">
            Kalrank
          </Link>

          <Link href="/plus">Plus</Link>

          <div className="ml-auto">
            <Suspense>
              <Wrapper />
            </Suspense>
          </div>
        </header>

        <main className="my-8 grow">{children}</main>

        <footer className="flex flex-col items-center justify-between text-foreground/60 sm:flex-row">
          <div className="flex gap-2">
            <Link href="https://github.com/ntedvs/kalrank" target="_blank">
              GitHub
            </Link>

            <p>•</p>

            <Link href="https://www.tiktok.com/@kalrank" target="_blank">
              TikTok
            </Link>

            <p>•</p>

            <Link href="https://www.instagram.com/kalrank" target="_blank">
              Instagram
            </Link>
          </div>

          <p>© {new Date().getFullYear()} Kalrank. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

async function Wrapper() {
  const session = await auth()

  return session ? (
    <div className="flex gap-2">
      <Link href="/edit" className="input w-20 py-1.5! text-center">
        Edit
      </Link>

      <Link
        href={"/" + session.user.username.toLowerCase()}
        className="button w-20 text-center"
      >
        Ranks
      </Link>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link href="/signup" className="input w-20 py-1.5! text-center">
        Sign Up
      </Link>

      <Link href="/login" className="button w-20 text-center">
        Log In
      </Link>
    </div>
  )
}
