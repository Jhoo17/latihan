import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Compass, Briefcase, Map } from 'lucide-react'

const services = [
  {
    title: "Field Trips for Professionals",
    description: "Organized geological field trips for industry professionals to enhance practical knowledge.",
    icon: Compass
  },
  {
    title: "Geological Field Workshops",
    description: "Hands-on workshops focusing on field techniques and geological interpretation.",
    icon: Map
  },
  {
    title: "Technical Training Programs",
    description: "Comprehensive training programs on various geological and geotechnical topics.",
    icon: BookOpen
  },
  {
    title: "Customized Geological Workshops",
    description: "Tailored workshops addressing specific geological challenges or topics.",
    icon: Users
  },
  {
    title: "Field Techniques and Best Practices Training",
    description: "Training on the latest field techniques and industry best practices in geology.",
    icon: Briefcase
  }
]

export default function EducationTrainingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Education & Training</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Our education and training services are designed to enhance the skills and knowledge 
        of geology professionals. We offer a range of programs from field trips to customized 
        workshops, ensuring that participants gain valuable insights and practical experience.
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

