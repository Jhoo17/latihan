import { NextResponse } from 'next/server'
import { client } from '@/lib/contentful'
import type { Post } from '@/lib/contentful'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const response = await client.getEntries<Post>({
      content_type: 'blogPage-3',
      'fields.slug': params.slug,
      include: 2
    })
    
    if (!response.items.length) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(response.items[0])
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 