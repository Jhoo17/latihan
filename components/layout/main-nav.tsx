import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Layers, Mountain, FileText, FlaskRoundIcon as Flask, Leaf, Map } from 'lucide-react'
import { AuthNavItem } from "@/components/auth-nav-item"

const services = [
  {
    title: "Geological Mapping & Analysis",
    href: "/services/geological-mapping",
    description: "Comprehensive geological mapping and analysis services.",
    icon: Layers,
  },
  {
    title: "Laboratory Services",
    href: "/services/laboratory",
    description: "Advanced laboratory services for rock and mineral analysis.",
    icon: Flask,
  },
  {
    title: "Environmental Geoscience",
    href: "/services/environmental-geoscience",
    description: "Environmental studies and assessments for geological projects.",
    icon: Leaf,
  },
  {
    title: "Geospatial Solutions",
    href: "/services/geospatial-solutions",
    description: "GIS mapping, spatial analysis, and data visualization services.",
    icon: Map,
  },
  {
    title: "Technical Studies & Reporting",
    href: "/services/technical-studies",
    description: "Comprehensive data analysis and technical documentation.",
    icon: FileText,
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} legacyBehavior passHref>
                    <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="flex items-center gap-2">
                        <service.icon className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">{service.title}</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {service.description}
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <AuthNavItem />
      </NavigationMenuList>
    </NavigationMenu>
  )
} 