import Link from "next/link"
import { Button } from "@/components/ui/button"
import { client, getEntry } from "@/lib/contentful"
import { Entry, EntrySkeletonType } from "contentful"

interface BlogPost extends EntrySkeletonType {
  fields: {
    title: string | undefined
    date: string | undefined
    content: string | undefined
    slug: string | undefined
  }
  contentTypeId: 'blogPost'
}

export async function generateStaticParams() {
  const response = await client.getEntries({
    content_type: 'blogPost',
  })

  return response.items.map((post: any) => ({
    slug: post.fields.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getEntry<BlogPost>(params.slug)

  if (!post || !post.fields) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog">
        <Button variant="outline" className="mb-4">← Back to Blog</Button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{post.fields.title || 'Untitled'}</h1>
      <p className="text-gray-600 mb-4">Published on: {post.fields.date ? new Date(post.fields.date).toLocaleDateString() : 'No date'}</p>
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.fields.content || '' }} 
      />
    </div>
  )
}

