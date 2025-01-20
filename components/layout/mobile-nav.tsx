'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useQueryClient } from '@tanstack/react-query'
import { useState } from "react"
import { routes } from "@/lib/routes"

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const prefetchAndNavigate = async (path: string) => {
    const route = routes.find(r => r.path === path)
    if (!route) return

    // Start prefetching data based on route
    const prefetchPromise = queryClient.prefetchQuery({
      queryKey: [route.prefetchKey],
      queryFn: route.prefetchFn,
      staleTime: 1000 * 60 * 5
    })

    // Prefetch the page
    router.prefetch(path)

    // Wait for data to be prefetched
    await prefetchPromise

    // Navigate and close menu
    setIsOpen(false)
    router.push(path)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={(e) => {
                e.preventDefault()
                prefetchAndNavigate(route.path)
              }}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
} 