import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Menu, MapPin, Phone, Mail, Layers, Mountain, Microscope } from 'lucide-react'
import { cn } from "@/lib/utils"
import imageLoader from '@/lib/image-loader'

const blogPosts = [
  {
    id: 1,
    title: "Understanding Geological Formations",
    excerpt: "An in-depth look at the various types of geological formations and their significance in resource exploration.",
    slug: "understanding-geological-formations"
  },
  {
    id: 2,
    title: "Environmental Impact Assessment",
    excerpt: "How geological surveys contribute to environmental impact assessments and sustainable development.",
    slug: "environmental-impact-assessment"
  },
  {
    id: 3,
    title: "Advanced Mapping Techniques",
    excerpt: "Exploring the latest technologies and methodologies in geological mapping and surveying.",
    slug: "advanced-mapping-techniques"
  }
]

const components = [
  {
    title: "Geological Mapping",
    href: "/services/geological-mapping",
    icon: Layers,
    description: "Comprehensive geological surveys and mapping services"
  },
  {
    title: "Resource Estimation",
    href: "/services/resource-estimation",
    icon: Microscope,
    description: "Accurate assessment of geological resources"
  },
  {
    title: "Environmental Studies",
    href: "/services/environmental-studies",
    icon: Mountain,
    description: "Environmental impact assessments"
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            loader={imageLoader}
            src={`${process.env.NEXT_PUBLIC_BLOB_URL}/XeIEF.jpeg`}
            alt="Geological landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Back to Basics,<br />Look at the Rocks.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              More than 20 years of experience in geological consulting, providing expertise through dedicated research and comprehensive analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/services">
                  Explore Our Services
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white">
                View Publications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest research, findings, and insights in the field of geological consulting.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} passHref>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" passHref>
              <Button>
                View All Posts
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/map" className="group">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <Layers className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Explore our geological data through an interactive 3D map interface.</p>
                  <ChevronRight className="h-5 w-5 mt-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/publications" className="group">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <Mountain className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Publications</h3>
                  <p className="text-gray-600">Access our research papers and technical publications.</p>
                  <ChevronRight className="h-5 w-5 mt-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/contact" className="group">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <Mail className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  <p className="text-gray-600">Get in touch with our team of geological experts.</p>
                  <ChevronRight className="h-5 w-5 mt-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  loader={imageLoader}
                  src="/placeholder.svg"
                  alt="GDA Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="text-xl font-bold">GDA</span>
              </Link>
              <p className="mt-4 text-gray-400">
                Providing expert geological consulting services for over 20 years.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/publications" className="text-gray-400 hover:text-white transition-colors">Publications</Link></li>
                <li><Link href="/map" className="text-gray-400 hover:text-white transition-colors">Interactive Map</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (123) 456-7890
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  info@gdaconsulting.com
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Earth Science Blvd<br />Geology City, GC 12345
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 GDA Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none mb-1">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

