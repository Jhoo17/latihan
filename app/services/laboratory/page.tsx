import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, FlaskRoundIcon as Flask, Database, Box, ClipboardCheck, Cog } from 'lucide-react'

const services = [
  {
    title: "Rock and Mineral Characterization",
    description: "Detailed analysis and characterization of rock and mineral samples.",
    icon: Microscope
  },
  {
    title: "Petrographic Analysis",
    description: "Microscopic examination of rock samples to determine composition and texture.",
    icon: Flask
  },
  {
    title: "Geochemical Analysis",
    description: "Chemical analysis of rock, soil, and water samples for various elements and compounds.",
    icon: Database
  },
  {
    title: "Core Analysis and Sampling",
    description: "Comprehensive analysis and sampling of drill cores for geological and engineering purposes.",
    icon: Box
  },
  {
    title: "Sample Preparation and Processing",
    description: "Preparation and processing of geological samples for various analytical procedures.",
    icon: Cog
  },
  {
    title: "Quality Control and Documentation",
    description: "Rigorous quality control procedures and detailed documentation of all analyses.",
    icon: ClipboardCheck
  }
]

export default function LaboratoryServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Laboratory Services</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our state-of-the-art laboratory provides a wide range of analytical services for geological 
        and environmental applications. Our expert team ensures accurate and reliable results for all your testing needs.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {<service.icon className="h-6 w-6 text-red-600 mr-2" />}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

