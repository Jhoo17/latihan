import { client } from "@/lib/contentful"
import type { Post } from "@/lib/contentful"
import BlogList from "./blog-list"

async function getAllPosts() {
  const response = await client.getEntries<Post>({
    content_type: 'blogPage-3',
    order: ['-sys.createdAt']
  })
  return response.items
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogList posts={posts} />
}

