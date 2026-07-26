"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { MOCK_TESTS } from "@/data/mockData"

export default function LoginPage() {
  const router = useRouter()

  // States
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic mock checks
    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (typeof window !== "undefined") {
        const username = email.split("@")[0]
          .split(/[\._-]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")
        localStorage.setItem("cgl_username", username)
        localStorage.setItem("cgl_email", email)

        const isDemoEmail = email.toLowerCase().includes("demo") || email.toLowerCase().includes("anuj")
        if (isDemoEmail) {
          localStorage.removeItem("cgl_mock_tests")
          localStorage.removeItem("cgl_activities")
          localStorage.removeItem("cgl_streak_days")
          localStorage.removeItem("cgl_streak_count")
        } else {
          const cleanMocks = MOCK_TESTS.map((t) => ({
            ...t,
            isAttempted: false,
            score: undefined,
            accuracy: undefined,
          }))
          localStorage.setItem("cgl_mock_tests", JSON.stringify(cleanMocks))
          localStorage.setItem("cgl_activities", JSON.stringify([]))
          localStorage.setItem("cgl_streak_days", JSON.stringify([]))
          localStorage.setItem("cgl_streak_count", "0")
        }
      }
      // Redirect to Dashboard
      router.push("/dashboard")
    }, 1200)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-card border border-border shadow-2xl relative"
      >
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome Back to CGL Ace</h2>
          <p className="text-sm text-muted-foreground">Sign in to resume your study streak and practice mocks.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <p className="text-xs font-semibold text-rose-500 bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-80"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
          New to CGL Ace?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Create an account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
