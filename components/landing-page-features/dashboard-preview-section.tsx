"use client";

import {
  upcomingAssignments,
  classProgress,
  recentActivities,
  quickStats,
} from "@/lib/data/landing-page-data";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardHover = {
  y: -6,
  scale: 1.01,
  transition: { duration: 0.25, ease: "easeOut" as const },
};

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const numericMatch = value.match(/^(\d+)(.*)$/);
  useEffect(() => {
    if (!numericMatch) {
      setDisplay(value);
      return;
    }
    const target = parseInt(numericMatch[1], 10);
    const suffix = numericMatch[2] ?? "";
    // eslint-disable-next-line prefer-const
    let start = 0;
    const duration = 900;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display}</>;
}

function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.06);
    y.set((e.clientY - cy) * 0.06);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({
  cx,
  cy,
  size,
  color,
  delay,
}: {
  cx: string;
  cy: string;
  size: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        left: cx,
        top: cy,
        width: size,
        height: size,
        background: color,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GridMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.025] dark:opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(34,211,238,1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#diagGrad)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="diagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent dark:via-cyan-400/40"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function DashboardPreviewSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <FloatingOrb
        cx="10%"
        cy="20%"
        size={320}
        color="rgba(6,182,212,0.12)"
        delay={0}
      />
      <FloatingOrb
        cx="70%"
        cy="60%"
        size={400}
        color="rgba(16,185,129,0.08)"
        delay={2}
      />
      <FloatingOrb
        cx="85%"
        cy="10%"
        size={200}
        color="rgba(34,211,238,0.1)"
        delay={4}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.span>
              App Preview
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              A clearer academic workflow,
              <motion.span
                className="relative inline-block bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-200"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {" "}
                all in one dashboard
              </motion.span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/65 sm:text-base"
            >
              AssignBridge helps students and teachers manage assignments,
              submissions, deadlines, and classroom progress through one
              organized interface built for academic coordination.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {[
                {
                  icon: CalendarDays,
                  title: "Deadline Visibility",
                  desc: "Students can quickly see what is due next without switching between multiple tools.",
                },
                {
                  icon: BookOpen,
                  title: "Centralized Class Tracking",
                  desc: "Teachers can manage assignments, submissions, and class progress in one place.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <MagneticCard key={title}>
                  <motion.div
                    variants={fadeUp}
                    whileHover={cardHover}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-400/20 dark:hover:bg-white/6"
                  >
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)",
                      }}
                    />
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/60">
                      {desc}
                    </p>
                  </motion.div>
                </MagneticCard>
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp} className="relative">
            <motion.div
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 rounded-4xl bg-cyan-400/10 blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.02, 1, 1.02] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -inset-8 rounded-4xl bg-emerald-400/6 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-4xl border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-white/4 dark:shadow-[0_0_80px_rgba(0,255,255,0.06)]"
            >
              <GridMesh />
              <ScanLine />
              <div className="relative flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 dark:border-white/10">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-400/5 via-transparent to-transparent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300/80">
                    AssignBridge Dashboard
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    Class Overview
                  </h3>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100 focus:outline-none dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/15"
                >
                  <motion.span
                    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
                    animate={{ translateX: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  Open workspace
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </motion.button>
              </div>
              <motion.div className="relative p-5 sm:p-6">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 gap-4 xl:grid-cols-4"
                >
                  {quickStats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <MagneticCard key={item.label}>
                        <motion.div
                          variants={fadeUp}
                          whileHover={{
                            y: -6,
                            scale: 1.02,
                            borderColor: "rgba(34,211,238,0.25)",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-black/10"
                        >
                          <motion.div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                              background:
                                "radial-gradient(circle at 50% 100%, rgba(34,211,238,0.1) 0%, transparent 70%)",
                            }}
                          />
                          <div className="flex items-center justify-between">
                            <motion.div
                              whileHover={{ rotate: 6, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
                            >
                              <Icon className="h-5 w-5" />
                            </motion.div>
                            <motion.span
                              animate={{ opacity: [0.35, 1, 0.35] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                              className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/35"
                            >
                              Live
                            </motion.span>
                          </div>
                          <motion.p
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: 0.15 + index * 0.08,
                            }}
                            className="mt-4 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white"
                          >
                            <AnimatedNumber value={item.value} />
                          </motion.p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-white/55">
                            {item.label}
                          </p>
                        </motion.div>
                      </MagneticCard>
                    );
                  })}
                </motion.div>
                <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                  <motion.div
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-black/10"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Upcoming Assignments
                        </h4>
                        <p className="mt-1 text-xs text-slate-500 dark:text-white/45">
                          Tasks across active classes
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      {upcomingAssignments.map((item, index) => (
                        <motion.div
                          key={item.title}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:border-cyan-300 dark:border-white/10 dark:bg-white/3 dark:hover:border-cyan-400/20"
                          initial={{ opacity: 0, x: -18 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{ x: 4 }}
                        >
                          <motion.div className="absolute left-0 top-0 h-full w-0.5 rounded-l-2xl bg-linear-to-b from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-slate-900 dark:text-white">
                                {item.title}
                              </h5>
                              <p className="mt-1 text-xs text-slate-500 dark:text-white/45">
                                {item.course}
                              </p>
                            </div>
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="shrink-0 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:border-cyan-400/15 dark:bg-cyan-400/10 dark:text-cyan-300"
                            >
                              {item.status}
                            </motion.span>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
                            <Clock3 className="h-4 w-4 text-cyan-600/80 dark:text-cyan-300/80" />
                            {item.due}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <div className="space-y-5">
                    <motion.div
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                      className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-black/10"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Submission Progress
                          </h4>
                          <p className="mt-1 text-xs text-slate-500 dark:text-white/45">
                            Overall class performance
                          </p>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                        </motion.div>
                      </div>
                      <div className="space-y-4">
                        {classProgress.map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.1 }}
                          >
                            <div className="mb-2 flex items-center justify-between text-xs">
                              <span className="text-slate-600 dark:text-white/65">
                                {item.label}
                              </span>
                              <motion.span
                                className="font-medium text-slate-900 dark:text-white"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.12 }}
                              >
                                {item.value}
                              </motion.span>
                            </div>
                            <div className="relative h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                              <motion.div
                                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-cyan-400 to-emerald-300"
                                initial={{ width: 0 }}
                                whileInView={{ width: item.value }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.9,
                                  delay: 0.2 + index * 0.12,
                                  ease: "easeOut",
                                }}
                              />
                              <motion.div
                                className="absolute inset-y-0 w-12 rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent"
                                animate={{ left: ["-20%", "120%"] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1.5,
                                  delay: 0.6 + index * 0.3,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                      className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-black/10"
                    >
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Recent Activity
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-white/45">
                        Latest updates in the workspace
                      </p>
                      <div className="mt-4 space-y-3">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity}
                            className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-all duration-300 hover:border-cyan-300 dark:border-white/10 dark:bg-white/3 dark:hover:border-cyan-400/20"
                            initial={{ opacity: 0, x: 18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.45,
                              delay: index * 0.1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ x: 4 }}
                          >
                            <motion.div className="absolute right-0 top-0 h-full w-0.5 rounded-r-2xl bg-linear-to-b from-emerald-400 to-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative mt-1 shrink-0">
                              <motion.div
                                className="absolute -inset-1 rounded-full bg-cyan-300/20"
                                animate={{
                                  scale: [1, 1.8, 1],
                                  opacity: [0.4, 0, 0.4],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3,
                                }}
                              />
                              <motion.div
                                animate={{
                                  scale: [1, 1.25, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 1.8,
                                  repeat: Infinity,
                                  delay: index * 0.2,
                                }}
                                className="h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.45)] dark:bg-cyan-300 dark:shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                              />
                            </div>
                            <p className="text-sm leading-6 text-slate-600 dark:text-white/65">
                              {activity}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              animate={{ y: [0, -8, 0] }}
              className="absolute -bottom-6 -left-6 hidden w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/70 dark:shadow-[0_0_40px_rgba(0,255,255,0.08)] lg:block"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300/70">
                Quick Insight
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                92%
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-white/55">
                OOP class task completion this week
              </p>
              <div className="mt-3 flex items-end gap-1">
                {[40, 60, 45, 75, 55, 80, 92].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-linear-to-t from-cyan-400 to-emerald-300"
                    style={{ height: `${h * 0.3}px` }}
                    initial={{ scaleY: 0, originY: 1 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.6 + i * 0.06,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
