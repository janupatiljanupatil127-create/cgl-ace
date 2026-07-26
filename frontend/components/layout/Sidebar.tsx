"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Layers,
  FileText,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Home
} from "lucide-react"
import { motion } from "framer-motion"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const navItems = [
    { name: "Main Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Practice Mocks", href: "/mock-tests", icon: Layers },
    { name: "Study Library", href: "/study-materials", icon: FileText },
    { name: "Profile Settings", href: "/profile", icon: User },
    { name: "Admin Portal", href: "/admin", icon: BookOpen },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex flex-col justify-between border-r border-border/40 bg-card h-screen sticky top-0 flex-shrink-0 relative overflow-hidden"
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-border/40 justify-between">
          <Link href="/" className="flex items-center space-x-2.5 overflow-hidden">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/15 flex-shrink-0">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight whitespace-nowrap"
              >
                CGL Ace
              </motion.span>
            )}
          </Link>
          
          {/* Collapse trigger */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-border/50 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3.5 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all relative overflow-hidden cursor-pointer ${
                  active
                    ? "text-primary bg-primary/5 border border-primary/10 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent"
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                {/* Active left bar */}
                {active && !isCollapsed && (
                  <motion.span
                    layoutId="activeSidebarItem"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-primary"
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout / Exit */}
      <div className="p-4 border-t border-border/40 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3.5 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent cursor-pointer"
        >
          <Home className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
          {!isCollapsed && <span className="whitespace-nowrap">Back to Site</span>}
        </Link>
        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center space-x-3.5 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 transition-colors border border-transparent cursor-pointer text-left"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  )
}
