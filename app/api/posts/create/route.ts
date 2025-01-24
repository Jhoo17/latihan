import { NextResponse } from 'next/server'
import { createClient } from 'contentful-management'
import { auth } from '@/auth'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    
    // Validate and log all form fields
    const title = formData.get('title')?.toString()
    const slug = formData.get('slug')?.toString()
    const content = formData.get('content')?.toString()
    const excerpt = formData.get('excerpt')?.toString()
    const tags = formData.get('tags')?.toString()
    const file = formData.get('file') as File | null
    const publish = formData.get('publish') === 'on'

    console.log('Received form data:', {
      title,
      slug,
      excerpt,
      hasContent: !!content,
      tags,
      hasFile: !!file,
      publish
    })

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
    })

    console.log('Connecting to Contentful...')
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')
    
    // Convert Quill content to Contentful Rich Text
    const contentDocument = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: content || '',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }

    // Create entry with rich text content
    const entryData = {
      fields: {
        title: {
          'en-US': title
        },
        slug: {
          'en-US': slug.toLowerCase().replace(/\s+/g, '-')
        },
        description: {
          'en-US': excerpt || ''
        },
        content: {
          'en-US': contentDocument
        }
      }
    }

    if (tags) {
      entryData.fields.tags = {
        'en-US': tags.split(',').map(tag => tag.trim())
      }
    }

    console.log('Creating entry with data:', JSON.stringify(entryData, null, 2))

    const entry = await environment.createEntry('JooBlog', entryData)
    console.log('Entry created with ID:', entry.sys.id)

    // Handle featured image upload if provided
    if (file) {
      try {
        console.log('Uploading featured image:', file.name)
        const buffer = Buffer.from(await file.arrayBuffer())
        
        const asset = await environment.createAsset({
          fields: {
            title: {
              'en-US': `${title} - Featured Image`
            },
            description: {
              'en-US': `Featured image for ${title}`
            },
            file: {
              'en-US': {
                contentType: file.type,
                fileName: file.name,
                upload: buffer.toString('base64')
              }
            }
          }
        })

        console.log('Asset created, processing...')
        await asset.processForAllLocales()
        const publishedAsset = await asset.publish()
        console.log('Asset published with ID:', publishedAsset.sys.id)

        // Link asset to entry
        entry.fields.featuredImage = {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: publishedAsset.sys.id
            }
          }
        }

        await entry.update()
        console.log('Entry updated with featured image')
      } catch (error) {
        console.error('Error uploading image:', error)
        // Continue without image if upload fails
      }
    }

    // Process inline images from Quill content
    const inlineImages = extractBase64ImagesFromQuill(content)
    if (inlineImages.length > 0) {
      console.log(`Found ${inlineImages.length} inline images`)
      
      for (const [index, imageData] of inlineImages.entries()) {
        try {
          const buffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64')
          
          const asset = await environment.createAsset({
            fields: {
              title: {
                'en-US': `${title} - Inline Image ${index + 1}`
              },
              description: {
                'en-US': `Inline image ${index + 1} for ${title}`
              },
              file: {
                'en-US': {
                  contentType: 'image/jpeg',
                  fileName: `inline-image-${index + 1}.jpg`,
                  upload: buffer.toString('base64')
                }
              }
            }
          })

          await asset.processForAllLocales()
          const publishedAsset = await asset.publish()
          
          // Replace base64 image in content with Contentful asset URL
          const assetUrl = `https:${publishedAsset.fields.file['en-US'].url}`
          content = content.replace(imageData, assetUrl)
        } catch (error) {
          console.error(`Error uploading inline image ${index + 1}:`, error)
        }
      }

      // Update entry with processed content
      entry.fields.content = {
        'en-US': content
      }
      await entry.update()
    }

    // Publish entry if requested
    if (publish) {
      console.log('Publishing entry...')
      await entry.publish()
      console.log('Entry published successfully')
    }

    return NextResponse.json({ 
      success: true,
      message: 'Post created successfully',
      data: {
        id: entry.sys.id,
        title: entry.fields.title['en-US'],
        slug: entry.fields.slug['en-US']
      }
    })
  } catch (error: any) {
    console.error('Error creating post:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.details || error.response?.data,
      status: error.status,
      statusText: error.statusText
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to create post',
        message: error.message,
        details: error.details || error.response?.data || error.stack
      },
      { status: 500 }
    )
  }
}

// Helper function to extract base64 images from Quill content
function extractBase64ImagesFromQuill(content: string): string[] {
  const base64Regex = /data:image\/[^;]+;base64,[^"]+/g
  return content.match(base64Regex) || []
} 