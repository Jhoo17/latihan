import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Map, CuboidIcon as Cube, Server, FileDigit } from 'lucide-react'

const services = [
  {
    title: "Geological Data Digitization",
    description: "Conversion of physical geological data into digital formats for easier analysis and storage.",
    icon: FileDigit
  },
  {
    title: "GIS Mapping and Spatial Analysis",
    description: "Creation of geological maps and spatial analysis using advanced GIS tools.",
    icon: Map
  },
  {
    title: "2D/3D Visualization of Geological Data",
    description: "Advanced visualization of geological data in both 2D and 3D formats.",
    icon: Cube
  },
  {
    title: "Database Creation and Management",
    description: "Design and management of geological databases for efficient data storage and retrieval.",
    icon: Database
  },
  {
    title: "Digital Map Compilation",
    description: "Compilation of various geological data sources into comprehensive digital maps.",
    icon: Server
  }
]

export default function GeospatialSolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Geospatial Solutions</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our geospatial solutions leverage cutting-edge technology to provide comprehensive 
        geological data management, analysis, and visualization services. We help you make 
        informed decisions based on accurate spatial information.
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

