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
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

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
    tags: [],
    media: []
  })

  const [uploadedMedia, setUploadedMedia] = useState<Array<{
    id: string;
    url: string;
    title: string;
  }>>([])

  const handleMediaUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.assetId && data.url) {
        // Add to media array
        setPost(prev => ({
          ...prev,
          media: [...(prev.media || []), {
            sys: {
              id: data.assetId,
              linkType: "Asset",
              type: "Link"
            }
          }]
        }))

        // Add to uploadedMedia for UI display
        setUploadedMedia(prev => [...prev, {
          id: data.assetId,
          url: data.url,
          title: file.name
        }])
      }
    } catch (error) {
      console.error('Error uploading media:', error)
      alert('Failed to upload media')
    }
  }

  const insertMediaToEditor = (mediaId: string, url: string) => {
    // Update the rich text content to include the media
    const newContent = {
      nodeType: 'embedded-asset-block',
      data: {
        target: {
          sys: {
            id: mediaId,
            type: 'Link',
            linkType: 'Asset'
          }
        }
      },
      content: []
    }

    setPost(prev => ({
      ...prev,
      body: {
        ...prev.body,
        content: [...prev.body.content, newContent]
      }
    }))
  }

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

  const mapNodeType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'bulletList': 'unordered-list',
      'orderedList': 'ordered-list',
      'listItem': 'list-item',
      'heading': 'heading-1',
      'blockquote': 'blockquote',
      'paragraph': 'paragraph',
      'image': 'embedded-asset-block'
    }
    return typeMap[type] || type
  }

  const mapTipTapToContentful = (jsonContent: any) => {
    const processNode = (node: any): any => {
      if (!node) return null

      // Handle text nodes
      if (node.text) {
        return {
          nodeType: 'text',
          value: node.text,
          marks: node.marks || [],
          data: {}
        }
      }

      // Handle image nodes - convert to asset-hyperlink
      if (node.type === 'image') {
        return {
          nodeType: 'asset-hyperlink',
          data: {
            target: {
              sys: {
                id: node.attrs['data-asset-id'],
                type: 'Link',
                linkType: 'Asset'
              }
            }
          },
          content: [{
            nodeType: 'text',
            value: node.attrs.alt || 'image',
            marks: [],
            data: {}
          }]
        }
      }

      // Handle other nodes
      const newNode: any = {
        nodeType: mapNodeType(node.type),
        data: {},
        content: []
      }

      if (node.content) {
        newNode.content = node.content
          .map(processNode)
          .filter(Boolean)
      }

      return newNode
    }

    return {
      nodeType: 'document',
      data: {},
      content: jsonContent.content.map(processNode).filter(Boolean)
    }
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
        body: JSON.stringify({
          fields: {
            title: post.title,
            slug: post.slug,
            body: post.body,
            excerpt: post.excerpt || '',
            date: post.date,
            tags: post.tags || [],
            publicationOrBlog: post.publicationOrBlog
          }
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create post')
      }

      // Reset form or redirect
      alert('Post created successfully!')
      // Reset form
      setPost({
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
        tags: [],
        media: []
      })
    } catch (error: any) {
      console.error('Error creating post:', error)
      alert(error.message)
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Media</label>
          <div className="border rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleMediaUpload(file)
              }}
              className="mb-4"
            />
            
            {/* Display uploaded media */}
            <div className="grid grid-cols-4 gap-4">
              {uploadedMedia.map((media) => (
                <div key={media.id} className="relative group">
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => insertMediaToEditor(media.id, media.url)}
                    className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    Insert into content
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Content</label>
          <RichTextEditor 
            content={post.body}
            onChange={(content) => {
              setPost(prev => ({
                ...prev,
                body: mapTipTapToContentful(content)
              }))
            }}
            uploadedMedia={uploadedMedia}
          />
        </div>

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

