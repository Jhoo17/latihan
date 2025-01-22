import { Inter } from 'next/font/google'
import { SiteHeader } from "@/components/layout/site-header"
import { auth } from "@/auth"
import { NextAuthProvider } from "@/components/auth/next-auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  )
}

