import { getEntries, Post } from "@/lib/contentful"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'

async function getAllPosts() {
  try {
    const posts = await getEntries({
      content_type: 'blogPage-4',
      order: ['-sys.createdAt']
    })
    
    // Debug: Log the response
    console.log('Fetched posts:', {
      total: posts.length,
      posts: posts.map(p => ({
        id: p.sys.id,
        title: p.fields.title,
        slug: p.fields.slug
      }))
    })
    
    return posts as Entry<Post>[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog & Publications</h1>
        <p className="text-gray-600">No posts found. Please make sure you have published content in Contentful.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog & Publications</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Entry<Post>) => (
          <Link key={post.sys.id} href={`/blog/${post.fields.slug}`}>
            <div className="group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              {/* Featured Image */}
              <div className="relative h-48 w-full bg-gray-100">
                {post.fields.featuredImage?.fields?.file?.url ? (
                  <Image
                    src={`https:${post.fields.featuredImage.fields.file.url}`}
                    alt={post.fields.title || 'Blog post image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.fields.title}
                </h2>
                <div className="text-gray-600 mb-4">
                  {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {post.fields.description && (
                  <p className="text-gray-700 line-clamp-3">
                    {post.fields.description}
                  </p>
                )}
                <div className="mt-4">
                  <span className="text-blue-600 group-hover:text-blue-800 transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

