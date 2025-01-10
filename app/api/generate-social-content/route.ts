import { NextResponse } from 'next/server'

type BlogPost = {
  title: string
  excerpt: string
  tags: string[]
  type: 'blog' | 'publication'
  slug: string
}

type SocialContent = {
  twitter: string
  linkedin: string
  instagram: string
}

function generateSocialContent(post: BlogPost): SocialContent {
  const hashtags = post.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')
  const postType = post.type === 'publication' ? 'New publication' : 'New blog post'

  const twitterContent = `${postType}: "${post.title}" 🌍🔬 
${post.excerpt.slice(0, 100)}...
Read more at https://geoconsult.com/blog/${post.slug}
${hashtags}`

  const linkedinContent = `We've just published a new ${post.type}: "${post.title}". 

${post.excerpt}

Read the full article here: https://geoconsult.com/blog/${post.slug}

${hashtags}`

  const instagramContent = `📚 ${postType} on GeoConsult:

"${post.title}"

${post.excerpt.slice(0, 200)}...

Read the full article at the link in our bio!

${hashtags}`

  return {
    twitter: twitterContent,
    linkedin: linkedinContent,
    instagram: instagramContent
  }
}

export async function POST(request: Request) {
  const blogPost: BlogPost = await request.json()
  const socialContent = generateSocialContent(blogPost)
  return NextResponse.json(socialContent)
}

