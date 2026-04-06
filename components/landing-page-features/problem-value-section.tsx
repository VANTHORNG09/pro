"use client";

import { chips, painPoints, stats } from "@/lib/data/landing-page-data";
import { motion } from "framer-motion";

export default function ProblemValueSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[15%] h-105 w-105 rounded-full bg-cyan-500/6 blur-[120px]" />
        <div className="absolute right-[8%] bottom-[10%] h-85 w-85 rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,211,238,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="mx-auto w-full max-w-7xl"
        style={{ width: "min(88%, 1200px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-4xl border border-cyan-200/70 bg-white/75 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-white/3 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.05)_inset,0_0_80px_rgba(34,211,238,0.06),0_32px_64px_rgba(0,0,0,0.4)] sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute left-[20%] right-[20%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[80px]" />
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex justify-center lg:justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  </span>
                  Why AssignBridge
                </motion.div>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[46px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Academic work should feel{" "}
                <span className="bg-linear-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                  organized
                </span>
                , not overwhelming.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 max-w-lg text-sm leading-[1.8] text-slate-600 dark:text-white/60 sm:text-[15px]"
              >
                Many students manage deadlines, submissions, class updates, and
                progress tracking across disconnected tools. That creates missed
                tasks, delayed feedback, and unnecessary stress.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="mt-4 max-w-lg text-sm leading-[1.8] text-slate-600 dark:text-white/60 sm:text-[15px]"
              >
                <span className="font-semibold text-cyan-600 dark:text-cyan-300">
                  AssignBridge
                </span>{" "}
                brings assignments, communication, class management, and
                progress monitoring into one focused platform so students and
                teachers can work more clearly and efficiently.
              </motion.p>
              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.09, delayChildren: 0.42 },
                  },
                }}
              >
                {chips.map((chip) => (
                  <motion.span
                    key={chip}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11.5px] text-slate-700 dark:border-cyan-400/18 dark:bg-cyan-400/6 dark:text-white/60"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-400/70" />
                    {chip}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="mt-8 grid grid-cols-3 gap-3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
                  },
                }}
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm transition-colors duration-300 hover:border-cyan-300 dark:border-white/8 dark:bg-white/4 dark:hover:border-cyan-400/25"
                  >
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-cyan-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <p
                      className="text-2xl font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-slate-500 dark:text-white/50">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <div className="pointer-events-none absolute bottom-[8%] left-1/2 top-[8%] hidden w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-300/40 to-transparent dark:via-cyan-400/20 lg:block" />
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.25 },
                },
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {painPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 30, y: 20 },
                      show: { opacity: 1, x: 0, y: 0 },
                    }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_16px_40px_rgba(34,211,238,0.10)] dark:border-white/[0.07] dark:bg-white/4 dark:hover:border-cyan-400/25 dark:hover:bg-white/6.5 dark:hover:shadow-[0_16px_40px_rgba(34,211,238,0.07)]"
                  >
                    <div className="pointer-events-none absolute left-[15%] right-[15%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-cyan-400/9 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.22 }}
                      className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-100 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400/16"
                    >
                      <Icon size={22} />
                    </motion.div>
                    <h3
                      className="relative z-10 mt-4 text-[15px] font-semibold text-slate-900 dark:text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="relative z-10 mx-auto mt-2.5 max-w-50 text-[12.5px] leading-[1.65] text-slate-600 dark:text-white/55">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}