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

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Auto-login after signup
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1500)
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

        <h1 className="text-2xl font-bold text-center mb-2">{translations.signupTitle}</h1>
        <p className="text-center text-gray-600 mb-6">{translations.appTitle}</p>

        {success ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            Conta criada com sucesso! Redirecionando...
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
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
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? translations.signingUp : translations.signupButton}
            </Button>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          {translations.hasAccount}{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            {translations.login}
          </Link>
        </p>
      </Card>
    </div>
  )
}
