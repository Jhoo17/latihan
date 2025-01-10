import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, FileText, Map, ClipboardCheck, FileSearch } from 'lucide-react'

const services = [
  {
    title: "Data Analysis and Integration",
    description: "Comprehensive analysis and integration of various geological and geophysical data sets.",
    icon: BarChart2
  },
  {
    title: "Resource Evaluation Reports",
    description: "Detailed reports on resource estimation and evaluation for mining and energy projects.",
    icon: FileText
  },
  {
    title: "Technical Documentation",
    description: "Preparation of technical reports, papers, and documentation for various geological projects.",
    icon: FileSearch
  },
  {
    title: "Maps and Cross-sections",
    description: "Creation of detailed geological maps and cross-sections for various applications.",
    icon: Map
  },
  {
    title: "Quality Control Protocols",
    description: "Development and implementation of quality control protocols for geological studies.",
    icon: ClipboardCheck
  }
]

export default function TechnicalStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Technical Studies & Reporting</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our technical studies and reporting services provide comprehensive analysis, evaluation, 
        and documentation for various geological projects. We ensure that all our reports meet 
        the highest standards of accuracy and professionalism.
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

