import { createClient } from 'contentful'
import { Document } from '@contentful/rich-text-types'
import { Entry, EntrySkeletonType, Asset } from 'contentful'

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

export interface ContentfulAsset extends Asset {
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
  featuredImage?: ContentfulAsset
  slug: string
  content: {
    nodeType: string
    data: Record<string, any>
    content: Array<{
      nodeType: string
      data: Record<string, any>
      content: Array<{
        nodeType: string
        value?: string
        marks?: Array<{ type: string }>
        data?: Record<string, any>
      }>
    }>
  }
}

export interface Post extends EntrySkeletonType {
  fields: PostFields
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
}

export async function getEntry(slug: string): Promise<Entry<Post> | null> {
  try {
    const response = await client.getEntries<Post>({
      content_type: 'blogPage-4',
      'fields.slug': slug,
      limit: 1,
      include: 2
    } as any)
    
    console.log('Entry found:', {
      found: response.items.length > 0,
      slug,
      entry: response.items[0],
      fields: response.items[0]?.fields,
      content: response.items[0]?.fields?.content
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

