'use client'

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Entry } from 'contentful'
import { Post, ContentfulAsset } from '@/lib/contentful'
import { 
  LayoutGrid, 
  Users, 
  Settings, 
  PlusCircle,
  FileEdit,
  Trash2,
  Eye
} from 'lucide-react'
import Image from 'next/image'

interface DashboardProps {
  session: any
}

export default function AdminDashboard({ session }: DashboardProps) {
  const [posts, setPosts] = useState<Entry<Post>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const ALLOWED_ROLES = ['ADMIN', 'GDA_USER']

  useEffect(() => {
    if (!session) {
      redirect("/login")
    }

    if (!ALLOWED_ROLES.includes(session?.user?.role)) {
      redirect("/")
    }

    // Fetch posts
    fetchPosts()

    // Set up polling for real-time updates
    const interval = setInterval(fetchPosts, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [session])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFeaturedImageUrl = (post: Entry<Post>) => {
    try {
      const featuredImage = post.fields.featuredImage
      if (!featuredImage) return null
      
      const asset = featuredImage as unknown as ContentfulAsset
      if (!asset?.fields?.file?.url) return null
      
      return `https:${asset.fields.file.url}`
    } catch (error) {
      console.error('Error getting featured image URL:', error)
      return null
    }
  }

  // Only show certain admin features based on role
  const isAdmin = session?.user?.role === 'ADMIN'

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {session?.user?.name}!</p>
        </div>
        <Button asChild>
          <Link href="/admin/create-post" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <LayoutGrid className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-gray-500">Published articles</p>
          </CardContent>
        </Card>
        
        {isAdmin && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-gray-500">Active users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Settings</CardTitle>
                <Settings className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-gray-500">System settings</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No posts found. Create your first post!
              </div>
            ) : (
              posts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post)
                const title = String(post.fields.title || '')
                return (
                  <div 
                    key={post.sys.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {imageUrl ? (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={title || 'Featured image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          <LayoutGrid className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.sys.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.fields.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin/posts">View All Posts</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 