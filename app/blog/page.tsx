import { getEntries, Post, PostFields } from "@/lib/contentful"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Entry } from 'contentful'

async function getAllPosts() {
  try {
    const posts = await getEntries<Post>({
      order: ['-sys.createdAt']
    })
    return posts
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
        <p className="text-gray-600">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog & Publications</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Entry<Post>) => {
          const fields = post.fields as PostFields
          return (
            <Link key={post.sys.id} href={`/blog/${fields.slug}`}>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">{fields.title}</h2>
                <div className="text-gray-600 mb-4">
                  {new Date(fields.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {fields.excerpt && (
                  <p className="text-gray-700">{fields.excerpt}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

