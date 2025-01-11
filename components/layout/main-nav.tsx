'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { AuthNavItem } from "@/components/auth-nav-item"
import { 
  Map,
  TestTube2,
  Leaf,
  Globe,
  FileText,
  Home,
  BookOpen,
  MapPin,
  Newspaper,
  Mail,
  Brain,
  ChevronDown
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/services",
      label: "Services",
      icon: Brain,
      children: [
        {
          title: "Geological Mapping & Analysis",
          href: "/services/geological-mapping",
          description: "Comprehensive geological mapping and analysis services for various applications.",
          icon: Map
        },
        {
          title: "Laboratory Services",
          href: "/services/laboratory",
          description: "Advanced laboratory services for rock and mineral characterization and analysis.",
          icon: TestTube2
        },
        {
          title: "Environmental Geoscience",
          href: "/services/environmental-geoscience",
          description: "Environmental studies and assessments for geological projects.",
          icon: Leaf
        },
        {
          title: "Geospatial Solutions",
          href: "/services/geospatial-solutions",
          description: "GIS mapping, spatial analysis, and geological data visualization services.",
          icon: Globe
        },
        {
          title: "Technical Studies & Reporting",
          href: "/services/technical-studies",
          description: "Comprehensive data analysis, resource evaluation, and technical documentation.",
          icon: FileText
        }
      ]
    },
    {
      href: "/publications",
      label: "Publications",
      icon: BookOpen
    },
    {
      href: "/map",
      label: "Interactive Map",
      icon: MapPin
    },
    {
      href: "/blog",
      label: "Blog",
      icon: Newspaper
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Mail
    },
  ]

  return (
    <div className="flex items-center pl-6 w-full">
      <Link href="/" className="mr-8 flex items-center space-x-2">
        <span className="font-bold text-xl text-red-600">GDA</span>
      </Link>
      <NavigationMenu className="flex-1">
        <NavigationMenuList className="gap-6">
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              {route.children ? (
                <>
                  <Link href={route.href}>
                    <NavigationMenuTrigger className="flex items-center gap-2 px-4" indicator={false}>
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {route.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <child.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                                <div className="text-sm font-medium leading-none">{child.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/90 transition-colors">
                                {child.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 gap-1.5",
                      pathname === route.href && "text-red-600 bg-red-50",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto pl-6">
        <AuthNavItem />
      </div>
    </div>
  )
} 