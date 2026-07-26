"use client"

import * as React from "react"
import {
  MOCK_TESTS,
  ACTIVITY_LOGS,
  GOALS,
  USER_STREAK,
  Goal,
  MockTest,
  ActivityLog
} from "@/data/mockData"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts"
import {
  Flame,
  Award,
  Sparkles,
  Plus,
  Compass,
  FileCheck
} from "lucide-react"

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false)
  const [goals, setGoals] = React.useState<Goal[]>(GOALS)
  const [newGoalText, setNewGoalText] = React.useState("")
  const [username, setUsername] = React.useState("Anuj")
  const [activities, setActivities] = React.useState<ActivityLog[]>(ACTIVITY_LOGS)
  const [streakCount, setStreakCount] = React.useState(USER_STREAK.currentStreak)
  const [streakDays, setStreakDays] = React.useState<string[]>(USER_STREAK.dailyCompletedDays)

  // Progress metrics state
  const [completedCount, setCompletedCount] = React.useState(12)
  const [avgScore, setAvgScore] = React.useState("142.5")
  const [avgAccuracy, setAvgAccuracy] = React.useState(84)

  React.useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("cgl_username")
      if (storedName) {
        setUsername(storedName.split(" ")[0])
      }

      const storedGoals = localStorage.getItem("cgl_goals")
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals))
      } else {
        localStorage.setItem("cgl_goals", JSON.stringify(GOALS))
      }

      const storedMocks = localStorage.getItem("cgl_mock_tests")
      if (storedMocks) {
        const parsed = JSON.parse(storedMocks) as MockTest[]
        const completed = parsed.filter((t) => t.isAttempted)
        setCompletedCount(completed.length)

        if (completed.length > 0) {
          const sumScore = completed.reduce((sum: number, t) => sum + (t.score || 0), 0)
          const avgSc = (sumScore / completed.length).toFixed(1)
          const sumAcc = completed.reduce((sum: number, t) => sum + (t.accuracy || 0), 0)
          const avgAc = Math.round(sumAcc / completed.length)
          setAvgScore(avgSc)
          setAvgAccuracy(avgAc)
        } else {
          setAvgScore("0.0")
          setAvgAccuracy(0)
        }
      } else {
        const completed = MOCK_TESTS.filter((t) => t.isAttempted)
        setCompletedCount(completed.length)
        const sumScore = completed.reduce((sum, t) => sum + (t.score || 0), 0)
        setAvgScore((sumScore / completed.length).toFixed(1))
        const sumAcc = completed.reduce((sum, t) => sum + (t.accuracy || 0), 0)
        setAvgAccuracy(Math.round(sumAcc / completed.length))
      }

      const storedActivities = localStorage.getItem("cgl_activities")
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities))
      } else {
        setActivities(ACTIVITY_LOGS)
      }

      const storedStreakCount = localStorage.getItem("cgl_streak_count")
      if (storedStreakCount) {
        setStreakCount(parseInt(storedStreakCount))
      } else {
        setStreakCount(USER_STREAK.currentStreak)
      }

      const storedStreakDays = localStorage.getItem("cgl_streak_days")
      if (storedStreakDays) {
        setStreakDays(JSON.parse(storedStreakDays))
      } else {
        setStreakDays(USER_STREAK.dailyCompletedDays)
      }
    }
  }, [])

  // Streak handler
  const isDayCompleted = (dateStr: string) => streakDays.includes(dateStr)

  // Generate July 2026 calendar days (days 1 to 31)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1
    const dateStr = `2026-07-${dayNum.toString().padStart(2, "0")}`
    return {
      dayNum,
      dateStr,
      completed: isDayCompleted(dateStr)
    }
  })

  // Toggle goal complete state
  const handleToggleGoal = (goalId: string) => {
    setGoals((prev) => {
      const updated = prev.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
      if (typeof window !== "undefined") {
        localStorage.setItem("cgl_goals", JSON.stringify(updated))
      }
      return updated
    })
  }

  // Add goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGoalText.trim()) return

    const newGoal: Goal = {
      id: `g-${Date.now()}`,
      title: newGoalText,
      completed: false,
      dueDate: new Date().toISOString().split("T")[0]
    }
    setGoals((prev) => {
      const updated = [...prev, newGoal]
      if (typeof window !== "undefined") {
        localStorage.setItem("cgl_goals", JSON.stringify(updated))
      }
      return updated
    })
    setNewGoalText("")
  }

  // Chart Data: score logs
  const scoreData = [
    { name: "Mock 1", score: 110, avgScore: 120 },
    { name: "Mock 2", score: 135, avgScore: 124 },
    { name: "Mock 3", score: 120, avgScore: 126 },
    { name: "Mock 4", score: 148, avgScore: 128 },
    { name: "Mock 5", score: 155, avgScore: 130 },
  ]

  // Chart Data: subject analysis
  const subjectData = [
    { subject: "Quant", accuracy: 82, color: "oklch(0.6 0.22 268)" },
    { subject: "English", accuracy: 92, color: "oklch(0.58 0.18 200)" },
    { subject: "Reasoning", accuracy: 88, color: "oklch(0.7 0.15 320)" },
    { subject: "GK", accuracy: 64, color: "oklch(0.55 0.22 40)" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Hero Card */}
      <section className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none" />
        <div className="space-y-3 relative">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Preparation Level: Advanced</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, {username}!</h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            You are in the top 2% of candidates this week. Keep up the consistency to secure your Assistant Section Officer (ASO) seat!
          </p>
        </div>

        {/* Quick stats streak display */}
        <div className="flex items-center space-x-4 bg-secondary/50 border border-border/40 p-4 rounded-2xl relative">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-foreground block tracking-tight">
              {streakCount} Days
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Active Study Streak</span>
          </div>
        </div>
      </section>

      {/* Progress Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block font-semibold uppercase tracking-wider">Avg Mock Score</span>
            <span className="text-xl font-bold tracking-tight text-foreground mt-0.5 block">{avgScore} / 200</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <FileCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block font-semibold uppercase tracking-wider">Mocks Attempted</span>
            <span className="text-xl font-bold tracking-tight text-foreground mt-0.5 block">{completedCount} {completedCount === 1 ? "Test" : "Tests"}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center space-x-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block font-semibold uppercase tracking-wider">General Accuracy</span>
            <span className="text-xl font-bold tracking-tight text-foreground mt-0.5 block">{avgAccuracy}%</span>
          </div>
        </div>
      </section>

      {/* Analytics Charts Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Performance Over Time (2/3 width) */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2">
            <div>
              <h3 className="text-base font-bold text-foreground">Score Progress Analysis</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your mocks scoring graph vs state toppers average</p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
              Tier I Mocks
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="currentColor" className="text-muted-foreground/60 text-[10px]" tickLine={false} />
                  <YAxis stroke="currentColor" className="text-muted-foreground/60 text-[10px]" tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" name="Your Score" />
                  <Area type="monotone" dataKey="avgScore" stroke="oklch(0.556 0 0)" strokeDasharray="4 4" strokeWidth={1.5} fill="none" name="Topper Avg" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-secondary/20 rounded-2xl animate-pulse" />
            )}
          </div>
        </div>

        {/* Subject Strengths Accuracy (1/3 width) */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Subject Wise Accuracy</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Focus priority based on correct response percentages</p>
          </div>

          <div className="h-72 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="subject" type="category" stroke="currentColor" className="text-muted-foreground/60 text-[10px] font-bold" tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                  />
                  <Bar dataKey="accuracy" radius={[0, 8, 8, 0]} barSize={16}>
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-secondary/20 rounded-2xl animate-pulse" />
            )}
          </div>
        </div>
      </section>

      {/* Grid of Calendar, Activities, and Goals */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Streak Calendar Widget */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Study Consistency Tracker</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Daily attendance logging for July 2026</p>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2 text-center pt-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-[10px] font-bold text-muted-foreground">{d}</span>
            ))}
            
            {/* Blank offset for starting day in July 2026 (Wednesday start: 2 offsets) */}
            <span />
            <span />

            {calendarDays.map((day) => (
              <div
                key={day.dayNum}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors ${
                  day.completed
                    ? "bg-gradient-to-tr from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm"
                    : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/20"
                }`}
                title={day.dateStr}
              >
                {day.dayNum}
              </div>
            ))}
          </div>

          <div className="pt-2 text-center flex items-center justify-center space-x-1.5 text-xs font-semibold text-muted-foreground border-t border-border/40">
            <span className="inline-block h-2 w-2 rounded bg-gradient-to-tr from-orange-500 to-amber-500" />
            <span>Streak Complete Day Log</span>
          </div>
        </div>

        {/* Goal Tracker Checklist */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Goal Tracker Checklist</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Manage and track your active preparation targets</p>
          </div>

          {/* New Goal Input */}
          <form onSubmit={handleAddGoal} className="relative flex items-center">
            <input
              type="text"
              required
              placeholder="Add new target..."
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              className="w-full pl-3 pr-10 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute right-1 p-1 rounded-lg bg-primary text-primary-foreground hover:opacity-90 cursor-pointer transition-opacity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Goal List */}
          <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
            {goals.map((g) => (
              <div
                key={g.id}
                onClick={() => handleToggleGoal(g.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  g.completed
                    ? "bg-emerald-500/5 border-emerald-500/10 text-muted-foreground line-through"
                    : "bg-secondary/40 border-border/60 hover:border-primary/20 text-foreground"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                    g.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-border bg-background"
                  }`}>
                    {g.completed && <FileCheck className="h-3 w-3" />}
                  </div>
                  <span className="text-xs font-bold leading-snug">{g.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Recent Activity Log</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Your recently triggered study log events</p>
          </div>

          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
            {activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 text-xs leading-relaxed">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-foreground">{act.title}</h4>
                    <p className="text-muted-foreground">{act.detail}</p>
                    <span className="text-[10px] text-muted-foreground block pt-0.5">{act.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                Your recent activity will appear here once you start taking mocks or downloading notes.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
