'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AuthNavItem() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {session ? (
        <Button onClick={() => signOut()} variant="ghost">
          Log out
        </Button>
      ) : (
        <Link 
          href="/login" 
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          Log in
        </Link>
      )}
    </div>
  )
}

