"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { STUDY_MATERIALS } from "@/data/mockData"
import { StudyMaterialCard } from "@/components/ui/StudyMaterialCard"
import { Search, ChevronRight, Calculator, FileText, Brain, Globe, HelpCircle } from "lucide-react"

export default function StudyMaterialsPage() {
  const router = useRouter()

  // States
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSubject, setSelectedSubject] = React.useState<string>("All")
  const [selectedType, setSelectedType] = React.useState<string>("All")
  const [materials, setMaterials] = React.useState<typeof STUDY_MATERIALS>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgl_study_materials")
      if (stored) {
        setMaterials(JSON.parse(stored))
      } else {
        localStorage.setItem("cgl_study_materials", JSON.stringify(STUDY_MATERIALS))
        setMaterials(STUDY_MATERIALS)
      }
    }
  }, [])

  // Subjects lists
  const subjects = [
    { name: "Quantitative Aptitude", icon: Calculator, count: "12 PDFs", color: "text-amber-500 bg-amber-500/10" },
    { name: "English Comprehension", icon: FileText, count: "18 PDFs", color: "text-blue-500 bg-blue-500/10" },
    { name: "General Intelligence & Reasoning", icon: Brain, count: "10 PDFs", color: "text-purple-500 bg-purple-500/10" },
    { name: "General Awareness", icon: Globe, count: "25 PDFs", color: "text-rose-500 bg-rose-500/10" }
  ]

  const types = ["All", "PDF", "Formula Sheet", "Handwritten Notes", "E-Book"]

  // Filter materials
  const filteredMaterials = materials.filter((mat) => {
    const matchesSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "All" || mat.subject === selectedSubject
    const matchesType = selectedType === "All" || mat.type === selectedType

    return matchesSearch && matchesSubject && matchesType
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => router.push("/")}>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">Study Materials</span>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-8 sm:mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Expert Study Notes & E-Books</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Download syllabus-aligned textbooks, quick reference formulas, and handwritten booklets prepared by top scorers. Practice chapter-wise concepts offline.
        </p>
      </div>

      {/* Subject Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-12">
        {subjects.map((sub, idx) => {
          const Icon = sub.icon
          const isSelected = selectedSubject === sub.name
          return (
            <button
              key={idx}
              onClick={() => setSelectedSubject(isSelected ? "All" : sub.name)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between h-36 ${
                isSelected
                  ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary/20"
                  : "bg-card border-border/60 hover:border-primary/30 shadow-sm"
              }`}
            >
              <div className={`p-2.5 rounded-xl ${sub.color} w-fit`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {sub.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{sub.count}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Search and Filters panel */}
      <div className="space-y-6 mb-8 p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
        {/* Search */}
        <div className="relative flex items-center max-w-xl">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by topic or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Filter Chips row */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          {/* Material Type Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Material Type:</span>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary"
                  }`}
                >
                  {type === "All" ? "All Formats" : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid list of PDF Cards */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => (
            <StudyMaterialCard key={mat.id} material={mat} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-secondary/10 border border-border/40 max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-secondary border border-border/60 text-muted-foreground">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">No Study Materials Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldnt find any study sheets or notes matching your query. Try resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedSubject("All")
              setSelectedType("All")
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
