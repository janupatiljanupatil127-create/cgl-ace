"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  MOCK_TESTS,
  STUDY_MATERIALS,
  TESTIMONIALS,
  FAQS
} from "@/data/mockData"
import { MockTestCard } from "@/components/ui/MockTestCard"
import { StudyMaterialCard } from "@/components/ui/StudyMaterialCard"
import {
  BookOpen,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  Star,
  Users
} from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [activeFaq, setActiveFaq] = React.useState<string | null>(null)

  // Get popular mock tests and study materials (e.g., first 3)
  const popularTests = MOCK_TESTS.slice(0, 3)
  const popularMaterials = STUDY_MATERIALS.slice(0, 3)

  const handleStartTest = (testId: string) => {
    router.push(`/mock-tests?start=${testId}`)
  }

  // Animation constants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  } as const

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  } as const

  const stats = [
    { value: "1,50,000+", label: "Aspirants Enrolled", icon: Users, color: "text-blue-500" },
    { value: "500+", label: "Full Length Mock Tests", icon: Layers, color: "text-purple-500" },
    { value: "98.7%", label: "Satisfaction Rate", icon: Star, color: "text-amber-500" },
    { value: "45,000+", label: "Selected Officers", icon: ShieldCheck, color: "text-emerald-500" }
  ]

  const features = [
    {
      title: "Real CBT Simulator",
      description: "Practice in an environment that replicates the actual SSC CGL server interface down to the font, section layouts, and marking colors.",
      icon: Layers,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "AI Performance Tracker",
      description: "Receive deep analytical insights showing your section-wise speed, accuracy percentages, and focus recommendations.",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Syllabus-Mapped Notes",
      description: "Handwritten notes, formulas, and mock questions crafted by top-ranked experts aligned to standard Tier-I and II modules.",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Daily Current Affairs Alerts",
      description: "Stay ahead with high-yield news updates, tables, and quick quizzes covering national and international milestones.",
      icon: Zap,
      color: "from-pink-500 to-rose-500"
    }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            {/* Announcement Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>SSC CGL 2026 Free Premium Mocks Live!</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Master the SSC CGL with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                CGL Ace
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              The most advanced, responsive prep platform simulating the actual computer-based test environment. Outperform standard prep tools with dynamic analysis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/mock-tests"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition-all hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Take Free Mock Test
              </Link>
              <Link
                href="/study-materials"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border border-border hover:bg-secondary/60 hover:border-foreground/20 backdrop-blur-sm transition-all cursor-pointer text-center"
              >
                Explore Study Notes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 border-y border-border/40 bg-secondary/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm"
                >
                  <div className={`p-3 rounded-xl bg-secondary mb-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Aspirants Prefer CGL Ace
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to move from aspirant to commissioned officer, packed into a single premium platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${feature.color} text-white w-fit mb-4 shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Popular Mock Tests */}
      <section className="py-20 md:py-24 border-t border-border/40 bg-secondary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Mock Tests</h2>
              <p className="text-muted-foreground mt-2">Recommended practice mock tests based on latest trends.</p>
            </div>
            <Link
              href="/mock-tests"
              className="text-sm font-bold text-primary hover:underline flex items-center space-x-1"
            >
              <span>View All Mock Tests</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTests.map((test) => (
              <MockTestCard key={test.id} test={test} onStart={handleStartTest} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Study Materials */}
      <section className="py-20 md:py-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Study Notes</h2>
              <p className="text-muted-foreground mt-2">Curated notes, booklets, and cheat sheets for revision.</p>
            </div>
            <Link
              href="/study-materials"
              className="text-sm font-bold text-primary hover:underline flex items-center space-x-1"
            >
              <span>View All Materials</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMaterials.map((mat) => (
              <StudyMaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 border-t border-border/40 bg-secondary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Words from Toppers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read how CGL Ace helped these candidates crack the exam and secure their dream inspector profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, idx) => (
              <motion.div
                key={testi.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                    &ldquo;{testi.review}&rdquo;
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-border/30">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.name}
                    className="h-10 w-10 rounded-full object-cover border border-primary/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{testi.name}</h4>
                    <p className="text-xs text-muted-foreground">{testi.rank}</p>
                    <p className="text-[10px] text-primary font-semibold">{testi.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-24 border-t border-border/40 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about CGL Ace mock plans.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id
            return (
              <div
                key={faq.id}
                className="border border-border/60 rounded-2xl bg-card overflow-hidden transition-colors hover:border-primary/20"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/20 pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
