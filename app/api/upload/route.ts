import { NextResponse } from 'next/server'
import { managementClient } from '@/lib/contentful'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Contentful
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')
    
    // Create the asset
    const asset = await environment.createAssetFromFiles({
      fields: {
        title: {
          'en-US': title
        },
        description: {
          'en-US': ''
        },
        file: {
          'en-US': {
            contentType: file.type,
            fileName: file.name,
            file: buffer
          }
        }
      }
    })

    // Process and publish the asset
    const processedAsset = await asset.processForAllLocales()
    await processedAsset.publish()

    // Return the asset URL and ID
    return NextResponse.json({
      url: `https:${processedAsset.fields.file['en-US'].url}`,
      assetId: processedAsset.sys.id
    })

  } catch (error: any) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
} 