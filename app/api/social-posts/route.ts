import { NextResponse } from 'next/server'

// This is a mock API route. In a real application, you would fetch data from actual social media APIs.
export async function GET() {
  const mockPosts = [
    {
      id: '1',
      platform: 'twitter',
      content: 'Exciting new geological findings in our latest survey! #Geology #Research',
      date: '2023-05-15T10:00:00Z',
      link: 'https://twitter.com/geoconsult/status/1'
    },
    {
      id: '2',
      platform: 'linkedin',
      content: "We're thrilled to announce our partnership with XYZ Mining Corporation for a major resource estimation project.",
      date: '2023-05-14T14:30:00Z',
      link: 'https://www.linkedin.com/company/geoconsult/posts/2'
    },
    {
      id: '3',
      platform: 'instagram',
      content: 'Beautiful rock formations spotted during our field work in the Andes. Swipe to see more! 📸🏔️',
      date: '2023-05-13T09:15:00Z',
      link: 'https://www.instagram.com/p/3'
    },
    // Add more mock posts as needed
  ]

  return NextResponse.json(mockPosts)
}

