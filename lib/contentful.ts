import { createClient, Entry, EntrySkeletonType } from 'contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getEntry<T extends EntrySkeletonType>(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })

  return entries.items[0] as Entry<T>
}

export async function getEntries<T>(options = {}) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    ...options,
  })

  return entries.items as unknown as T[]
}

