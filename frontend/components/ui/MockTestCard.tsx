"use client"

import * as React from "react"
import { MockTest } from "@/data/mockData"
import { Clock, Award, HelpCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface MockTestCardProps {
  test: MockTest
  onStart: (testId: string) => void
}

export function MockTestCard({ test, onStart }: MockTestCardProps) {
  const getDifficultyColor = (diff: MockTest["difficulty"]) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "Moderate":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Hard":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group"
    >
      {/* Background Gradient Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Badges Bar */}
        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary/80 text-secondary-foreground border border-border/40">
            {test.category}
          </span>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              Tier {test.tier}
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(test.difficulty)}`}>
              {test.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 mb-4 line-clamp-2">
          {test.title}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3.5 px-4 rounded-xl bg-secondary/40 border border-border/40 text-xs text-muted-foreground mb-6">
          <div className="flex flex-col items-center justify-center text-center">
            <HelpCircle className="h-4 w-4 mb-1 text-blue-500" />
            <span className="font-semibold text-foreground">{test.questionsCount} Qs</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-x border-border/55">
            <Clock className="h-4 w-4 mb-1 text-purple-500" />
            <span className="font-semibold text-foreground">{test.durationMinutes} Mins</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Award className="h-4 w-4 mb-1 text-indigo-500" />
            <span className="font-semibold text-foreground">{test.totalMarks} Mks</span>
          </div>
        </div>
      </div>

      {/* Attempt Details & Action Button */}
      <div className="space-y-4">
        {test.isAttempted && test.score !== undefined && (
          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs">
            <span className="text-muted-foreground">Last Score: <strong className="text-emerald-500 font-semibold">{test.score}</strong></span>
            <span className="text-muted-foreground">Accuracy: <strong className="text-emerald-500 font-semibold">{test.accuracy}%</strong></span>
          </div>
        )}

        <button
          onClick={() => onStart(test.id)}
          className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            test.isAttempted
              ? "bg-secondary text-foreground hover:bg-secondary-foreground/10"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:opacity-95 active:scale-[0.98]"
          }`}
        >
          <span>{test.isAttempted ? "Retake Test" : "Start Test"}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  )
}
