'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post, PostFields } from "@/lib/contentful"
import { Entry } from "contentful"
import { PostFilters } from "@/components/blog/post-filters"

function usePostFilters(posts: Entry<Post>[]) {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = useState(posts)

  // Get unique tags from all posts
  const allTags = posts.reduce<string[]>((acc, post) => {
    const tags = post.fields.tags || []
    tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, []).sort()

  // Handle type change
  const handleTypeChange = (type: string) => {
    setSelectedType(type)
  }

  // Handle tag toggle
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Filter posts based on selected type and tags
  useEffect(() => {
    let filtered = posts

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(post =>
        selectedType === 'publication'
          ? post.fields.publicationOrBlog
          : !post.fields.publicationOrBlog
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => {
        const postTags = post.fields.tags || []
        return selectedTags.every(selectedTag => postTags.includes(selectedTag))
      })
    }

    setFilteredPosts(filtered)
  }, [selectedType, selectedTags, posts])

  return {
    filteredPosts,
    selectedType,
    selectedTags,
    allTags,
    handleTypeChange,
    handleTagToggle,
  }
}

export default function BlogList({ posts }: { posts: Entry<Post>[] }) {
  const {
    filteredPosts,
    selectedType,
    selectedTags,
    allTags,
    handleTypeChange,
    handleTagToggle,
  } = usePostFilters(posts)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog & Publications</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Explore our latest geological insights, research papers, and industry updates
        </p>

        <PostFilters
          tags={allTags}
          selectedType={selectedType}
          selectedTags={selectedTags}
          onTypeChange={handleTypeChange}
          onTagToggle={handleTagToggle}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No posts found with the selected filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((entry) => {
            const post = entry.fields as PostFields
            return (
              <Card key={entry.sys.id} className="flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-xl font-semibold leading-tight">{post.title}</h2>
                    <Badge variant={post.publicationOrBlog ? 'default' : 'outline'}>
                      {post.publicationOrBlog ? 'Publication' : 'Blog'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    Published on: {new Date(post.date).toLocaleDateString()}
                  </p>
                  
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="space-y-4">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant={selectedTags.includes(tag) ? "default" : "secondary"}
                            className="text-xs cursor-pointer"
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/blog/${post.slug || entry.sys.id}`} className="block">
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
} 