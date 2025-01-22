'use client'

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    })
    
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-sm text-gray-600">
                    Mayapada Tower 1, 7th Floor <br />
                    Jl. Jend. Sudirman Kav. 28,
                    Jakarta Selatan 12920<br />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600">
                    Phone: +6221 5212189 <br />
                    Mobile: +62815-2031-6899
                  </p>
                </div>  
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600">
                    gda@gda.co.id  <br />
                    achmad@gda.co.id
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-sm text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="Your email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" />
                </div>
              </div>

              <div>
                <Label>Inquiry Type</Label>
                <RadioGroup defaultValue="general" className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Inquiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service">Service Request</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quote" id="quote" />
                    <Label htmlFor="quote">Request Quote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  placeholder="How can we help you?"
                  className="h-32"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
            <div className="aspect-square w-full bg-gray-100 rounded-lg relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3777706168607!2d106.81750837604949!3d-6.213807893774094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f401bd149845%3A0xfab22c8daef828ee!2sMayapada%20Tower%2C%20Jl.%20Jenderal%20Sudirman%20No.Kav.28%2C%20RT.4%2FRW.2%2C%20Kuningan%2C%20Karet%2C%20Kecamatan%20Setiabudi%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012920!5e0!3m2!1sid!2sid!4v1737447481851!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

