'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"

type Platform = 'TWITTER' | 'LINKEDIN' | 'FACEBOOK' | 'INSTAGRAM'

interface SocialMediaPost {
  id: string
  platform: Platform
  content: string
  status: string
  scheduledAt?: string
  postedAt?: string
}

interface SocialMediaGeneratorProps {
  postSlug: string
}

const PLATFORMS: Platform[] = ['TWITTER', 'LINKEDIN', 'FACEBOOK', 'INSTAGRAM']

export function SocialMediaGenerator({ postSlug }: SocialMediaGeneratorProps) {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<SocialMediaPost[]>([])
  const [error, setError] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [schedulingPostId, setSchedulingPostId] = useState<string>()

  async function generatePosts() {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch(`/api/posts/${postSlug}/social`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to generate social media posts")
      }

      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function schedulePost(postId: string, date: Date) {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch(`/api/posts/${postSlug}/social/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          scheduledAt: date.toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to schedule post")
      }

      const updatedPost = await response.json()
      setPosts(posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      ))
      setSchedulingPostId(undefined)
      setSelectedDate(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Social Media Posts</span>
          <Button onClick={generatePosts} disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Generate Posts
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {posts.length > 0 ? (
          <Tabs defaultValue="TWITTER" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="TWITTER">Twitter</TabsTrigger>
              <TabsTrigger value="LINKEDIN">LinkedIn</TabsTrigger>
              <TabsTrigger value="FACEBOOK">Facebook</TabsTrigger>
              <TabsTrigger value="INSTAGRAM">Instagram</TabsTrigger>
            </TabsList>
            {PLATFORMS.map((platform) => (
              <TabsContent key={platform} value={platform}>
                {posts.filter(post => post.platform === platform).map(post => (
                  <div key={post.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge>{post.status}</Badge>
                      {post.scheduledAt && (
                        <span className="text-sm text-muted-foreground">
                          Scheduled for: {new Date(post.scheduledAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Textarea
                      value={post.content}
                      rows={6}
                      readOnly
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSchedulingPostId(post.id)}
                          >
                            Schedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule Post</DialogTitle>
                            <DialogDescription>
                              Choose when to publish this post
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSchedulingPostId(undefined)
                                setSelectedDate(undefined)
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                if (selectedDate && schedulingPostId) {
                                  schedulePost(schedulingPostId, selectedDate)
                                }
                              }}
                              disabled={!selectedDate}
                            >
                              Schedule Post
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">
                        Post Now
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Click "Generate Posts" to create social media content
          </div>
        )}
      </CardContent>
    </Card>
  )
} 