import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 