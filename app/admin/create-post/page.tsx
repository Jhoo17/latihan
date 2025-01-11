'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PostFields } from '@/lib/contentful'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

export default function CreatePostPage() {
  const [post, setPost] = useState<Partial<PostFields>>({
    title: '',
    slug: '',
    publicationOrBlog: false,
    date: new Date().toISOString(),
    excerpt: '',
    body: {
      nodeType: 'document',
      data: {},
      content: []
    },
    tags: []
  })

  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')    // Replace spaces with -
      .replace(/[^a-z0-9-]+/g, '') // Only allow letters, numbers, and hyphens
      .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen

  }

  const formatTags = (text: string) => {
    return text
      .split(',') //
      .map(tag => tag.trim()) //
      .filter(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!post.title || !post.slug) {
      alert('Title and slug are required')
      return
    }
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create post')
      }

      // Reset form or redirect
      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post: ' + (error as Error).message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="post-type"
            checked={post.publicationOrBlog}
            onCheckedChange={(checked) => 
              setPost(prev => ({ ...prev, publicationOrBlog: checked }))
            }
          />
          <Label htmlFor="post-type">
            {post.publicationOrBlog ? 'Publication' : 'Blog Post'}
          </Label>
        </div>

        <Input
          type="text"
          value={post.title}
          onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Post Title"
          required
        />

        <Input
          type="text"
          value={post.slug}
          onChange={(e) => setPost(prev => ({ 
            ...prev, 
            slug: formatSlug(e.target.value)
          }))}
          placeholder="URL Slug (spaces will be converted to hyphens)"
          required
        />

        <Textarea
          value={post.excerpt}
          onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Post Excerpt"
          rows={3}
        />

        <RichTextEditor
          content={post.body.content || ''}
          onChange={(htmlContent) => {
            // Convert HTML to Contentful Rich Text format
            setPost(prev => ({
              ...prev,
              body: {
                nodeType: 'document',
                data: {},
                content: [
                  {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                      {
                        nodeType: 'text',
                        marks: [],
                        data: {},
                        value: htmlContent,
                      }
                    ]
                  }
                ]
              }
            }))
          }}
        />

        <Input
          type="text"
          value={post.tags?.join(', ') || ''}
          onChange={(e) => {
            // Just update the input value directly
            const inputValue = e.target.value;
            const currentTags = inputValue.length > 0 ? inputValue.split(',').map(tag => tag.trim()) : [];
            setPost(prev => ({ ...prev, tags: currentTags }));
          }}
          placeholder="Tags (comma separated)"
          onBlur={(e) => {
            // Process tags only when the input loses focus
            const tags = formatTags(e.target.value);
            setPost(prev => ({ ...prev, tags }));
          }}
        />

        <Button type="submit">Create Post</Button>
      </form>
    </div>
  )
}

