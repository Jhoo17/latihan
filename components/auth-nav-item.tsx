'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function AuthNavItem() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return <NavigationMenuItem>Loading...</NavigationMenuItem>
  }

  return (
    <NavigationMenuItem>
      {session ? (
        <Button onClick={() => signOut()} variant="ghost">
          Log out
        </Button>
      ) : (
        <Link href="/login" passHref legacyBehavior>
          <NavigationMenuLink className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-normal transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          )}>
            Log in
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  )
}

