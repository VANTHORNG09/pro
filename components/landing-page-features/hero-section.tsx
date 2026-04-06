"use client";

import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";

export default function HeroSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    }),
  };

  const assignments = [
    {
      name: "Essay Draft — Chapter 5",
      subject: "English Literature",
      due: "Due today",
      dotColor: "#F87171",
      tagClass: "due-today",
    },
    {
      name: "Problem Set 3",
      subject: "Mathematics",
      due: "Due tomorrow",
      dotColor: "#FBBF24",
      tagClass: "due-soon",
    },
    {
      name: "Lab Report — Titration",
      subject: "Chemistry",
      due: "Due Apr 6",
      dotColor: "#34D399",
      tagClass: "due-ok",
    },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-110px)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="absolute inset-0 bg-transparent" />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm font-normal uppercase tracking-[0.2em]"
          >
            <span className="bg-linear-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-purple-200">
              Smart Assignment Management
            </span>
          </motion.p>
          <motion.h1
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white"
          >
            Track assignments. Support progress.
          </motion.h1>
          <motion.p
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-white/70"
          >
            AssignBridge helps students stay organized, teachers manage
            coursework efficiently, and schools streamline class communication
            in one modern platform.
          </motion.p>
          <motion.div
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex w-full items-center justify-center sm:w-auto"
            >
              <div className="absolute -inset-px rounded-full bg-linear-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/30" />
              <Link
                href="#"
                className="relative inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-base font-medium text-slate-900 shadow-sm backdrop-blur-md sm:w-auto dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex w-full items-center justify-center sm:w-auto"
            >
              <Link
                href="#"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white/80 px-8 py-3 text-base font-medium text-slate-800 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white sm:w-auto dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-8 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 14, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-20 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto overflow-hidden rounded-[28px] border border-[#A8B4C4] bg-[#C8D0DC] shadow-2xl shadow-slate-500/30 dark:border-white/8 dark:bg-[#0F1620] dark:shadow-black/60"
          >
            <div className="flex items-center justify-between border-b border-[#A0AEBF] bg-[#B8C4D2] px-4 py-3 sm:px-6 dark:border-white/6 dark:bg-[#0A1019]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FCA5A5] dark:bg-[#F87171]" />
                <span className="h-3 w-3 rounded-full bg-[#FCD34D] dark:bg-[#FBBF24]" />
                <span className="h-3 w-3 rounded-full bg-[#6EE7B7] dark:bg-[#34D399]" />
              </div>
              <div className="hidden rounded-full border border-[#B8C4D2] bg-[#D4DCE8] px-4 py-2 text-xs text-slate-500 sm:block dark:border-white/10 dark:bg-white/6 dark:text-white/40">
                assignbridge.app/dashboard
              </div>
              <div className="rounded-full border border-[#A7F3D0] bg-[#D1FAE5] px-3 py-1 text-xs font-medium text-teal-800 dark:border-cyan-500/30 dark:bg-cyan-500/12 dark:text-cyan-300">
                Student View
              </div>
            </div>
            <div className="grid min-h-125 grid-cols-1 lg:grid-cols-12">
              <aside className="border-b border-[#A8B4C4] bg-[#C4CEDC] p-4 lg:col-span-3 lg:border-b-0 lg:border-r dark:border-white/6 dark:bg-[#0D1521]">
                <div className="flex items-center gap-3 rounded-2xl border border-[#CBD5E1] bg-white p-3 dark:border-white/8 dark:bg-white/5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-purple-500 text-sm font-bold text-white">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      AssignBridge
                    </p>
                    <p className="text-xs text-slate-400 dark:text-white/40">
                      Student Workspace
                    </p>
                  </div>
                </div>
                <nav className="mt-4 space-y-1">
                  <div className="rounded-xl border border-[#BAE6FD] bg-linear-to-r from-[#E0F2FE] to-[#EDE9FE] px-4 py-2.5 text-center text-sm font-semibold text-sky-700 dark:border-cyan-500/25 dark:from-cyan-500/15 dark:to-purple-500/15 dark:text-cyan-300">
                    Dashboard
                  </div>
                  {[
                    "Assignments",
                    "Classes",
                    "Calendar",
                    "Messages",
                    "Progress",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[#B8C4D4] bg-[#D8E2EE] px-4 py-2.5 text-center text-sm text-slate-600 transition-colors hover:bg-[#C8D4E4] hover:text-slate-800 dark:border-white/6 dark:bg-white/3 dark:text-white/50 dark:hover:bg-white/[0.07] dark:hover:text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </nav>
                <div className="mt-5 rounded-2xl border border-[#BFDBFE] bg-linear-to-br from-[#DBEAFE] to-[#EDE9FE] p-4 text-center dark:border-cyan-500/20 dark:from-cyan-500/10 dark:to-purple-500/10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/40">
                    Weekly Summary
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                    86%
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-cyan-300/70">
                    Tasks completed this week
                  </p>
                </div>
              </aside>
              <div className="bg-[#EEF2F7] p-5 sm:p-6 lg:col-span-9 dark:bg-[#111927]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/30">
                      Welcome back
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Piseth Mao
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-4 py-1.5 text-xs font-medium text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300">
                      4 assignments due
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-500 dark:border-white/8 dark:bg-white/5 dark:text-white/50">
                      2 classes today
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      label: "Due Today",
                      value: "02",
                      accent: "from-[#F87171] to-[#FB923C]",
                    },
                    {
                      label: "In Progress",
                      value: "05",
                      accent: "from-[#60A5FA] to-[#818CF8]",
                    },
                    {
                      label: "Submitted",
                      value: "18",
                      accent: "from-[#34D399] to-[#22D3EE]",
                    },
                    {
                      label: "Classes",
                      value: "06",
                      accent: "from-[#A78BFA] to-[#F472B6]",
                    },
                  ].map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/5"
                    >
                      <div className={`h-1 bg-linear-to-r ${accent}`} />
                      <div className="p-4 text-center">
                        <p className="text-xs font-medium text-slate-400 dark:text-white/40">
                          {label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-white/30">
                    Upcoming Assignments
                  </p>
                  <div className="space-y-2">
                    {assignments.map((a) => (
                      <div
                        key={a.name}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-white/4"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: a.dotColor }}
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-white/90">
                              {a.name}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-white/35">
                              {a.subject}
                            </p>
                          </div>
                        </div>
                        <span
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium",
                            a.tagClass === "due-today"
                              ? "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B] dark:border-red-400/25 dark:bg-red-400/12 dark:text-red-300"
                              : a.tagClass === "due-soon"
                                ? "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E] dark:border-amber-400/25 dark:bg-amber-400/12 dark:text-amber-300"
                                : "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534] dark:border-emerald-400/25 dark:bg-emerald-400/12 dark:text-emerald-300",
                          ].join(" ")}
                        >
                          {a.due}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-slate-200/60 dark:ring-white/6" />
        </div>
      </div>
    </section>
  );
}
