'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type SocialPost = {
  id: string
  platform: 'twitter' | 'linkedin' | 'instagram'
  content: string
  date: string
  link: string
}

export default function NewsPage() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'twitter' | 'linkedin' | 'instagram'>('all')

  useEffect(() => {
    // Fetch social media posts
    const fetchPosts = async () => {
      // This is a placeholder. You'd need to implement actual API calls here.
      const response = await fetch('/api/social-posts')
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(post => post.platform === activeTab)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News & Insights</h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">Posted on: {new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-sm mb-4">{post.content}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">View on {post.platform}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

