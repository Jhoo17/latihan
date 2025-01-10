import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Layers, FileText, GitBranch, Ruler } from 'lucide-react'

const services = [
  {
    title: "Subsurface Structural and Stratigraphic Mapping",
    description: "Detailed mapping of subsurface geological structures and stratigraphic units.",
    icon: Layers
  },
  {
    title: "Surface Geological Mapping and Field Surveys",
    description: "Comprehensive surface mapping and geological field surveys.",
    icon: MapPin
  },
  {
    title: "Lithological and Facies Mapping",
    description: "Detailed mapping of rock types and depositional environments.",
    icon: FileText
  },
  {
    title: "Structural Interpretation",
    description: "Analysis and interpretation of geological structures and their implications.",
    icon: GitBranch
  },
  {
    title: "Cross-section Generation",
    description: "Creation of geological cross-sections for better understanding of subsurface geology.",
    icon: Ruler
  }
]

export default function GeologicalMappingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Geological Mapping & Analysis</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our geological mapping and analysis services provide comprehensive insights into geological 
        structures, rock formations, and mineral deposits. Using state-of-the-art technology and 
        extensive field experience, we deliver accurate and detailed geological maps for various applications.
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

