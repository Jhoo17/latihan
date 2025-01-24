import { getEntry, getEntries, Post } from "@/lib/contentful"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getEntry(params.slug) as Entry<Post> | null

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button 
            variant="ghost" 
            className="mb-4 group flex items-center gap-2 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 ease-in-out"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog & Publications
          </Button>
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const { fields } = post

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog">
        <Button 
          variant="ghost" 
          className="mb-4 group flex items-center gap-2 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 ease-in-out"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-300"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Blog & Publications
        </Button>
      </Link>
      
      <article className="prose lg:prose-xl mx-auto">
        {/* Featured Image */}
        {fields.featuredImage?.fields?.file?.url && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${fields.featuredImage.fields.file.url}`}
              alt={fields.title || 'Blog post image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{fields.title}</h1>
        
        {fields.description && (
          <p className="text-xl text-gray-600 mb-8">{fields.description}</p>
        )}
        
        <div className="mb-8 text-gray-600">
          {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <div className="rich-text prose">
          {documentToReactComponents(fields.content)}
        </div>
      </article>
    </div>
  )
}

