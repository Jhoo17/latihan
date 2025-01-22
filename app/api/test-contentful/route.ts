import { testConnection } from '@/lib/contentful'
import { NextResponse } from 'next/server'

export async function GET() {
  const isConnected = await testConnection()
  return NextResponse.json({ success: isConnected })
} 