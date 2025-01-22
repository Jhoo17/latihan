import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from 'lucide-react'
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About GDA Consulting</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-muted-foreground">
            Founded by renowned geologist Dr. Andang Bachtiar, GDA Consulting has grown to become 
            a leading geological consulting firm specializing in comprehensive geological services. 
            With our expertise in geological mapping, resource estimation, and environmental geoscience, 
            we provide innovative solutions to complex geological challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Founder</h2>
            <div className="prose max-w-none">
              <p className="text-muted-foreground">
                Dr. Andang Bachtiar, known as the "Geologist Merdeka" (Independent Geologist), 
                is a distinguished figure in Indonesia's geological community. His extensive 
                experience and deep understanding of geological sciences have been instrumental 
                in shaping GDA Consulting's direction and success.
              </p>
              <p className="text-muted-foreground">
                Today, he continues to guide us as our esteemed advisor, ensuring that we maintain 
                the highest standards of geological expertise and client service. His commitment 
                to independence and scientific integrity remains a cornerstone of our consulting 
                practice.
              </p>
              <div className="mt-4">
                <Link 
                  href="https://andangbachtiar.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                >
                  Visit Dr. Andang's Personal Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="https://sjc.microlink.io/pLpccnqcfrx2K-92IgVAygyL69kPmEtMrTL9SftQl_nDNoYMFdbwo9HYXzCHhFvMLqqd4-zi1M-FNG_C6uR2HQ.jpeg"
              alt="Dr. Andang Bachtiar - Geologist Merdeka"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              priority
            />
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg mb-12 border">
          <h2 className="text-2xl font-semibold mb-4">Our Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Core Services</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">•</span>
                  Geological Mapping & Analysis
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">•</span>
                  Resource Estimation
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">•</span>
                  Environmental Geoscience
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">•</span>
                  Geospatial Solutions
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">•</span>
                  Technical Studies & Reporting
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Our Approach</h3>
              <p className="text-muted-foreground">
                Following Dr. Andang's principles, we maintain strict independence in our 
                assessments and recommendations. Our work is guided by scientific rigor, 
                environmental responsibility, and a commitment to sustainable resource 
                management.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/services">Explore Our Services</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 