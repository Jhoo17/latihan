import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { client, getEntry, Post, PostFields } from "@/lib/contentful"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { Entry } from "contentful"

export async function generateStaticParams() {
  const response = await client.getEntries<Post>({
    content_type: 'blogPage-3',
  })

  return response.items.map((post) => ({
    slug: post.fields.slug || post.sys.id,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const entry = await getEntry<Post>(params.slug)

  if (!entry?.fields) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="outline" className="mb-4">← Back to Blog & Publications</Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const post = entry as Entry<Post>
  const fields = post.fields as PostFields

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="outline" className="mb-6">← Back to Blog & Publications</Button>
        </Link>
        
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold">{fields.title}</h1>
          <Badge variant={fields.publicationOrBlog ? 'default' : 'outline'}>
            {fields.publicationOrBlog ? 'Publication' : 'Blog'}
          </Badge>
        </div>

        {fields.tags && fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {fields.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-muted-foreground mb-8">
          Published on: {new Date(fields.date).toLocaleDateString()}
        </p>

        {fields.excerpt && (
          <p className="text-lg text-muted-foreground mb-8 border-l-4 border-muted pl-4">
            {fields.excerpt}
          </p>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        {documentToReactComponents(fields.body)}
      </div>
    </div>
  )
}

