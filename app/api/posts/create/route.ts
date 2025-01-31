import { NextResponse } from 'next/server'
import { createClient } from 'contentful-management'

// Initialize Contentful Management client
const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

// Content type ID harus sesuai dengan yang ada di Contentful
const CONTENT_TYPE_ID = 'blogPage-4'

interface EntryFields {
  title: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  description: {
    'en-US': string
  }
  content: {
    'en-US': {
      nodeType: string
      data: Record<string, any>
      content: Array<{
        nodeType: string
        data: Record<string, any>
        content: Array<{
          nodeType: string
          value: string
          marks: any[]
          data: Record<string, any>
        }>
      }>
    }
  }
  featuredImage?: {
    'en-US': {
      sys: {
        type: string
        linkType: string
        id: string
      }
    }
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')

    // Handle featured image upload if provided
    let featuredImageAsset = null
    if (data.featuredImage) {
      try {
        // Extract file data and metadata from base64
        const base64Data = data.featuredImage.split(';base64,').pop()
        const fileData = Buffer.from(base64Data!, 'base64')
        const contentType = data.featuredImage.split(';')[0].split(':')[1]
        
        // Upload image to Contentful
        featuredImageAsset = await environment.createAsset({
          fields: {
            title: {
              'en-US': `Featured image for ${data.title}`
            },
            description: {
              'en-US': `Featured image for blog post: ${data.title}`
            },
            file: {
              'en-US': {
                contentType,
                fileName: `${data.slug}-featured-image.${contentType.split('/')[1]}`,
                upload: fileData.toString('base64')
              }
            }
          }
        })

        // Process and publish the asset
        await featuredImageAsset.processForAllLocales()
        await featuredImageAsset.publish()
      } catch (error) {
        console.error('Error uploading featured image:', error)
        // Continue without featured image if upload fails
      }
    }

    // Create rich text content structure
    const richTextContent = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: data.content || '',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }

    // Create entry fields
    const fields: EntryFields = {
      title: {
        'en-US': data.title
      },
      slug: {
        'en-US': data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      },
      description: {
        'en-US': data.description || ''
      },
      content: {
        'en-US': richTextContent
      }
    }

    // Add featured image if available
    if (featuredImageAsset) {
      fields.featuredImage = {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: featuredImageAsset.sys.id
          }
        }
      }
    }

    console.log('Creating entry with fields:', JSON.stringify(fields, null, 2))

    // Create entry
    const entry = await environment.createEntry(CONTENT_TYPE_ID, { fields })

    // Publish the entry
    await entry.publish()

    return NextResponse.json({
      success: true,
      entry: entry
    })

  } catch (error: any) {
    console.error('Error creating post:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create post',
        details: error.message,
        fields: error.details?.errors || []
      },
      { status: 500 }
    )
  }
} 