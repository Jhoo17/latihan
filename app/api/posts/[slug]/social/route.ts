import { NextResponse } from "next/server"
import { getEntry } from "@/lib/contentful"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import type { Post } from "@/lib/contentful"
import { generateSocialContent } from "@/lib/openai"
import { kv } from "@vercel/kv"

type SocialPlatform = 'TWITTER' | 'LINKEDIN' | 'FACEBOOK' | 'INSTAGRAM'

interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string
}

interface SocialAccountSettings {
  twitter?: {
    apiKey: string
    apiSecret: string
    accessToken: string
    accessTokenSecret: string
  }
  linkedin?: {
    clientId: string
    clientSecret: string
    accessToken: string
  }
  facebook?: {
    appId: string
    appSecret: string
    accessToken: string
    pageId: string
  }
  instagram?: {
    accessToken: string
    userId: string
  }
}

const PLATFORM_MAX_LENGTHS = {
  TWITTER: 280,
  LINKEDIN: 3000,
  FACEBOOK: 63206,
  INSTAGRAM: 2200,
}

async function generatePlatformContent(post: Post, platform: SocialPlatform) {
  const content = await generateSocialContent({
    title: post.fields.title,
    content: post.fields.excerpt || '',
    platform,
    maxLength: PLATFORM_MAX_LENGTHS[platform],
  })

  return content
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth()
    const user = session?.user as SessionUser | undefined

    if (!user?.id || user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await getEntry<Post>(params.slug)
    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    // Get social media settings
    const settings = await kv.get<SocialAccountSettings>('social_settings')
    if (!settings) {
      return new NextResponse(
        "Social media accounts not configured. Please configure them in settings.",
        { status: 400 }
      )
    }

    // Generate content for each configured platform
    const platforms = Object.keys(settings).filter(
      platform => settings[platform as keyof SocialAccountSettings]
    ) as SocialPlatform[]

    const socialPosts = await Promise.all(
      platforms.map(async (platform) => ({
        platform,
        content: await generatePlatformContent(post, platform)
      }))
    )
    
    const createdPosts = await Promise.all(
      socialPosts.map(({ platform, content }) =>
        prisma.socialMediaPost.create({
          data: {
            platform,
            content,
            contentfulPostId: post.sys.id,
            userId: user.id,
            imageUrl: post.fields.image?.sys?.id 
              ? `https://images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID}/${post.fields.image.sys.id}`
              : null,
            status: 'DRAFT'
          }
        })
      )
    )

    return NextResponse.json(createdPosts)
  } catch (error) {
    console.error('Error generating social posts:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 