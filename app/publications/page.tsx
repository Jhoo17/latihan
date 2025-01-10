import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Publication = {
  id: string
  title: string
  authors: string[]
  abstract: string
  date: string
  tags: string[]
}

const publications: Publication[] = [
  {
    id: '1',
    title: "Recent Advancements in Seismic Data Analysis",
    authors: ["John Doe", "Jane Smith"],
    abstract: "This paper explores the latest techniques in seismic data interpretation for improved geological understanding.",
    date: "2023-05-20",
    tags: ["Seismology", "Data Analysis", "Geophysics"]
  },
  // Add more publications as needed
]

export default function PublicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GeoConsult Publications</h1>
      <div className="space-y-6">
        {publications.map((pub) => (
          <Card key={pub.id}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Published on: {pub.date}</p>
              <p className="text-sm text-gray-600 mb-2">Authors: {pub.authors.join(", ")}</p>
              <p className="text-sm mb-4">{pub.abstract}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <Link href={`/blog/${pub.id}`} passHref>
                <Button variant="outline">Read Full Publication</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

