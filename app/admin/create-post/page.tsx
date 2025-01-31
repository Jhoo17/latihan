'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    
    try {
      const postData = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        content: content,
        featuredImage: previewImage || null
      }

      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || 'Failed to create post')
      }

      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Error creating post:', error)
      alert(error instanceof Error ? error.message : 'Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input 
            id="title"
            name="title"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            name="description"
            placeholder="Brief description of the post"
            className="h-24"
          />
        </div>

        {/* Featured Image */}
        <div>
          <Label htmlFor="featuredImage">Featured Image</Label>
          <Input 
            id="featuredImage"
            name="featuredImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="mt-2">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-w-xs rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Slug */}
        <div>
          <Label htmlFor="slug">URL Slug *</Label>
          <Input 
            id="slug"
            name="slug"
            placeholder="url-friendly-slug"
            required
          />
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="content">Content *</Label>
          <div className="prose max-w-none">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your post content here..."
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Post...' : 'Create Post'}
        </Button>
      </form>
    </div>
  )
}

