import { NextResponse } from 'next/server'
import { createClient } from 'contentful-management'
import { auth } from '@/auth'

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

const ALLOWED_ROLES = ['ADMIN', 'GDA_USER']

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user || !ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const post = await request.json()
    
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')
    
    const entry = await environment.createEntry('blogPage-3', {
      fields: {
        title: { 'en-US': post.title },
        slug: { 'en-US': post.slug },
        publicationOrBlog: { 'en-US': post.publicationOrBlog },
        date: { 'en-US': post.date },
        excerpt: { 'en-US': post.excerpt },
        body: { 'en-US': post.body },
        tags: { 'en-US': post.tags }
      }
    })

    await entry.publish()
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 