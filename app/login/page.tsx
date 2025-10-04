"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Home } from "lucide-react"
import Link from "next/link"
import { translations } from "@/lib/translations"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Home className="h-7 w-7 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">{translations.loginTitle}</h1>
        <p className="text-center text-gray-600 mb-6">{translations.appTitle}</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{translations.email}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{translations.password}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? translations.loggingIn : translations.loginButton}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {translations.noAccount}{" "}
          <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
            {translations.signup}
          </Link>
        </p>
      </Card>
    </div>
  )
}
