"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MOCK_TESTS, MockTest } from "@/data/mockData"
import { MockTestCard } from "@/components/ui/MockTestCard"
import { ExamSimulator } from "@/components/features/ExamSimulator"
import { Search, ChevronRight, Frown } from "lucide-react"

function MockTestsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [selectedTier, setSelectedTier] = React.useState<string>("All")
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("All")
  const [activeTest, setActiveTest] = React.useState<MockTest | null>(null)
  const [tests, setTests] = React.useState<MockTest[]>(MOCK_TESTS)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgl_mock_tests")
      if (stored) {
        setTests(JSON.parse(stored))
      }
    }
  }, [])

  // Listen to search param `start`
  React.useEffect(() => {
    const startTestId = searchParams.get("start")
    if (startTestId) {
      const test = tests.find((t) => t.id === startTestId)
      if (test) {
        setActiveTest(test)
      }
    }
  }, [searchParams, tests])

  const handleStartTest = (testId: string) => {
    const test = tests.find((t) => t.id === testId)
    if (test) {
      setActiveTest(test)
      // Update URL search query without reloading
      router.push(`/mock-tests?start=${testId}`)
    }
  }

  const handleCloseSimulator = () => {
    setActiveTest(null)
    router.push("/mock-tests") // clear param
    // Reload local tests from storage if any changes occurred
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgl_mock_tests")
      if (stored) {
        setTests(JSON.parse(stored))
      }
    }
  }

  // Filter logic
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory
    const matchesTier = selectedTier === "All" || test.tier.toString() === selectedTier
    const matchesDifficulty = selectedDifficulty === "All" || test.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesTier && matchesDifficulty
  })

  // Categories lists
  const categories = ["All", "Full Length", "Sectional", "Chapter Test"]
  const tiers = ["All", "1", "2"]
  const difficulties = ["All", "Easy", "Moderate", "Hard"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Immersive Exam Simulator Overlay */}
      {activeTest && (
        <ExamSimulator test={activeTest} onClose={handleCloseSimulator} />
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => router.push("/")}>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">Mock Tests</span>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-8 sm:mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">SSC CGL Mock Test Series</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Unlock high-yield practice papers mapped exactly to the latest staff selection commission guidelines. Filter by section, exam tier, or difficulty to get started.
        </p>
      </div>

      {/* Search and Filters panel */}
      <div className="space-y-6 mb-8 p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
        {/* Search */}
        <div className="relative flex items-center max-w-xl">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by mock test name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Filter Chips row */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          {/* Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Category:</span>
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
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Exam Tier:</span>
            <div className="flex flex-wrap gap-2">
              {tiers.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedTier === t
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary"
                  }`}
                >
                  {t === "All" ? "All Tiers" : `Tier ${t}`}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Difficulty:</span>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedDifficulty === diff
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary"
                  }`}
                >
                  {diff === "All" ? "All Difficulties" : diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mock Tests Cards Grid */}
      {filteredTests.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <MockTestCard key={test.id} test={test} onStart={handleStartTest} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40 mt-8">
            <span className="text-xs text-muted-foreground">
              Showing {filteredTests.length} of {filteredTests.length} mock tests
            </span>
            <div className="flex items-center space-x-2">
              <button disabled className="px-3.5 py-2 rounded-xl text-xs font-bold border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-sm">
                1
              </button>
              <button disabled className="px-3.5 py-2 rounded-xl text-xs font-bold border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-secondary/10 border border-border/40 max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-secondary border border-border/60 text-muted-foreground">
            <Frown className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">No Mock Tests Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldnt find any mocks matching your filters. Try clearing some filters or searching for another term.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setSelectedTier("All")
              setSelectedDifficulty("All")
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-sm cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default function MockTestsPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-xs text-muted-foreground animate-pulse">
        Loading mock tests room...
      </div>
    }>
      <MockTestsContent />
    </React.Suspense>
  )
}
