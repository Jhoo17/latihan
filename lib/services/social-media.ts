import { kv } from "@vercel/kv"
import { Post } from "@/lib/contentful"
import { generateSocialContent } from "@/lib/openai"
import { prisma } from "@/lib/prisma"

export type SocialPlatform = 'TWITTER' | 'LINKEDIN' | 'FACEBOOK' | 'INSTAGRAM'

export interface SocialAccountSettings {
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
} as const

export class SocialMediaService {
  private static async getSettings(): Promise<SocialAccountSettings | null> {
    return kv.get<SocialAccountSettings>('social_settings')
  }

  private static async saveSettings(settings: SocialAccountSettings): Promise<void> {
    await kv.set('social_settings', settings)
  }

  private static async generatePlatformContent(post: Post, platform: SocialPlatform): Promise<string> {
    return generateSocialContent({
      title: post.fields.title,
      content: post.fields.excerpt || '',
      platform,
      maxLength: PLATFORM_MAX_LENGTHS[platform],
    })
  }

  static async generateSocialPosts(post: Post, userId: string) {
    const settings = await this.getSettings()
    if (!settings) {
      throw new Error("Social media accounts not configured")
    }

    // Generate content for each configured platform
    const platforms = Object.keys(settings).filter(
      platform => settings[platform as keyof SocialAccountSettings]
    ) as SocialPlatform[]

    const socialPosts = await Promise.all(
      platforms.map(async (platform) => ({
        platform,
        content: await this.generatePlatformContent(post, platform)
      }))
    )
    
    return Promise.all(
      socialPosts.map(({ platform, content }) =>
        prisma.socialMediaPost.create({
          data: {
            platform,
            content,
            contentfulPostId: post.sys.id,
            userId,
            imageUrl: post.fields.image?.sys?.id 
              ? `https://images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID}/${post.fields.image.sys.id}`
              : null,
            status: 'DRAFT'
          }
        })
      )
    )
  }

  static async schedulePost(postId: string, userId: string, scheduledAt: Date) {
    const post = await prisma.socialMediaPost.findUnique({
      where: { id: postId }
    })

    if (!post) {
      throw new Error("Post not found")
    }

    if (post.userId !== userId) {
      throw new Error("Unauthorized")
    }

    return prisma.socialMediaPost.update({
      where: { id: postId },
      data: {
        scheduledAt,
        status: 'SCHEDULED'
      }
    })
  }

  static async publishPost(postId: string, userId: string) {
    const post = await prisma.socialMediaPost.findUnique({
      where: { id: postId },
      include: {
        user: true
      }
    })

    if (!post) {
      throw new Error("Post not found")
    }

    if (post.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const settings = await this.getSettings()
    if (!settings) {
      throw new Error("Social media accounts not configured")
    }

    try {
      // TODO: Implement actual social media posting logic here
      // This would involve using the respective platform SDKs
      
      return prisma.socialMediaPost.update({
        where: { id: postId },
        data: {
          status: 'POSTED',
          postedAt: new Date()
        }
      })
    } catch (error) {
      await prisma.socialMediaPost.update({
        where: { id: postId },
        data: {
          status: 'FAILED'
        }
      })
      throw error
    }
  }
} 