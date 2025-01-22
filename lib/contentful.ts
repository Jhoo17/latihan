import { createClient } from 'contentful'
import { createClient as createManagementClient } from 'contentful-management'
import { Document } from '@contentful/rich-text-types'
import type { Entry, EntryCollection } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN || !process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
  throw new Error(
    'Missing Contentful credentials. Please ensure you have the following in your .env.local file:\n' +
    '- CONTENTFUL_SPACE_ID\n' +
    '- CONTENTFUL_ACCESS_TOKEN\n' +
    '- CONTENTFUL_MANAGEMENT_TOKEN'
  )
}

export interface PostFields {
  title: string
  publicationOrBlog: boolean  // true for publication, false for blog
  slug: string
  date: string
  excerpt?: string
  body: Document
  tags?: string[]
  image?: {
    sys: {
      id: string
      linkType: "Asset"
      type: "Link"
    }
  }
  media?: {
    sys: {
      id: string
      linkType: "Asset"
      type: "Link"
    }
  }[]
  recommendedPosts?: {
    sys: {
      id: string
      linkType: "Entry"
      type: "Link"
    }
  }[]
}

export interface Post {
  sys: {
    id: string
    contentType: {
      sys: {
        id: string
      }
    }
  }
  fields: PostFields
  contentTypeId: 'blogPage-3'
}

// Delivery client for reading content
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: 'master',
})

// Management client for creating/updating content
export const managementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

export async function getEntry<T extends Post>(slug: string): Promise<Entry<T> | null> {
  try {
    const query: any = {
      content_type: 'blogPage-3',
      limit: 1,
      'fields.slug': slug,
      include: 2,
    }
    
    const entries = await client.getEntries<T>(query)
    return entries.items[0] || null
    
  } catch (error: any) {
    console.error("Contentful error details:", {
      message: error.message,
      details: error.details,
      status: error.status,
      statusText: error.statusText
    })
    return null
  }
}

export async function getEntries<T extends Post>(options = {}): Promise<Entry<T>[]> {
  const entries = await client.getEntries<T>({
    content_type: 'blogPage-3',
    include: 2,
    ...options,
  })

  return entries.items
}

export async function testConnection(): Promise<boolean> {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPage-3',
      limit: 1,
      include: 1
    })
    console.log('Connection successful:', {
      total: entries.total,
      contentType: entries.items[0]?.sys?.contentType?.sys?.id
    })
    return true
  } catch (error: any) {
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      details: error.details
    })
    return false
  }
}

