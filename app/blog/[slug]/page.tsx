import { getEntry, getEntries, Post } from "@/lib/contentful"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import type { Document } from '@contentful/rich-text-types'
import type { Asset } from 'contentful'

export async function generateStaticParams() {
  try {
    const posts = await getEntries()
    return posts.map((post: Entry<Post>) => ({
      slug: post.fields.slug,
    }))
  } catch (error) {
    console.error('Error fetching entries:', error)
    return []
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

interface ContentfulAsset extends Asset {
  fields: {
    title: string
    description?: string
    file: {
      url: string
      details: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: string
    }
  }
}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: React.ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const asset = node.data.target as ContentfulAsset
      if (!asset?.fields?.file?.url) return null
      
      const { title, description, file } = asset.fields
      const { width = 800, height = 600 } = file.details.image || {}
      
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={String(title || description || 'Blog image')}
            width={width}
            height={height}
            className="rounded-lg"
          />
          {title && <p className="text-sm text-gray-500 mt-2">{String(title)}</p>}
        </div>
      )
    }
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="italic">{text}</em>
    ),
    [MARKS.UNDERLINE]: (text: React.ReactNode) => (
      <u className="underline">{text}</u>
    ),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  console.log('Attempting to fetch post with slug:', params.slug)
  
  const post = await getEntry(params.slug)
  
  if (!post) {
    console.log('Post not found for slug:', params.slug)
    notFound()
  }

  console.log('Post found:', {
    id: post.sys.id,
    title: post.fields.title,
    slug: post.fields.slug,
    contentTypeId: post.sys.contentType.sys.id,
    hasContent: !!post.fields.content,
    contentStructure: typeof post.fields.content,
    contentKeys: Object.keys(post.fields.content || {})
  })

  const featuredImage = post.fields.featuredImage as ContentfulAsset | undefined
  const content = post.fields.content

  if (!content || typeof content !== 'object' || !('nodeType' in content) || !('content' in content)) {
    console.error('Invalid content structure:', content)
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600">Error: Invalid post content structure</p>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Featured Image */}
        {featuredImage?.fields?.file?.url && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={String(post.fields.title)}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title & Meta */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{String(post.fields.title)}</h1>
          <div className="text-gray-600">
            {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </header>

        {/* Description */}
        {post.fields.description && (
          <div className="text-xl text-gray-600 mb-8">
            {String(post.fields.description)}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {documentToReactComponents(content as unknown as Document, options)}
        </div>
      </div>
    </article>
  )
}

