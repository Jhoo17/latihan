import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { client as contentfulClient } from "@/lib/contentful"
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

async function getBlogPosts() {
  const response = await contentfulClient.getEntries({
    content_type: 'blogPage-3',
  })
  return response.items
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8"> Blog & Publications</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Card key={post.sys.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{post.fields.title}</h2>
              </div>
              {post.fields.date && (
                <p className="text-sm text-gray-600 mb-2">
                  Published on: {new Date(post.fields.date).toLocaleDateString()}
                </p>
              )}
              {post.fields.excerpt && (
                <p className="text-sm mb-4">{post.fields.excerpt}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.fields.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <Link href={`/blog/${post.fields.slug || post.sys.id}`} passHref>
                <Button variant="outline">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

