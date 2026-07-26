"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  Menu,
  X,
  Bell,
  User,
  LayoutDashboard,
  Layers,
  FileText,
  LogOut,
  ChevronRight,
  BookOpen
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const [username, setUsername] = React.useState("Anuj Sharma")
  const [initials, setInitials] = React.useState("AS")

  React.useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("cgl_username")
      if (stored) {
        setUsername(stored)
        const parts = stored.split(" ")
        const init = parts.map((p) => p.charAt(0)).join("").substring(0, 2).toUpperCase()
        setInitials(init || "US")
      }
    }

    if (typeof window !== "undefined") {
      loadUser()
      window.addEventListener("storage", loadUser)
      return () => window.removeEventListener("storage", loadUser)
    }
  }, [])

  const mobileNavItems = [
    { name: "Main Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Practice Mocks", href: "/mock-tests", icon: Layers },
    { name: "Study Library", href: "/study-materials", icon: FileText },
    { name: "Profile Settings", href: "/profile", icon: User },
    { name: "Admin Portal", href: "/admin", icon: BookOpen },
  ]

  const getBreadcrumbName = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Main Dashboard"
      case "/profile":
        return "Profile & Accomplishments"
      case "/admin":
        return "Admin Portal"
      default:
        return "Dashboard"
    }
  }

  const notifications = [
    { id: "n-1", message: "Mock Test 1 scorecard is ready.", time: "2 hrs ago" },
    { id: "n-2", message: "July Week-3 Current Affairs PDF is out.", time: "1 day ago" },
    { id: "n-3", message: "Daily study streak maintained!", time: "2 days ago" }
  ]

  return (
    <div className="flex min-h-screen bg-secondary/10">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border/40 bg-card px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 focus:outline-none md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => router.push("/")}>CGL Ace</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-semibold">
                {getBreadcrumbName(pathname)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3.5">
            <ThemeToggle />

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer relative"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-border shadow-xl p-4 z-50 space-y-3"
                    >
                      <h4 className="text-xs font-bold text-foreground">Recent Notifications</h4>
                      <div className="h-px bg-border/40" />
                      <div className="space-y-2.5 max-h-[200px] overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="text-xs space-y-0.5">
                            <p className="text-foreground font-semibold leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-muted-foreground">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile avatar */}
            <Link
              href="/profile"
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border/40 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {initials}
              </div>
              <span className="text-xs font-bold text-foreground hidden sm:block">{username}</span>
            </Link>
          </div>
        </header>

        {/* Child Pages Router */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border shadow-2xl p-6 z-50 flex flex-col justify-between md:hidden"
            >
              <div className="space-y-8">
                {/* Brand Header */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center space-x-2"
                  >
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-lg">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      CGL Ace
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav list */}
                <nav className="space-y-2">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                          active
                            ? "text-primary bg-primary/5 border-primary/10 shadow-sm"
                            : "text-muted-foreground hover:bg-secondary/50 border-transparent hover:text-foreground"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Logout */}
              <div className="space-y-2 border-t border-border/40 pt-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-secondary/40 hover:text-foreground cursor-pointer"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Main Site</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    router.push("/login")
                  }}
                  className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/5 cursor-pointer text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
