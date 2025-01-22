import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Menu, X, MapPin, Phone, Mail, Layers, Mountain, Microscope } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const services = [
    { 
      title: "Geological Mapping", 
      icon: Layers, 
      description: "Comprehensive geological surveys and detailed mapping services for various terrains and geological settings." 
    },
    { 
      title: "Resource Estimation", 
      icon: Mountain, 
      description: "Accurate assessment and quantification of geological resources using advanced modeling techniques." 
    },
    { 
      title: "Environmental Studies", 
      icon: Microscope, 
      description: "In-depth environmental impact assessments and studies for geological and mining projects." 
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-gray-800 transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-gray-800 transition-colors">Services</a>
              <a href="/research" className="text-gray-600 hover:text-gray-800 transition-colors">Research & Publications</a>
              <a href="/map" className="text-gray-600 hover:text-gray-800 transition-colors">Interactive Map</a>
              <a href="/news" className="text-gray-600 hover:text-gray-800 transition-colors">News & Insights</a>
              <a href="#about" className="text-gray-600 hover:text-gray-800 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-800 transition-colors">Contact</a>
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <a href="#home" className="text-lg" onClick={() => setIsMenuOpen(false)}>Home</a>
                  <a href="#services" className="text-lg" onClick={() => setIsMenuOpen(false)}>Services</a>
                  <a href="/research" className="text-lg" onClick={() => setIsMenuOpen(false)}>Research & Publications</a>
                  <a href="/map" className="text-lg" onClick={() => setIsMenuOpen(false)}>Interactive Map</a>
                  <a href="/news" className="text-lg" onClick={() => setIsMenuOpen(false)}>News & Insights</a>
                  <a href="#about" className="text-lg" onClick={() => setIsMenuOpen(false)}>About</a>
                  <a href="#contact" className="text-lg" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 md:pt-0 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Geological landscape"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Unveiling Earth&#39;s Secrets
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Expert geological consulting for informed decision-making and sustainable resource management.
            </p>
            <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-200">
              Explore Our Services
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden group">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-gray-600 mb-4 group-hover:text-blue-600 transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Geologist at work"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-6">
                With over two decades of experience, GDA Consulting has been at the forefront of geological consulting. Our team of expert geologists and environmental scientists is dedicated to providing cutting-edge solutions for complex geological challenges.
              </p>
              <p className="text-gray-600 mb-6">
                We believe in the power of knowledge and innovation to drive sustainable resource management and informed decision-making in the fields of mining, environmental conservation, and urban development.
              </p>
              <Button variant="outline">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Featured Projects</h2>
          <Tabs defaultValue="project1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="project1">Mining Exploration</TabsTrigger>
              <TabsTrigger value="project2">Environmental Assessment</TabsTrigger>
              <TabsTrigger value="project3">Urban Geotechnical Study</TabsTrigger>
            </TabsList>
            <TabsContent value="project1">
              <Card>
                <CardContent className="flex flex-col md:flex-row items-center p-6">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Mining exploration project"
                      width={600}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4">Gold Deposit Mapping in Australia</h3>
                    <p className="text-gray-600 mb-4">
                      Our team conducted an extensive geological survey and resource estimation for a major gold mining company in Western Australia. Using advanced geophysical techniques and 3D modeling, we identified several high-potential zones for further exploration.
                    </p>
                    <Button variant="outline">View Case Study</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="project2">
              <Card>
                <CardContent className="flex flex-col md:flex-row items-center p-6">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Environmental assessment project"
                      width={600}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4">Coastal Erosion Study in California</h3>
                    <p className="text-gray-600 mb-4">
                      We conducted a comprehensive environmental impact assessment for a coastal development project in California. Our study included detailed analysis of erosion patterns, sediment transport, and potential impacts on local ecosystems, helping to inform sustainable development strategies.
                    </p>
                    <Button variant="outline">View Case Study</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="project3">
              <Card>
                <CardContent className="flex flex-col md:flex-row items-center p-6">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Urban geotechnical study"
                      width={600}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4">Skyscraper Foundation Analysis in Dubai</h3>
                    <p className="text-gray-600 mb-4">
                      For a major construction project in Dubai, we performed a detailed geotechnical study to assess the stability and suitability of the proposed foundation for a 100-story skyscraper. Our analysis included soil mechanics, seismic risk assessment, and recommendations for foundation design.
                    </p>
                    <Button variant="outline">View Case Study</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-600 mr-2" />
                    <span>+1 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-600 mr-2" />
                    <span>info@geoconsult.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                    <span>123 Earth Science Blvd, Geologist City, GC 12345</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full p-2 border rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" name="message" rows={4} className="w-full p-2 border rounded-md"></textarea>
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GeoConsult</h3>
              <p className="text-sm text-gray-400">Providing expert geological consulting services for over 20 years.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-sm text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="/research" className="text-sm text-gray-400 hover:text-white transition-colors">Research & Publications</a></li>
                <li><a href="/map" className="text-sm text-gray-400 hover:text-white transition-colors">Interactive Map</a></li>
                <li><a href="/news" className="text-sm text-gray-400 hover:text-white transition-colors">News & Insights</a></li>
                <li><a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Geological Mapping</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Resource Estimation</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Environmental Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 4.44c.39.39.39 1.02 0 1.41l-1.58 1.58c-.39.39-1.03.39-1.41 0l-.7-.7-2.12 2.12c-.39.39-1.02.39-1.41 0l-.7-.7L7.7 11.7c-.39.39-1.02.39-1.41 0L5.44 10.3c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0l.7.7 2.12-2.12c.39-.39 1.02-.39 1.41 0l.7.7 2.12-2.12c.39-.39 1.02-.39 1.41 0l1.58 1.58z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C6.73 9 6.5 8.64 6.6 8.3c.36-1.22 1.14-2.25 2.21-2.92.51-.32 1.1-.54 1.71-.7.66-.18 1.39-.24 2.09-.19 1.76.14 3.27 1.2 3.85 2.75.59 1.56.25 3.27-.95 4.47l-1.07 1.1c-.38.39-.72.79-1.03 1.23h-2.03c.28-.4.58-.75.91-1.06l1.79-1.83c.36-.37.48-.89.3-1.38-.18-.47-.62-.79-1.12-.85-.99-.12-1.8.75-1.8 1.72v4.07h-2V10c0-.17.01-.34.03-.5h1.32c.45-.4.83-.84 1.14-1.32L13.1 8l-1.72.03c-.29.01-.55-.1-.75-.29l-1.2-1.19c-.2-.2-.29-.47-.27-.75.02-.27.13-.52.32-.71.47-.47 1.25-.41 1.64.15l1.04 1.46 2.65-.49c.52-.09 1.01.26 1.11.78.1.51-.26 1-.77 1.09L13.9 8.3c-.14.02-.28.05-.42.09-.44.12-.81.3-1.15.54l-1.26.89zM18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">&copy; 2023 GDA Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

