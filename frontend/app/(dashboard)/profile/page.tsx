"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MOCK_TESTS, STUDY_MATERIALS, MockTest } from "@/data/mockData"
import {
  User,
  Award,
  Bookmark,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Loader2,
  Mail,
  Lock
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()

  const [name, setName] = React.useState("Anuj Sharma")
  const [email, setEmail] = React.useState("anuj.sharma@example.com")
  const [currentPassword, setCurrentPassword] = React.useState("••••••••")
  const [newPassword, setNewPassword] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)
  const [initials, setInitials] = React.useState("AS")
  const [tests, setTests] = React.useState<MockTest[]>(MOCK_TESTS)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("cgl_username")
      const storedEmail = localStorage.getItem("cgl_email")
      const storedMocks = localStorage.getItem("cgl_mock_tests")
      if (storedName) {
        setName(storedName)
        const parts = storedName.split(" ")
        const init = parts.map((p) => p.charAt(0)).join("").substring(0, 2).toUpperCase()
        setInitials(init || "US")
      }
      if (storedEmail) {
        setEmail(storedEmail)
      }
      if (storedMocks) {
        setTests(JSON.parse(storedMocks))
      }
    }
  }, [])

  // Filter completed mocks and bookmarks
  const completedMocks = tests.filter((t) => t.isAttempted)
  const bookmarkedMaterials = STUDY_MATERIALS.filter((m) => m.isBookmarked)

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)

    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("cgl_username", name)
        localStorage.setItem("cgl_email", email)
        const parts = name.split(" ")
        const init = parts.map((p) => p.charAt(0)).join("").substring(0, 2).toUpperCase()
        setInitials(init || "US")
        // Force header update
        window.dispatchEvent(new Event("storage"))
      }
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const achievements = [
    { title: "Quant Master", desc: "Achieved >90% accuracy in Algebra mock test.", icon: Award, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { title: "Streak Master", desc: "Maintained a continuous study streak of 12 days.", icon: ShieldCheck, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    { title: "Syllabus Explorer", desc: "Downloaded 10+ notes booklets for offline prep.", icon: FileCheck, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" }
  ]

  return (
    <div className="space-y-8">
      {/* User Header Profile Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-blue-500/20">
            {initials}
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{name}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Aspirant &bull; Target Rank: <strong className="text-primary font-bold">AIR &lt; 100</strong>
            </p>
            <p className="text-xs text-muted-foreground">Member since June 2026</p>
          </div>
        </div>

        <div className="flex space-x-6 bg-secondary/40 border border-border/40 p-4 rounded-2xl relative text-center">
          <div>
            <span className="text-2xl font-extrabold text-foreground block tracking-tight">4,850</span>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Practice Points</span>
          </div>
          <div className="border-l border-border/60 pl-6">
            <span className="text-2xl font-extrabold text-foreground block tracking-tight">Level 4</span>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Student Badge</span>
          </div>
        </div>
      </section>

      {/* Profile grid for settings vs history */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns (Settings and Achievements) - w:2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Settings Section */}
          <section className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-foreground">Account Profile Settings</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Modify your platform configuration parameters</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center space-x-2 text-xs font-semibold text-emerald-500">
                  <CheckCircle className="h-4 w-4" />
                  <span>Your changes have been saved successfully.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Current Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">New Password (optional)</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Checkboxes */}
              <div className="space-y-3 pt-3 border-t border-border/40">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Notifications</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2.5 text-xs text-muted-foreground cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border" />
                    <span>Receive notifications for weekly live mock tests.</span>
                  </label>
                  <label className="flex items-center space-x-2.5 text-xs text-muted-foreground cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border" />
                    <span>Send daily streaks reminder emails.</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-80"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving configurations...</span>
                  </>
                ) : (
                  <span>Save Settings Configurations</span>
                )}
              </button>
            </form>
          </section>

          {/* Completed Mocks Table/List */}
          <section className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Attempted Mock Papers</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your historic mock exam scoring card logs</p>
            </div>

            {completedMocks.length > 0 ? (
              <div className="border border-border/60 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/40 border-b border-border/50 text-muted-foreground font-bold">
                      <th className="p-3">Paper Title</th>
                      <th className="p-3">Grade Score</th>
                      <th className="p-3 text-center">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {completedMocks.map((mock) => (
                      <tr key={mock.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3 font-semibold text-foreground max-w-xs truncate">{mock.title}</td>
                        <td className="p-3 text-primary font-bold">{mock.score} / {mock.totalMarks}</td>
                        <td className="p-3 text-emerald-500 font-bold text-center">{mock.accuracy}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">You havent attempted any mocks yet.</p>
            )}
          </section>
        </div>

        {/* Right Columns (Bookmarks & Achievements) - w:1/3 */}
        <div className="space-y-8">
          {/* Achievements milestones */}
          <section className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-foreground">Earned Achievements</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Milestone badges earned during prep</p>
            </div>

            <div className="space-y-4">
              {achievements.map((ach, idx) => {
                const Icon = ach.icon
                return (
                  <div key={idx} className="flex items-start space-x-3 text-xs leading-relaxed p-3.5 rounded-2xl bg-secondary/20 border border-border/40">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${ach.color}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-foreground">{ach.title}</h4>
                      <p className="text-muted-foreground">{ach.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Bookmarks directory */}
          <section className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Bookmarked Notes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Quick access folder of bookmarked study booklets</p>
            </div>

            <div className="space-y-2.5">
              {bookmarkedMaterials.length > 0 ? (
                bookmarkedMaterials.map((bm) => (
                  <div
                    key={bm.id}
                    onClick={() => router.push("/study-materials")}
                    className="p-3 rounded-xl border border-border/60 bg-secondary/20 hover:border-primary/20 hover:bg-card transition-all cursor-pointer flex items-center justify-between text-xs font-semibold"
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                      <span className="text-foreground truncate leading-snug">{bm.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">No bookmarked booklets.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
