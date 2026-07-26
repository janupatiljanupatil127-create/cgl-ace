"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FileText, Calendar, Plus, Trash2, CheckCircle2, AlertCircle, FilePlus, Sparkles, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { STUDY_MATERIALS, PYPS, StudyMaterial, PYP } from "@/data/mockData"

export default function AdminPortal() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"materials" | "papers">("materials")
  const [successMsg, setSuccessMsg] = React.useState("")
  const [errorMsg, setErrorMsg] = React.useState("")

  // Form States for Study Material
  const [matTitle, setMatTitle] = React.useState("")
  const [matSubject, setMatSubject] = React.useState("Quantitative Aptitude")
  const [matType, setMatType] = React.useState("PDF")
  const [matSize, setMatSize] = React.useState("")
  const [matNotes, setMatNotes] = React.useState("")

  // Form States for PYP
  const [pypTitle, setPypTitle] = React.useState("")
  const [pypYear, setPypYear] = React.useState(2026)
  const [pypSubject, setPypSubject] = React.useState("All Subjects (Full Paper)")
  const [pypTier, setPypTier] = React.useState<1 | 2>(1)
  const [pypShift, setPypShift] = React.useState("")
  const [pypQsCount, setPypQsCount] = React.useState(100)
  const [pypDuration, setPypDuration] = React.useState(60)

  // Lists from local storage
  const [materials, setMaterials] = React.useState<StudyMaterial[]>([])
  const [papers, setPapers] = React.useState<PYP[]>([])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMats = localStorage.getItem("cgl_study_materials")
      if (storedMats) {
        setMaterials(JSON.parse(storedMats))
      } else {
        localStorage.setItem("cgl_study_materials", JSON.stringify(STUDY_MATERIALS))
        setMaterials(STUDY_MATERIALS)
      }

      const storedPyps = localStorage.getItem("cgl_previous_papers")
      if (storedPyps) {
        setPapers(JSON.parse(storedPyps))
      } else {
        localStorage.setItem("cgl_previous_papers", JSON.stringify(PYPS))
        setPapers(PYPS)
      }
    }
  }, [])

  const triggerNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMsg(msg)
      setTimeout(() => setErrorMsg(""), 4000)
    } else {
      setSuccessMsg(msg)
      setTimeout(() => setSuccessMsg(""), 4000)
    }
  }

  // Handle adding new Study Material
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!matTitle.trim() || !matSize.trim() || !matNotes.trim()) {
      triggerNotification("Please fill in all required fields.", true)
      return
    }

    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      title: matTitle,
      subject: matSubject as StudyMaterial["subject"],
      type: matType as StudyMaterial["type"],
      size: matSize,
      downloadCount: 0,
      isBookmarked: false,
      publishDate: new Date().toISOString().split("T")[0]
    }

    const updated = [newMat, ...materials]
    setMaterials(updated)
    localStorage.setItem("cgl_study_materials", JSON.stringify(updated))

    // Store custom notes in localStorage for the PDF generator to read
    localStorage.setItem(`cgl_notes_${newMat.id}`, JSON.stringify(matNotes.split("\n")))

    triggerNotification("Study material added successfully!")
    // Reset Form
    setMatTitle("")
    setMatSize("")
    setMatNotes("")
  }

  // Handle adding new PYP
  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pypTitle.trim() || !pypShift.trim()) {
      triggerNotification("Please fill in all required fields.", true)
      return
    }

    const newPaper: PYP = {
      id: `pyp-${Date.now()}`,
      title: pypTitle,
      year: pypYear,
      subject: pypSubject,
      tier: pypTier,
      shift: pypShift,
      questionsCount: pypQsCount,
      durationMinutes: pypDuration,
      downloadCount: 0
    }

    const updated = [newPaper, ...papers]
    setPapers(updated)
    localStorage.setItem("cgl_previous_papers", JSON.stringify(updated))

    triggerNotification("Previous Year Paper added successfully!")
    // Reset Form
    setPypTitle("")
    setPypShift("")
  }

  // Handle deleting Study Material
  const handleDeleteMaterial = (id: string) => {
    const updated = materials.filter((m) => m.id !== id)
    setMaterials(updated)
    localStorage.setItem("cgl_study_materials", JSON.stringify(updated))
    localStorage.removeItem(`cgl_notes_${id}`)
    triggerNotification("Study material removed.")
  }

  // Handle deleting PYP
  const handleDeletePaper = (id: string) => {
    const updated = papers.filter((p) => p.id !== id)
    setPapers(updated)
    localStorage.setItem("cgl_previous_papers", JSON.stringify(updated))
    triggerNotification("Previous Year Paper removed.")
  }

  return (
    <div className="space-y-8">
      {/* Admin Hero Header */}
      <section className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none" />
        <div className="space-y-2 relative">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Content Management Portal</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Upload custom study notes, reference formulas, and previous year question papers directly into the active CGL Ace directory.
          </p>
        </div>
      </section>

      {/* Toast Notifications */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-emerald-500 text-white shadow-xl flex items-center space-x-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-xs font-bold">{successMsg}</span>
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-rose-500 text-white shadow-xl flex items-center space-x-2"
          >
            <AlertCircle className="h-5 w-5" />
            <span className="text-xs font-bold">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Row */}
      <div className="flex border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveTab("materials")}
          className={`px-6 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
            activeTab === "materials"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="h-4.5 w-4.5" />
          <span>Study Materials ({materials.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("papers")}
          className={`px-6 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
            activeTab === "papers"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="h-4.5 w-4.5" />
          <span>Previous Year Papers ({papers.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm">
            {activeTab === "materials" ? (
              <form onSubmit={handleAddMaterial} className="space-y-5">
                <h3 className="text-base font-bold text-foreground flex items-center space-x-2">
                  <FilePlus className="h-5 w-5 text-primary" />
                  <span>Create Study Material</span>
                </h3>
                <div className="h-px bg-border/40" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Material Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Geometry Advanced Tricks"
                      value={matTitle}
                      onChange={(e) => setMatTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">File Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 2.4 MB"
                      value={matSize}
                      onChange={(e) => setMatSize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject Area</label>
                    <select
                      value={matSubject}
                      onChange={(e) => setMatSubject(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    >
                      <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                      <option value="English Comprehension">English Comprehension</option>
                      <option value="General Intelligence & Reasoning">General Intelligence & Reasoning</option>
                      <option value="General Awareness">General Awareness</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Material Format</label>
                    <select
                      value={matType}
                      onChange={(e) => setMatType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Formula Sheet">Formula Sheet</option>
                      <option value="Handwritten Notes">Handwritten Notes</option>
                      <option value="E-Book">E-Book</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Syllabus Notes / Formulas (One item per line)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="1. Formula: a^2 + b^2 = c^2&#10;2. Centroid divides median in 2:1 ratio&#10;3. Sum of all interior angles of n-polygon is (n-2)*180"
                    value={matNotes}
                    onChange={(e) => setMatNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-mono"
                    required
                  />
                  <span className="text-[10px] text-muted-foreground">These lines will compose the dynamically generated PDF file contents when students download it.</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-95 shadow-sm transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish Study Notes</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddPaper} className="space-y-5">
                <h3 className="text-base font-bold text-foreground flex items-center space-x-2">
                  <FilePlus className="h-5 w-5 text-primary" />
                  <span>Create Previous Year Paper</span>
                </h3>
                <div className="h-px bg-border/40" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Paper Title</label>
                    <input
                      type="text"
                      placeholder="e.g. SSC CGL Tier-I Question Paper"
                      value={pypTitle}
                      onChange={(e) => setPypTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Exam Shift</label>
                    <input
                      type="text"
                      placeholder="e.g. Shift 1 (09:00 AM - 10:00 AM)"
                      value={pypShift}
                      onChange={(e) => setPypShift(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Exam Year</label>
                    <input
                      type="number"
                      value={pypYear}
                      onChange={(e) => setPypYear(parseInt(e.target.value) || 2026)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Exam Tier</label>
                    <select
                      value={pypTier}
                      onChange={(e) => setPypTier(parseInt(e.target.value) as 1 | 2)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    >
                      <option value={1}>Tier 1</option>
                      <option value={2}>Tier 2</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject Coverage</label>
                    <input
                      type="text"
                      placeholder="e.g. All Subjects (Full Paper)"
                      value={pypSubject}
                      onChange={(e) => setPypSubject(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Questions Count</label>
                    <input
                      type="number"
                      value={pypQsCount}
                      onChange={(e) => setPypQsCount(parseInt(e.target.value) || 100)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={pypDuration}
                      onChange={(e) => setPypDuration(parseInt(e.target.value) || 60)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-95 shadow-sm transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish Exam Paper</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Existing Content Panel (1/3 width) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-foreground">
              {activeTab === "materials" ? "Active Study Materials" : "Active PYP Papers"}
            </h3>
            <div className="h-px bg-border/40" />

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {activeTab === "materials" ? (
                materials.map((mat) => (
                  <div key={mat.id} className="p-4 rounded-xl bg-secondary/20 border border-border/30 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground leading-tight line-clamp-1">{mat.title}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold">
                        {mat.subject} &bull; {mat.type}
                      </p>
                      <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/10">
                        {mat.size}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteMaterial(mat.id)}
                      className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer flex-shrink-0"
                      title="Delete Study Notes"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                papers.map((paper) => (
                  <div key={paper.id} className="p-4 rounded-xl bg-secondary/20 border border-border/30 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground leading-tight line-clamp-1">{paper.title}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold">
                        Year: {paper.year} &bull; Tier {paper.tier} &bull; {paper.shift}
                      </p>
                      <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/10">
                        {paper.questionsCount} Qs &bull; {paper.durationMinutes} Mins
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeletePaper(paper.id)}
                      className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 cursor-pointer flex-shrink-0"
                      title="Delete Exam Paper"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
