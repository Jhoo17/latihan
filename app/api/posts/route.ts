import { NextResponse } from 'next/server'
import { managementClient } from '@/lib/contentful'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    if (!body?.fields) {
      return NextResponse.json(
        { error: 'Invalid request body: missing fields' },
        { status: 400 }
      )
    }

    // Clean up the body content to remove any empty asset links
    const cleanBody = {
      ...body.fields.body,
      content: body.fields.body.content.map((node: any) => {
        if (node.nodeType === 'embedded-asset-block' && (!node.data?.target?.sys?.id || node.data.target.sys.id === '')) {
          return {
            nodeType: 'paragraph',
            data: {},
            content: []
          }
        }
        return node
      })
    }

    // Create the entry with proper structure
    const entry = {
      fields: {
        title: {
          'en-US': body.fields.title
        },
        slug: {
          'en-US': body.fields.slug
        },
        body: {
          'en-US': cleanBody
        },
        excerpt: {
          'en-US': body.fields.excerpt
        },
        date: {
          'en-US': body.fields.date
        },
        tags: {
          'en-US': Array.isArray(body.fields.tags) ? body.fields.tags : []
        },
        publicationOrBlog: {
          'en-US': Boolean(body.fields.publicationOrBlog)
        }
      }
    }

    // Use the management client correctly
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')
    const response = await environment.createEntry('blogPage-3', entry)
    
    // Publish the entry immediately
    await response.publish()

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      stack: error.stack,
      body: error.response?.data || error
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to create post', 
        details: error.message,
        fields: error.details?.errors || [],
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: 'blogPage-3',
      order: ['-sys.createdAt'],
      limit: 10,
      include: 2  // Include linked assets (images)
    })
    
    return NextResponse.json(response.items)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 