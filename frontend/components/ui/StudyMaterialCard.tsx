"use client"

import * as React from "react"
import { StudyMaterial } from "@/data/mockData"
import { Bookmark, Download, CheckCircle, FileText, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { generatePDFBlob } from "@/utils/pdfGenerator"

interface StudyMaterialCardProps {
  material: StudyMaterial
}

export function StudyMaterialCard({ material }: StudyMaterialCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(material.isBookmarked)
  const [downloadState, setDownloadState] = React.useState<"idle" | "downloading" | "completed">("idle")
  const [downloadProgress, setDownloadProgress] = React.useState(0)

  const handleDownload = () => {
    if (downloadState !== "idle") return
    setDownloadState("downloading")
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloadState("completed")
          
          // Trigger actual browser download of the generated PDF containing details
          let customNotes: string[] | undefined
          if (typeof window !== "undefined") {
            const stored = localStorage.getItem(`cgl_notes_${material.id}`)
            if (stored) {
              customNotes = JSON.parse(stored)
            }
          }

          const blob = generatePDFBlob(material.title, material.subject, material.type, material.publishDate, customNotes)
          const url = URL.createObjectURL(blob)

          const link = document.createElement("a")
          link.href = url
          link.download = `${material.title}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          setTimeout(() => setDownloadState("idle"), 3000)
          return 100
        }
        return prev + 20
      })
    }, 150)
  }

  const getSubjectColor = (subj: StudyMaterial["subject"]) => {
    switch (subj) {
      case "Quantitative Aptitude":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20"
      case "English Comprehension":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      case "General Intelligence & Reasoning":
        return "text-purple-500 bg-purple-500/10 border-purple-500/20"
      case "General Awareness":
        return "text-rose-500 bg-rose-500/10 border-rose-500/20"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative group flex flex-col justify-between"
    >
      <div>
        {/* Top Header Card */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getSubjectColor(material.subject)}`}>
            {material.subject}
          </span>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl border border-border/50 hover:bg-secondary transition-colors cursor-pointer ${
              isBookmarked ? "text-amber-500 bg-amber-500/5" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content Details */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-secondary/80 border border-border/40 text-primary mt-1">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {material.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Format: <span className="font-medium text-foreground">{material.type}</span> &bull; Size: <span className="font-medium text-foreground">{material.size}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-border/40 space-y-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Published: {material.publishDate}</span>
          <span>{material.downloadCount.toLocaleString()} downloads</span>
        </div>

        {/* Download State Handler */}
        {downloadState === "downloading" ? (
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p className="text-xs font-semibold text-center text-muted-foreground flex items-center justify-center">
              <Loader2 className="h-3 w-3 animate-spin mr-1 text-primary" />
              Downloading PDF... {downloadProgress}%
            </p>
          </div>
        ) : downloadState === "completed" ? (
          <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center space-x-1.5 cursor-default">
            <CheckCircle className="h-4 w-4" />
            <span>PDF Saved Offline</span>
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="w-full py-2.5 rounded-xl text-xs font-bold border border-border hover:bg-secondary hover:border-foreground/20 flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}
