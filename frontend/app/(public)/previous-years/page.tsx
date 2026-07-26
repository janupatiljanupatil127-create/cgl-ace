"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PYPS } from "@/data/mockData"
import { Calendar, Download, CheckCircle, HelpCircle, ChevronRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { generatePDFBlob } from "@/utils/pdfGenerator"

export default function PreviousYearsPage() {
  const router = useRouter()

  // States
  const [selectedYear, setSelectedYear] = React.useState<number | "All">("All")
  const [selectedTier, setSelectedTier] = React.useState<string>("All")
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = React.useState(0)
  const [downloadedIds, setDownloadedIds] = React.useState<string[]>([])
  const [papers, setPapers] = React.useState<typeof PYPS>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgl_previous_papers")
      if (stored) {
        setPapers(JSON.parse(stored))
      } else {
        localStorage.setItem("cgl_previous_papers", JSON.stringify(PYPS))
        setPapers(PYPS)
      }
    }
  }, [])

  const years = ["All", 2026, 2025, 2024, 2023, 2022]
  const tiers = ["All", "1", "2"]

  const handleDownload = (id: string) => {
    if (downloadingId) return
    setDownloadingId(id)
    setDownloadProgress(0)

    const paper = papers.find((p) => p.id === id)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloadedIds((current) => [...current, id])
          setDownloadingId(null)

          // Trigger actual browser download of the generated PDF containing details
          const title = paper?.title || "Previous Year Paper"
          const subject = `${paper?.subject || "All Subjects"} (Tier ${paper?.tier || 1} - ${paper?.shift || "All"} Shift)`
          const type = "Previous Year Paper"
          const dateStr = paper?.year ? `${paper.year}` : "N/A"
          
          const blob = generatePDFBlob(title, subject, type, dateStr)
          const url = URL.createObjectURL(blob)

          const link = document.createElement("a")
          link.href = url
          link.download = `${title}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          return 100
        }
        return prev + 25
      })
    }, 120)
  }

  // Filter papers
  const filteredPapers = papers.filter((pyp) => {
    const matchesYear = selectedYear === "All" || pyp.year === selectedYear
    const matchesTier = selectedTier === "All" || pyp.tier.toString() === selectedTier

    return matchesYear && matchesTier
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <span className="hover:text-foreground transition-colors cursor-pointer" onClick={() => router.push("/")}>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">Previous Year Papers</span>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-8 sm:mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">SSC CGL Previous Year Question Papers</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Analyze exam trends and weightage by solving actual previous year papers. Download shift-wise PDF booklets with answers and detailed explanations.
        </p>
      </div>

      {/* Year Selector row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {years.map((year, idx) => {
          const isSelected = selectedYear === year
          return (
            <button
              key={idx}
              onClick={() => setSelectedYear(year as number | "All")}
              className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                isSelected
                  ? "bg-primary/5 border-primary shadow-md ring-2 ring-primary/20"
                  : "bg-card border-border/60 hover:border-primary/30 shadow-sm"
              }`}
            >
              <Calendar className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-sm font-bold text-foreground">
                {year === "All" ? "All Years" : `${year} Papers`}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter Chips panel */}
      <div className="space-y-6 mb-8 p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground min-w-[100px]">Filter by Tier:</span>
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
      </div>

      {/* PYP List Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => {
            const isDownloading = downloadingId === paper.id
            const isDownloaded = downloadedIds.includes(paper.id)

            return (
              <motion.div
                key={paper.id}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-secondary-foreground border border-border/40">
                      {paper.year} Paper
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                      Tier {paper.tier}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{paper.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Shift: <span className="font-semibold text-foreground">{paper.shift}</span> &bull; Subject: <span className="font-semibold text-foreground">{paper.subject}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {paper.questionsCount} Qs &bull; {paper.durationMinutes} Mins &bull; {paper.downloadCount.toLocaleString()} downloads
                  </p>
                </div>

                {/* Download State Handler */}
                <div className="w-full sm:w-auto flex-shrink-0">
                  {isDownloading ? (
                    <div className="w-32 space-y-2">
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${downloadProgress}%` }}
                          transition={{ duration: 0.12 }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground block text-center font-bold flex items-center justify-center">
                        <Loader2 className="h-3 w-3 animate-spin mr-1 text-primary" />
                        Saving {downloadProgress}%
                      </span>
                    </div>
                  ) : isDownloaded ? (
                    <button className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center space-x-1.5 cursor-default">
                      <CheckCircle className="h-4 w-4" />
                      <span>PDF Downloaded</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(paper.id)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-border hover:bg-secondary flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Paper</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-secondary/10 border border-border/40 max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-secondary border border-border/60 text-muted-foreground">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">No Papers Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldnt find any papers matching your queries. Try changing your filters.
          </p>
          <button
            onClick={() => {
              setSelectedYear("All")
              setSelectedTier("All")
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-sm cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
