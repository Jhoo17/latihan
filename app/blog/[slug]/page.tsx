import { getEntry, getEntries, Post, PostFields } from "@/lib/contentful"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'

export async function generateStaticParams() {
  try {
    const posts = await getEntries<Post>()
    return posts.map((post) => ({
      slug: post.fields.slug,
    }))
  } catch (error) {
    console.error('Error fetching entries:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getEntry<Post>(params.slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="outline" className="mb-4">← Back to Blog & Publications</Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const fields = post.fields as PostFields

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog">
        <Button variant="outline" className="mb-4">← Back to Blog & Publications</Button>
      </Link>
      
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{fields.title}</h1>
        <div className="mb-8 text-gray-600">
          {new Date(fields.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <div className="rich-text">
          {documentToReactComponents(fields.body)}
        </div>
      </article>
    </div>
  )
}

