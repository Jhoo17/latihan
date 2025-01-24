import { createClient } from 'contentful'
import { Document } from '@contentful/rich-text-types'
import { Entry, EntrySkeletonType } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    'Missing Contentful credentials. Please ensure you have the following in your .env.local file:\n' +
    '- CONTENTFUL_SPACE_ID\n' +
    '- CONTENTFUL_ACCESS_TOKEN'
  )
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: 'master',
})

export interface Asset {
  sys: {
    id: string
    type: string
    linkType: string
  }
  fields: {
    title: string
    description?: string
    file: {
      url: string
      details: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: string
    }
  }
}

export interface PostFields {
  title: string
  description?: string
  featuredImage?: {
    sys: {
      id: string
      type: string
      linkType: string
    }
    fields: {
      title: string
      description?: string
      file: {
        url: string
        details: {
          size: number
          image?: {
            width: number
            height: number
          }
        }
        fileName: string
        contentType: string
      }
    }
  }
  slug: string
  content: Document
}

export interface Post extends EntrySkeletonType {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
    contentType: {
      sys: {
        id: string
        type: string
        linkType: string
      }
    }
  }
  fields: PostFields
  contentTypeId: 'blogPage-4'
}

export async function getEntry(slug: string): Promise<Entry<Post> | null> {
  try {
    const response = await client.getEntries<Post>({
      content_type: 'blogPage-4',
      'fields.slug[match]': slug,
      limit: 1,
      include: 2
    } as any)
    
    console.log('Entry found:', {
      found: response.items.length > 0,
      entry: response.items[0]
    })
    
    return response.items[0] || null
  } catch (error: any) {
    console.error('Error fetching entry:', error.message)
    return null
  }
}

export async function getEntries(options = {}): Promise<Entry<Post>[]> {
  try {
    const response = await client.getEntries<Post>({
      content_type: 'blogPage-4',
      order: ['-sys.createdAt'],
      include: 2,
      ...options
    })
    
    console.log('Fetched entries:', {
      total: response.total,
      items: response.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug
      }))
    })
    
    return response.items
  } catch (error: any) {
    console.error('Error fetching entries:', error.message)
    return []
  }
}

export async function testConnection() {
  try {
    const response = await client.getEntries<Post>({
      content_type: 'blogPage-4',
      limit: 1
    })
    
    console.log('Connection successful:', {
      total: response.total,
      contentType: response.items[0]?.sys?.contentType?.sys?.id,
      firstEntry: response.items[0]
    })
    
    return true
  } catch (error: any) {
    console.error('Connection failed:', error.message)
    return false
  }
}

