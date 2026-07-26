"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  // States
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
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
          <h2 className="text-2xl font-extrabold tracking-tight">Forgot Password?</h2>
          <p className="text-sm text-muted-foreground">Enter your registered email below to receive password reset instructions.</p>
        </div>

        {success ? (
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center justify-center text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <h4 className="text-sm font-bold text-foreground">Reset Link Sent</h4>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                We have sent a simulated password recovery link to <strong className="text-foreground font-bold">{email}</strong>.
              </p>
              <div className="mt-2.5 pt-2 border-t border-border/20 w-full">
                <Link
                  href="/reset-password"
                  className="text-xs text-primary font-bold hover:underline block text-center"
                >
                  [Simulate Email Link Click] Reset Password &rarr;
                </Link>
              </div>
            </div>
            <Link
              href="/login"
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-85"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting Email...</span>
                </>
              ) : (
                <span>Request Recovery Link</span>
              )}
            </button>

            <Link
              href="/login"
              className="w-full py-3 rounded-xl text-xs font-bold border border-border hover:bg-secondary flex items-center justify-center space-x-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  )
}
