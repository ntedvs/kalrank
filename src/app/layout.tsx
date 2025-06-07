import "@/styles/base.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Kalrank", template: "%s | Kalrank" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col bg-background text-foreground ${inter.className}`}
      >
        <header className="chunk"></header>
        <main className="chunk grow">{children}</main>
        <footer className="chunk"></footer>
      </body>
    </html>
  )
}
