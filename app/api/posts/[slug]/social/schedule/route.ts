import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

interface SchedulePostRequest {
  postId: string
  scheduledAt: string
}

interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    const user = session?.user as SessionUser | undefined

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = (await req.json()) as SchedulePostRequest
    const { postId, scheduledAt } = body

    const post = await prisma.socialMediaPost.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    if (post.userId !== user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedPost = await prisma.socialMediaPost.update({
      where: { id: postId },
      data: {
        scheduledAt: new Date(scheduledAt),
        status: 'SCHEDULED'
      }
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error scheduling post:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 