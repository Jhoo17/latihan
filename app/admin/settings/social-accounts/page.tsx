'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

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

export default function SocialAccountsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<SocialAccountSettings>({})
  const [error, setError] = useState("")

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formData = new FormData(event.currentTarget)
      const data = {
        twitter: {
          apiKey: formData.get('twitter-api-key'),
          apiSecret: formData.get('twitter-api-secret'),
          accessToken: formData.get('twitter-access-token'),
          accessTokenSecret: formData.get('twitter-access-token-secret'),
        },
        linkedin: {
          clientId: formData.get('linkedin-client-id'),
          clientSecret: formData.get('linkedin-client-secret'),
          accessToken: formData.get('linkedin-access-token'),
        },
        facebook: {
          appId: formData.get('facebook-app-id'),
          appSecret: formData.get('facebook-app-secret'),
          accessToken: formData.get('facebook-access-token'),
          pageId: formData.get('facebook-page-id'),
        },
        instagram: {
          accessToken: formData.get('instagram-access-token'),
          userId: formData.get('instagram-user-id'),
        },
      }

      const response = await fetch('/api/admin/settings/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Social Media Accounts</h1>
      
      <form onSubmit={saveSettings} className="space-y-8">
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.twitter className="h-5 w-5" />
              Twitter Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="twitter-api-key">API Key</Label>
                <Input id="twitter-api-key" name="twitter-api-key" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter-api-secret">API Secret</Label>
                <Input id="twitter-api-secret" name="twitter-api-secret" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter-access-token">Access Token</Label>
                <Input id="twitter-access-token" name="twitter-access-token" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter-access-token-secret">Access Token Secret</Label>
                <Input id="twitter-access-token-secret" name="twitter-access-token-secret" type="password" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.linkedin className="h-5 w-5" />
              LinkedIn Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="linkedin-client-id">Client ID</Label>
                <Input id="linkedin-client-id" name="linkedin-client-id" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin-client-secret">Client Secret</Label>
                <Input id="linkedin-client-secret" name="linkedin-client-secret" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin-access-token">Access Token</Label>
                <Input id="linkedin-access-token" name="linkedin-access-token" type="password" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.facebook className="h-5 w-5" />
              Facebook Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="facebook-app-id">App ID</Label>
                <Input id="facebook-app-id" name="facebook-app-id" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook-app-secret">App Secret</Label>
                <Input id="facebook-app-secret" name="facebook-app-secret" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook-access-token">Access Token</Label>
                <Input id="facebook-access-token" name="facebook-access-token" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook-page-id">Page ID</Label>
                <Input id="facebook-page-id" name="facebook-page-id" type="text" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.instagram className="h-5 w-5" />
              Instagram Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="instagram-access-token">Access Token</Label>
                <Input id="instagram-access-token" name="instagram-access-token" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instagram-user-id">User ID</Label>
                <Input id="instagram-user-id" name="instagram-user-id" type="text" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
} 