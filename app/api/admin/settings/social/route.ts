import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { kv } from "@vercel/kv"

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

interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string
}

export async function GET() {
  try {
    const session = await auth()
    const user = session?.user as SessionUser | undefined

    if (!user?.id || user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const settings = await kv.get<SocialAccountSettings>('social_settings')
    return NextResponse.json(settings || {})
  } catch (error) {
    console.error('Error fetching social settings:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    const user = session?.user as SessionUser | undefined

    if (!user?.id || user.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const settings = await req.json()
    await kv.set('social_settings', settings)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving social settings:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 