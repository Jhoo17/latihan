'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PostFiltersProps {
  tags: string[]
  selectedType: string
  selectedTags: string[]
  onTypeChange: (type: string) => void
  onTagToggle: (tag: string) => void
}

export function PostFilters({
  tags,
  selectedType,
  selectedTags,
  onTypeChange,
  onTagToggle,
}: PostFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Type</h3>
        <Tabs value={selectedType} onValueChange={onTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="publication">Publication</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(selectedType !== 'all' || selectedTags.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onTypeChange('all')
            selectedTags.forEach(tag => onTagToggle(tag))
          }}
          className="text-muted-foreground"
        >
          Clear filters
        </Button>
      )}
    </div>
  )
} 