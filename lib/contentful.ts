import { createClient, Entry, EntrySkeletonType } from 'contentful'
import { Document } from '@contentful/rich-text-types'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing Contentful credentials')
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
  recommendedPosts?: {
    sys: {
      id: string
      linkType: "Entry"
      type: "Link"
    }
  }[]
}

export interface Post extends EntrySkeletonType {
  fields: PostFields
  contentTypeId: 'blogPage-3'
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: 'master',
})

export async function getEntry<T extends EntrySkeletonType>(slug: string): Promise<Entry<T> | null> {
  try {
    const query = {
      content_type: 'blogPage-3',
      limit: 1,
      [`fields.slug`]: slug,
    }
    const entries = await client.getEntries<T>(query)
    return entries.items[0] || null
  } catch (error: any) {
    console.error('Contentful error details:', {
      message: error.message,
      details: error.details,
      status: error.status,
      statusText: error.statusText
    })
    return null
  }
}

export async function getEntries<T extends EntrySkeletonType>(options = {}) {
  const entries = await client.getEntries<T>({
    content_type: 'blogPage-3',
    ...options,
  })

  return entries.items
}

export async function testConnection() {
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

