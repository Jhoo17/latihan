'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [socialContent, setSocialContent] = useState<{twitter?: string, linkedin?: string, instagram?: string}>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // First, save the blog post (this is just a placeholder)
    console.log('Saving blog post:', { title, content, slug })

    // Then, generate social media content
    const response = await fetch('/api/generate-social-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, slug }),
    })

    const generatedContent = await response.json()
    setSocialContent(generatedContent)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
        />
        <Input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Post Slug"
          required
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          required
          rows={10}
        />
        <Button type="submit">Create Post and Generate Social Content</Button>
      </form>

      {Object.keys(socialContent).length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">Generated Social Media Content</h2>
          {Object.entries(socialContent).map(([platform, content]) => (
            <Card key={platform}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 capitalize">{platform}</h3>
                <p className="whitespace-pre-wrap">{content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

