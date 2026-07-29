"use client"

import * as React from "react"
import { MockTest, MOCK_QUESTIONS, QUESTIONS_BY_TEST_OR_PAPER } from "@/data/mockData"
import { Clock, User, Check, AlertTriangle, BarChart2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExamSimulatorProps {
  test: MockTest
  onClose: () => void
}

export function ExamSimulator({ test, onClose }: ExamSimulatorProps) {
  // Simulator states
  const [questions, setQuestions] = React.useState(() => {
    const specificQs = QUESTIONS_BY_TEST_OR_PAPER[test.id];
    const sourceQuestions = (specificQs && specificQs.length > 0) ? specificQs : MOCK_QUESTIONS;
    return sourceQuestions.map((q) => ({
      ...q,
      selectedOptionIndex: null as number | null,
      markedForReview: false,
      visited: false
    }));
  });
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState(test.durationMinutes * 60)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  // Mark first question as visited
  React.useEffect(() => {
    setQuestions(prev => prev.map((q, idx) => idx === 0 ? { ...q, visited: true } : q))
  }, [])

  // Timer countdown
  React.useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[currentIdx]

  // Sections definition based on unique questions
  const sections = Array.from(new Set(questions.map((q) => q.section)))
  const currentSection = currentQuestion?.section

  const handleSelectOption = (optIdx: number) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIdx ? { ...q, selectedOptionIndex: optIdx } : q))
    )
  }

  const handleSaveNext = () => {
    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1
      setQuestions((prev) =>
        prev.map((q, idx) => (idx === nextIdx ? { ...q, visited: true } : q))
      )
      setCurrentIdx(nextIdx)
    }
  }

  const handleClear = () => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIdx ? { ...q, selectedOptionIndex: null } : q))
    )
  }

  const handleMarkReview = () => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIdx ? { ...q, markedForReview: !q.markedForReview } : q))
    )
    handleSaveNext()
  }

  const handleJumpQuestion = (idx: number) => {
    setQuestions((prev) =>
      prev.map((q, qIdx) => (qIdx === idx ? { ...q, visited: true } : q))
    )
    setCurrentIdx(idx)
  }

  // Summary counts
  const totalQuestions = questions.length
  const answeredCount = questions.filter((q) => q.selectedOptionIndex !== null).length
  const markedReviewCount = questions.filter((q) => q.markedForReview).length
  const visitedUnanswered = questions.filter((q) => q.visited && q.selectedOptionIndex === null && !q.markedForReview).length
  const unvisitedCount = questions.filter((q) => !q.visited).length

  // Score calculation mock
  const [scoreSummary, setScoreSummary] = React.useState({
    score: 0,
    correct: 0,
    incorrect: 0,
    unattempted: 0,
    accuracy: 0
  })

  const handleSubmit = () => {
    let correct = 0
    let incorrect = 0
    let unattempted = 0

    questions.forEach((q) => {
      if (q.selectedOptionIndex === null) {
        unattempted++
      } else if (q.selectedOptionIndex === q.correctOptionIndex) {
        correct++
      } else {
        incorrect++
      }
    })

    // SSC CGL Tier I grading: +2 for correct, -0.50 for incorrect
    const score = correct * 2 - incorrect * 0.5
    const totalAttempted = correct + incorrect
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0

    setScoreSummary({
      score: Math.max(score, 0),
      correct,
      incorrect,
      unattempted,
      accuracy
    })

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cgl_mock_tests")
      if (stored) {
        const parsed = JSON.parse(stored) as MockTest[]
        const updated = parsed.map((t) =>
          t.id === test.id
            ? {
                ...t,
                isAttempted: true,
                score: Math.max(score, 0),
                accuracy,
              }
            : t
        )
        localStorage.setItem("cgl_mock_tests", JSON.stringify(updated))
      }

      const storedLogs = localStorage.getItem("cgl_activities")
      const logs = storedLogs ? JSON.parse(storedLogs) : []
      const newLog = {
        id: `act-${Date.now()}`,
        type: "mock_test",
        title: `Completed ${test.title}`,
        timestamp: "Just now",
        detail: `Scored ${Math.max(score, 0)} points. Accuracy was ${accuracy}%.`
      }
      localStorage.setItem("cgl_activities", JSON.stringify([newLog, ...logs].slice(0, 10)))
    }

    setIsSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground h-screen w-screen overflow-hidden">
      {/* Top Banner Header */}
      <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CGL Ace CBT
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
            Mock Exam Room
          </span>
        </div>
        <h2 className="text-sm font-semibold truncate max-w-md hidden md:block">
          {test.title}
        </h2>
        {/* Timer */}
        <div className="flex items-center space-x-2 bg-slate-800 px-4 py-1.5 rounded-lg border border-slate-700">
          <Clock className="h-4 w-4 text-rose-400 animate-pulse" />
          <span className="text-sm font-mono font-bold text-rose-400">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
      </header>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Hand: Questions and Sections Panel */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto border-r border-border/40 p-4 md:p-6 bg-secondary/10">
          <div>
            {/* Section tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-border/40 pb-3">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    const idx = questions.findIndex((q) => q.section === sec)
                    if (idx !== -1) handleJumpQuestion(idx)
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentSection === sec
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Question Text */}
            {currentQuestion ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">
                    Question {currentIdx + 1} of {totalQuestions}
                  </span>
                  <div className="flex items-center space-x-2 text-[11px] text-muted-foreground">
                    <span className="text-emerald-500 font-semibold">+2.00</span>
                    <span>|</span>
                    <span className="text-rose-500 font-semibold">-0.50</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm min-h-[140px]">
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {currentQuestion.questionText}
                  </p>
                </div>

                {/* Multiple Choices Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt: string, optIdx: number) => {
                    const isSelected = currentQuestion.selectedOptionIndex === optIdx
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl text-left text-sm font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-primary/5 border-primary text-primary shadow-sm"
                            : "bg-card hover:bg-secondary/40 border-border/60 text-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`h-6 w-6 rounded-lg text-xs flex items-center justify-center font-bold border transition-colors ${
                            isSelected ? "bg-primary text-white border-primary" : "bg-secondary text-muted-foreground border-border"
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && (
                          <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="text-muted-foreground">No questions loaded for this test.</p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3 items-center justify-between pt-6 border-t border-border/40 mt-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleMarkReview}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-amber-500/30 text-amber-500 hover:bg-amber-500/5 cursor-pointer"
              >
                Mark for Review & Next
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-border text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear Response
              </button>
            </div>
            <button
              onClick={handleSaveNext}
              disabled={currentIdx === questions.length - 1}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Hand: Question Grid Sidebar */}
        <aside className="w-full md:w-80 border-t md:border-t-0 border-border/40 flex flex-col justify-between p-6 bg-card">
          <div className="space-y-6">
            {/* Candidate Details */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/40 border border-border/40">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Mock Student</h4>
                <p className="text-[10px] text-muted-foreground">Roll No: CGL-2026-9482</p>
              </div>
            </div>

            {/* Panel Legend */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-3">Status Legend</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                <div className="flex items-center space-x-2">
                  <span className="h-4 w-4 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-[8px]">0</span>
                  <span className="text-muted-foreground">Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-4 w-4 rounded bg-rose-500 text-white flex items-center justify-center font-bold text-[8px]">0</span>
                  <span className="text-muted-foreground">Not Answered ({visitedUnanswered})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-4 w-4 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-[8px]">0</span>
                  <span className="text-muted-foreground">For Review ({markedReviewCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-4 w-4 rounded bg-secondary text-muted-foreground flex items-center justify-center font-bold text-[8px]">0</span>
                  <span className="text-muted-foreground">Not Visited ({unvisitedCount})</span>
                </div>
              </div>
            </div>

            {/* Questions Grid Selector */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-3">Questions Palette</h4>
              <div className="grid grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const isSelected = currentIdx === idx
                  let statusBg = "bg-secondary text-muted-foreground border-border/80"

                  if (q.selectedOptionIndex !== null) {
                    statusBg = "bg-emerald-500 text-white border-emerald-500"
                  } else if (q.markedForReview) {
                    statusBg = "bg-amber-500 text-white border-amber-500"
                  } else if (q.visited) {
                    statusBg = "bg-rose-500 text-white border-rose-500"
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpQuestion(idx)}
                      className={`h-8 rounded-lg text-xs font-bold border flex items-center justify-center cursor-pointer transition-all ${statusBg} ${
                        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Submission and Close buttons */}
          <div className="pt-6 border-t border-border/40 space-y-2 mt-6">
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Submit Exam Paper
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-bold border border-border text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Exit Mock Test
            </button>
          </div>
        </aside>
      </div>

      {/* Submitted scorecard dashboard modal overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl border border-border hover:bg-secondary transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Mock Exam Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Your answers have been graded. Here is your mock CGL Scorecard.
                </p>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block font-medium">Final Score</span>
                  <span className="text-2xl font-extrabold text-primary tracking-tight mt-1 block">
                    {scoreSummary.score} / {questions.length * 2}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block font-medium">Accuracy</span>
                  <span className="text-2xl font-extrabold text-emerald-500 tracking-tight mt-1 block">
                    {scoreSummary.accuracy}%
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block font-medium">Correct Answers</span>
                  <span className="text-2xl font-extrabold text-teal-600 tracking-tight mt-1 block">
                    {scoreSummary.correct}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block font-medium">Wrong Answers</span>
                  <span className="text-2xl font-extrabold text-rose-500 tracking-tight mt-1 block">
                    {scoreSummary.incorrect}
                  </span>
                </div>
              </div>

              {/* Recommendation message */}
              <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start space-x-3 text-xs sm:text-sm">
                <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-left text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-semibold">CGL Ace Analysis:</strong>{" "}
                  {scoreSummary.accuracy >= 80
                    ? "Fantastic accuracy! Focus on cutting down solution time in Geometry and Syllogism. We recommend attempting Hard-tier full mocks to build stamina."
                    : "Good effort. Review incorrect General Awareness and English questions. Re-study basic concepts in Modern Indian History before your next test."}
                </div>
              </div>

              {/* Close CTAs */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Return to Mock Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
