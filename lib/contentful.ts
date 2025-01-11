import { createClient, Entry, EntrySkeletonType } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing Contentful credentials')
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: 'master',
})

export async function getEntry<T>(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPage',
      'fields.slug': slug,
      limit: 1,
    })
    console.log('Contentful response:', entries)
    return entries.items[0] as Entry<T>
  } catch (error) {
    console.error('Contentful error details:', {
      message: error.message,
      details: error.details,
      status: error.status,
      statusText: error.statusText
    })
    return null
  }
}

export async function getEntries<T>(options = {}) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    ...options,
  })

  return entries.items as unknown as T[]
}

export async function testConnection() {
  try {
    const entries = await client.getEntries({
      content_type: 'blogPage',
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

