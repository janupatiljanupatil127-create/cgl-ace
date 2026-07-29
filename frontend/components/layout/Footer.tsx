"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, Github, Twitter, Linkedin, Send } from "lucide-react"

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const columns = [
    {
      title: "Features",
      links: [
        { name: "Mock Tests", href: "/mock-tests" },
        { name: "Study Notes", href: "/study-materials" },
        { name: "Previous Papers", href: "/previous-years" },
        { name: "Current Affairs", href: "/current-affairs" },
      ],
    },
    {
      title: "Exams Covered",
      links: [
        { name: "SSC CGL Tier-I", href: "#" },
        { name: "SSC CGL Tier-II", href: "#" },
        { name: "SSC CGL Math & Reasoning", href: "#" },
        { name: "SSC CGL English & GA", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/#faq" },
        { name: "About Us", href: "#" },
        { name: "Contact Support", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-secondary/20 border-t border-border/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Logo and Brand description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                CGL Ace
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              CGL Ace is the ultimate next-generation preparation platform for SSC aspirants. We offer hyper-realistic mock testing environments, concept notes, and curated GK materials to help you secure top officer ranks.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Dynamic Link columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.href.startsWith("/") || link.href.startsWith("#") ? (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Form */}
          <div className="lg:col-span-2 space-y-4 md:col-span-1">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Subscribe to Exam Alerts
            </h3>
            <p className="text-sm text-muted-foreground">
              Get direct updates on SSC notifications, syllabus changes, and free mock test launches.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2 max-w-sm">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-95 shadow-md shadow-blue-500/15 cursor-pointer transition-opacity"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs font-semibold text-emerald-500 transition-opacity">
                Thank you! You are subscribed to exam alerts.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CGL Ace. Developed for premium exam preparation. All mock data is static/dummy.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
