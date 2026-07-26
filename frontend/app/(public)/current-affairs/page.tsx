"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CURRENT_AFFAIRS, CurrentAffairsArticle } from "@/data/mockData"
import { Search, Bookmark, Calendar, Clock, BookOpen, ChevronRight, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CurrentAffairsPage() {
  const router = useRouter()

  // States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [bookmarkedIds, setBookmarkedIds] = React.useState<string[]>(
    CURRENT_AFFAIRS.filter((ca) => ca.isBookmarked).map((ca) => ca.id)
  )
  const [activeArticle, setActiveArticle] = React.useState<CurrentAffairsArticle | null>(null)

  const categories = ["All", "National", "International", "Economy", "Sports", "Science & Tech"]

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // prevent opening article
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Filter articles
  const filteredArticles = CURRENT_AFFAIRS.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => router.push("/")}>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">Current Affairs</span>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-8 sm:mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Daily News & Exam-Yield Bulletins</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Stay updated with daily digests specifically curated for General Awareness modules. Read comprehensive breakdowns of economic budgets, space science launches, and sports tallies.
        </p>
      </div>

      {/* Search and Filters panel */}
      <div className="space-y-6 mb-8 p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
        {/* Search */}
        <div className="relative flex items-center max-w-xl">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search news by title or content keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Categories:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary"
                }`}
              >
                {cat === "All" ? "All Bulletins" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of news articles */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => {
            const isBookmarked = bookmarkedIds.includes(art.id)
            return (
              <motion.div
                key={art.id}
                whileHover={{ y: -4 }}
                onClick={() => setActiveArticle(art)}
                className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Accent Hover highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Meta tag and Bookmark */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      {art.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(art.id, e)}
                      className={`p-2 rounded-xl border border-border/50 hover:bg-secondary transition-colors cursor-pointer ${
                        isBookmarked ? "text-amber-500 bg-amber-500/5" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-3">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1 text-blue-500" /> {art.date}</span>
                    <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1 text-purple-500" /> {art.readTime}</span>
                  </div>
                  <span className="font-bold text-primary group-hover:underline flex items-center">
                    Read Article <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-secondary/10 border border-border/40 max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-secondary border border-border/60 text-muted-foreground">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">No Articles Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldnt find any news bulletins matching your search. Try resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-sm cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Article Detail dialog overlay */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // stop close bubble
              className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-xl border border-border hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                    {activeArticle.category}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {activeArticle.date}</span>
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {activeArticle.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
                  {activeArticle.title}
                </h3>

                <div className="h-px bg-border/40 my-4" />

                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground bg-secondary/50 p-4 rounded-xl border border-border/40">
                    {activeArticle.summary}
                  </p>
                  <p className="whitespace-pre-line pt-2">
                    {activeArticle.content}
                  </p>
                </div>

                {/* Exam Focus indicator */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 border border-blue-500/10 flex items-start space-x-3 text-xs sm:text-sm mt-6">
                  <Sparkles className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-muted-foreground">
                    <strong className="text-foreground font-bold">Exam Yield Note:</strong> Expect questions around core details mentioned above (allocations, dates, awards, launches, figures). Revise monthly digests under the study materials section.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
