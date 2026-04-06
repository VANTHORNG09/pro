"use client";

import { howItWorksSteps } from "@/lib/data/landing-page-data";
import { motion, easeOut } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: easeOut,
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[10%] h-105 w-105 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-[6%] bottom-[10%] h-90 w-90 rounded-full bg-indigo-500/5 blur-[110px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative overflow-hidden rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-cyan-400/8 dark:bg-white/2.5 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.04)_inset,0_0_100px_rgba(34,211,238,0.05),0_32px_64px_rgba(0,0,0,0.4)] sm:px-10 lg:px-14 lg:py-16"
        >
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-6 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-[30%] right-[30%] h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/6 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-400/5 blur-[70px]" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>
              How It Works
            </div>
            <h2
              className="mt-6 text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[46px]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              A simple workflow for{" "}
              <span className="bg-linear-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                managing assignments
              </span>
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-slate-600 dark:text-white/60 sm:text-[15px]">
              AssignBridge helps students and teachers stay aligned through one
              organized academic workflow — from class access to assignment
              progress.
            </p>
          </motion.div>
          <div className="pointer-events-none relative mx-auto mt-14 hidden w-full lg:block">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
              style={{ originX: 0 }}
              className="absolute left-1/6 right-1/6 top-6 h-px bg-linear-to-r from-cyan-400/40 via-indigo-400/30 to-cyan-400/40"
            />
            {[1 / 6, 1 / 2, 5 / 6].map((position, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.18 }}
                className="absolute top-4.5 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/20"
                style={{
                  left: `${position * 100}%`,
                }}
              />
            ))}
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-8 grid gap-5 lg:mt-6 lg:grid-cols-3"
          >
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -7, scale: 1.015 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(34,211,238,0.10),0_4px_12px_rgba(15,23,42,0.08)] dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-cyan-400/25 dark:hover:bg-white/6 dark:hover:shadow-[0_16px_40px_rgba(34,211,238,0.08),0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <div className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div
                  className="pointer-events-none absolute right-4 top-3 font-mono text-[72px] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-cyan-100 dark:text-white/3 dark:group-hover:text-cyan-400/6"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.number}
                </div>
                <motion.div
                  initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
                  whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: 0.1 + index * 0.1,
                  }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-sm font-bold text-cyan-600 shadow-[0_0_18px_rgba(34,211,238,0.10)] transition-all duration-300 group-hover:bg-cyan-100 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-[0_0_24px_rgba(34,211,238,0.12)] dark:group-hover:bg-cyan-400/18 dark:group-hover:shadow-[0_0_28px_rgba(34,211,238,0.2)]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.number}
                </motion.div>
                <div className="relative z-10 mt-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:border-white/[0.07] dark:bg-white/4 dark:text-white/35">
                  <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-400/50" />
                  Step {index + 1}
                </div>
                <h3
                  className="relative z-10 mt-3 text-[17px] font-semibold text-slate-900 transition-colors duration-300 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.title}
                </h3>
                <div className="relative z-10 mt-2 h-px w-0 bg-linear-to-r from-cyan-400/50 to-transparent transition-all duration-500 group-hover:w-10" />
                <p className="relative z-10 mt-3 text-sm leading-[1.75] text-slate-600 dark:text-white/55">
                  {step.description}
                </p>
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: easeOut,
                    delay: 0.25 + index * 0.1,
                  }}
                  className="relative z-10 mt-8 h-px bg-linear-to-r from-cyan-400/25 via-slate-200 to-transparent dark:via-white/6"
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center"
          >
            <span className="text-sm text-slate-500 dark:text-white/40">
              No training needed — get your class running in minutes.
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-2 text-sm font-medium text-cyan-700 transition-colors duration-300 hover:bg-cyan-100 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
            >
              See how it works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
