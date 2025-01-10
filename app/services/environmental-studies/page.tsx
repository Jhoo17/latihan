import Image from "next/image"
import { Microscope, Trees, Droplets, Wind } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EnvironmentalStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Environmental impact assessment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Environmental Studies
            </h1>
          </div>
        </div>

        {/* Overview */}
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Our environmental studies combine geological expertise with environmental science 
            to provide comprehensive assessments of environmental impacts, risks, and 
            mitigation strategies for various geological and mining projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <Microscope className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Environmental Impact Assessment</h3>
              <p className="text-gray-600">
                Comprehensive assessment of potential environmental impacts of geological 
                and mining activities on local ecosystems and communities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Trees className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Land Rehabilitation</h3>
              <p className="text-gray-600">
                Development of effective land rehabilitation strategies and monitoring 
                programs for post-mining landscapes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Droplets className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Water Management</h3>
              <p className="text-gray-600">
                Assessment and management of surface and groundwater resources, 
                including water quality monitoring and protection strategies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Wind className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Air Quality Studies</h3>
              <p className="text-gray-600">
                Monitoring and assessment of air quality impacts from geological 
                activities, including dust and emissions management.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Methodology Tabs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
          <Tabs defaultValue="assessment">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
            </TabsList>
            <TabsContent value="assessment" className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Environmental Assessment</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Baseline environmental studies</li>
                <li>Impact prediction and assessment</li>
                <li>Risk assessment and management</li>
                <li>Mitigation strategy development</li>
              </ul>
            </TabsContent>
            <TabsContent value="monitoring" className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Environmental Monitoring</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Water quality monitoring</li>
                <li>Air quality monitoring</li>
                <li>Soil contamination assessment</li>
                <li>Biodiversity monitoring</li>
              </ul>
            </TabsContent>
            <TabsContent value="reporting" className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Environmental Reporting</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Regulatory compliance reports</li>
                <li>Environmental management plans</li>
                <li>Impact assessment reports</li>
                <li>Stakeholder communication</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Case Study */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Featured Project</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Environmental restoration project"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Mine Site Rehabilitation Project
              </h3>
              <p className="text-gray-600 mb-4">
                Successfully developed and implemented a comprehensive rehabilitation 
                plan for a former mining site, restoring native vegetation and 
                establishing sustainable ecosystems.
              </p>
              <Button variant="outline">View Project Details</Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Environmental Expertise?</h2>
          <p className="text-gray-600 mb-6">
            Contact us to discuss your environmental study requirements and how we can help ensure 
            your project's environmental compliance and sustainability.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Schedule Consultation</Button>
            <Button variant="outline">Download Capabilities Statement</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

