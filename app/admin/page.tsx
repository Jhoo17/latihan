import { auth } from "@/auth"
import AdminDashboard from "./admin-dashboard"

export default async function AdminPage() {
  const session = await auth()
  
  return <AdminDashboard session={session} />
}

