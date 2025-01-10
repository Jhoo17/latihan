import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}! This is a protected admin page.</p>
    </div>
  )
}

