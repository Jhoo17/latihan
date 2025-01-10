import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, AlertTriangle, Map, Mountain, FileText } from 'lucide-react'

const services = [
  {
    title: "Environmental Baseline Studies",
    description: "Comprehensive studies to establish environmental conditions before project implementation.",
    icon: Leaf
  },
  {
    title: "Geological Hazard Assessment",
    description: "Identification and assessment of potential geological hazards in project areas.",
    icon: AlertTriangle
  },
  {
    title: "Site Characterization",
    description: "Detailed characterization of geological and environmental conditions at project sites.",
    icon: Map
  },
  {
    title: "Ground Stability Analysis",
    description: "Assessment of ground stability for construction and infrastructure projects.",
    icon: Mountain
  },
  {
    title: "Environmental Impact Assessment Support",
    description: "Geological expertise to support environmental impact assessments for various projects.",
    icon: FileText
  }
]

export default function EnvironmentalGeosciencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Environmental Geoscience</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our environmental geoscience services combine geological expertise with environmental science 
        to provide comprehensive assessments of environmental impacts, risks, and mitigation strategies 
        for various geological and infrastructure projects.
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

