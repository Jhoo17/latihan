'use client'

import { useState, useRef, useEffect } from 'react'
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
import { redirect, useRouter } from 'next/navigation'
import { auth } from '@/auth'
import { createClient } from 'contentful-management'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const quillRef = useRef<any>(null)

  useEffect(() => {
    // Check auth on component mount
    fetch('/api/auth/check')
      .then(res => {
        if (!res.ok) {
          router.push('/login')
        } else {
          setIsLoading(false)
        }
      })
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    try {
      // Convert file to base64 if exists
      const imageFile = formData.get('image') as File
      let imageBase64 = ''
      
      if (imageFile?.size > 0) {
        const reader = new FileReader()
        imageBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      // Add content from Quill editor
      formData.set('content', content)
      
      // Add image as base64
      if (imageBase64) {
        formData.set('imageBase64', imageBase64)
      }

      const response = await fetch('/api/posts/create', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Publication</h2>
          <div className="flex items-center space-x-2">
            <Switch name="publish" id="publish" />
            <Label htmlFor="publish">Publish immediately</Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input 
              id="title"
              name="title"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input 
              id="slug"
              name="slug"
              placeholder="url-friendly-slug"
              required
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Post Excerpt</Label>
            <Textarea 
              id="excerpt"
              name="excerpt"
              placeholder="Brief description of the post"
              className="h-24"
            />
          </div>

          <div>
            <Label htmlFor="image">Featured Image</Label>
            <Input 
              id="image"
              name="image"
              type="file"
              accept="image/*"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <div className="prose max-w-none">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your post content here..."
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input 
              id="tags"
              name="tags"
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Post
        </Button>
      </form>
    </div>
  )
}

