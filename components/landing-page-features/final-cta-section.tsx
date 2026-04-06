"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCtaSection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-cyan-400/10 dark:bg-white/3 dark:shadow-[0_0_80px_rgba(0,255,255,0.05)] sm:px-8 lg:px-12 lg:py-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.div
              animate={{
                x: [0, 12, 0],
                y: [0, -10, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -10, 0],
                y: [0, 10, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              Get Started with AssignBridge
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Bring assignments, class progress, and communication into{" "}
              <span className="bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-300">
                one clear workflow
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base"
            >
              AssignBridge helps teachers and students stay aligned with a more
              structured way to manage deadlines, submissions, progress, and
              classroom updates in one platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/signup"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-600 sm:w-auto dark:border-cyan-300/30 dark:bg-cyan-400/15 dark:text-cyan-200 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-400/20 dark:hover:text-white"
                >
                  Get Started
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/demo"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <PlayCircle className="h-4 w-4" />
                  </motion.div>
                  View Demo
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-white/50 sm:text-sm"
            >
              {[
                "Deadline visibility",
                "Role-based workflow",
                "Built for classrooms",
              ].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.55 + index * 0.08 }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
