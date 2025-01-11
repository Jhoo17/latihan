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
        {documentToReactComponents(fields.body, {
          renderNode: {
            paragraph: (node, children) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            'heading-1': (node, children) => (
              <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
            ),
            'heading-2': (node, children) => (
              <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
            ),
            'heading-3': (node, children) => (
              <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
            ),
            'unordered-list': (node, children) => (
              <ul className="list-disc pl-6 mb-4">{children}</ul>
            ),
            'ordered-list': (node, children) => (
              <ol className="list-decimal pl-6 mb-4">{children}</ol>
            ),
            'list-item': (node, children) => (
              <li className="mb-1">{children}</li>
            ),
            'blockquote': (node, children) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
            ),
            'embedded-asset-block': (node) => (
              <img
                src={node.data?.target?.fields?.file?.url}
                alt={node.data?.target?.fields?.description || ''}
                className="my-8 rounded-lg shadow-lg max-w-full h-auto"
              />
            ),
            hyperlink: (node, children) => (
              <a href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          },
          renderMark: {
            bold: (text) => <strong className="font-bold">{text}</strong>,
            italic: (text) => <em className="italic">{text}</em>,
            underline: (text) => <u>{text}</u>,
            code: (text) => <code className="bg-gray-100 rounded px-1 py-0.5">{text}</code>,
          },
        })}
      </div>
    </div>
  )
}

