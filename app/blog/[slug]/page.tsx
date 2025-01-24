import { getEntry, getEntries, Post } from "@/lib/contentful"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getEntry(params.slug)

  if (!post) {
    notFound()
  }

  // Konfigurasi untuk rich text renderer
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        // Debug log untuk melihat struktur node
        console.log('Embedded Asset Node:', JSON.stringify(node, null, 2))

        // Pengecekan keberadaan data
        if (!node?.data?.target?.fields?.file) {
          console.warn('Missing file data in embedded asset')
          return null
        }

        try {
          const file = node.data.target.fields.file['en-US'] || node.data.target.fields.file
          const title = node.data.target.fields.title?.['en-US'] || ''
          const description = node.data.target.fields.description?.['en-US'] || ''
          const contentType = file.contentType || ''

          if (!file?.url) {
            console.warn('Missing URL in file data')
            return null
          }

          // Handle video content
          if (contentType.includes('video')) {
            // Mendapatkan ukuran video dari metadata atau gunakan default
            const videoWidth = file.details?.video?.width || 1280
            const videoHeight = file.details?.video?.height || 720
            
            // Hitung rasio aspek untuk mempertahankan proporsi
            const aspectRatio = videoHeight / videoWidth
            
            // Tentukan lebar maksimum container
            const maxWidth = 800
            
            // Hitung tinggi berdasarkan rasio aspek
            const height = Math.round(maxWidth * aspectRatio)
            
            return (
              <div className="my-8 relative w-full max-w-[800px] mx-auto">
                <div 
                  className="relative w-full" 
                  style={{ paddingBottom: `${(height / maxWidth) * 100}%` }}
                >
                  <video
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-contain bg-black"
                    title={title || 'Video content'}
                    poster={file.details?.video?.thumbnail?.url ? `https:${file.details.video.thumbnail.url}` : undefined}
                  >
                    <source src={`https:${file.url}`} type={contentType} />
                    Your browser does not support the video tag.
                  </video>
                </div>
                {title && (
                  <p className="text-sm text-gray-600 mt-2 text-center">{title}</p>
                )}
              </div>
            )
          }

          // Handle image content
          if (contentType.includes('image')) {
            const imageWidth = file.details?.image?.width || 800
            const imageHeight = file.details?.image?.height || 400
            
            return (
              <div className="my-8">
                <div className="relative max-w-[800px] mx-auto">
                  <Image
                    src={`https:${file.url}`}
                    alt={description || title || 'Blog post image'}
                    width={imageWidth}
                    height={imageHeight}
                    className="rounded-lg mx-auto"
                    unoptimized
                  />
                  {title && (
                    <p className="text-sm text-gray-600 mt-2 text-center">{title}</p>
                  )}
                </div>
              </div>
            )
          }

          // Handle other file types (e.g., PDF)
          return (
            <div className="my-4">
              <a
                href={`https:${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {title || 'Download file'}
              </a>
            </div>
          )
        } catch (error) {
          console.error('Error rendering embedded asset:', error)
          return null
        }
      },
      [BLOCKS.ORDERED_LIST]: (node: any, children: any) => {
        return (
          <ol className="medium-ordered-list">
            {children}
          </ol>
        )
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return (
          <ul className="medium-unordered-list">
            {children}
          </ul>
        )
      },
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        return (
          <li className="medium-list-item">
            <span className="list-content">{children}</span>
          </li>
        )
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p className="mb-4">{children}</p>
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
      },
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return <h3 className="text-2xl font-bold mb-3 text-gray-900">{children}</h3>
      },
      [BLOCKS.QUOTE]: (node: any, children: any) => {
        return (
          <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-700">
            {children}
          </blockquote>
        )
      },
      [BLOCKS.HR]: () => {
        return <hr className="my-8 border-t border-gray-200" />
      }
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: any) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: any) => (
        <code className="bg-gray-100 rounded px-2 py-1 font-mono text-sm">{text}</code>
      )
    },
    renderText: (text: string) => {
      // Handle line breaks in text
      return text.split('\n').reduce((children: any[], textSegment, index) => {
        if (index > 0) {
          children.push(<br key={index} />)
        }
        children.push(textSegment)
        return children
      }, [])
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg px-4 py-2 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blog & Publications
        </Link>

        {/* Featured Image */}
        {post.fields.featuredImage?.fields?.file?.url && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${post.fields.featuredImage.fields.file.url}`}
              alt={post.fields.title || 'Featured image'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Title & Meta */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.fields.title}</h1>
        <div className="text-gray-600 mb-8">
          {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          {documentToReactComponents(post.fields.content, options)}
        </article>
      </div>
    </div>
  )
}

