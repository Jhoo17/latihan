import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { getServerSession } from "next-auth/next"

export const auth = () => getServerSession(authConfig)

