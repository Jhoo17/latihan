import Image from "next/image"
import { Calculator, BarChart, Database, FileCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ResourceEstimationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Resource estimation visualization"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Resource Estimation Services
            </h1>
          </div>
        </div>

        {/* Overview */}
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Our resource estimation services combine advanced statistical methods with 
            geological expertise to provide accurate assessments of mineral resources. 
            We utilize cutting-edge software and methodologies to deliver reliable 
            estimates for mining projects of all scales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <Calculator className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Geostatistical Analysis</h3>
              <p className="text-gray-600">
                Advanced statistical analysis of geological data using variography 
                and other geostatistical techniques for accurate resource modeling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <BarChart className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Grade Estimation</h3>
              <p className="text-gray-600">
                Detailed grade estimation using various methods including kriging, 
                inverse distance weighting, and conditional simulation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Database className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Database Management</h3>
              <p className="text-gray-600">
                Comprehensive management and validation of exploration databases 
                to ensure data quality and reliability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <FileCheck className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resource Reporting</h3>
              <p className="text-gray-600">
                Professional resource reports compliant with international 
                reporting standards (JORC, NI 43-101, SAMREC).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Technical Approach</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Software & Tools</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Advanced 3D modeling software</li>
                <li>Geostatistical analysis packages</li>
                <li>Database management systems</li>
                <li>Custom estimation algorithms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Methodologies</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Ordinary and Universal Kriging</li>
                <li>Multiple Indicator Kriging</li>
                <li>Conditional Simulation</li>
                <li>Risk Assessment Models</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Proven Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
              <p className="text-gray-600">Estimation Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">30+</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Start Your Resource Estimation Project</h2>
          <p className="text-gray-600 mb-6">
            Contact us to discuss your resource estimation needs and how we can help you achieve accurate results.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Request Consultation</Button>
            <Button variant="outline">View Case Studies</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

