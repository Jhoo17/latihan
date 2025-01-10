import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'

const services = [
  {
    title: "Geological Mapping & Analysis",
    description: "Comprehensive geological mapping and analysis services for various applications.",
    link: "/services/geological-mapping"
  },
  {
    title: "Laboratory Services",
    description: "Advanced laboratory services for rock and mineral characterization and analysis.",
    link: "/services/laboratory"
  },
  {
    title: "Environmental Geoscience",
    description: "Environmental studies and assessments for geological projects.",
    link: "/services/environmental-geoscience"
  },
  {
    title: "Geospatial Solutions",
    description: "GIS mapping, spatial analysis, and geological data visualization services.",
    link: "/services/geospatial-solutions"
  },
  {
    title: "Technical Studies & Reporting",
    description: "Comprehensive data analysis, resource evaluation, and technical documentation.",
    link: "/services/technical-studies"
  }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        GDA Consulting offers a comprehensive range of geological and environmental services. 
        Our expert team provides cutting-edge solutions tailored to your specific needs.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={service.link} 
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

