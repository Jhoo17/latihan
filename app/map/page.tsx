import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapIcon } from "lucide-react"

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-muted rounded-full">
            <MapIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Interactive Map Coming Soon</h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          We're working on an interactive geological mapping feature that will allow you to explore 
          and analyze geological data in real-time. Stay tuned for this exciting addition to our services.
        </p>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/services">
              Explore Our Services
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              Get Notified When It's Ready
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

