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
                    123 Earth Science Blvd<br />
                    Geology City, GC 12345<br />
                    United States
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
                    Main: +1 (123) 456-7890<br />
                    Fax: +1 (123) 456-7891
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
                    info@gdaconsulting.com<br />
                    support@gdaconsulting.com
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1667824789570!5m2!1sen!2s"
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

