"use client";

import { features } from "@/lib/data/landing-page-data";
import { motion, cubicBezier } from "framer-motion";

const easing = cubicBezier(0.25, 0.46, 0.45, 0.94);

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
};

export default function FeaturesSection() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[20%] h-125 w-125 rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute right-[5%] bottom-[15%] h-100 w-100 rounded-full bg-indigo-500/5 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/3 blur-[90px]" />
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
        <div className="relative overflow-hidden rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-cyan-400/8 dark:bg-white/2.5 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.04)_inset,0_0_100px_rgba(34,211,238,0.05),0_32px_64px_rgba(0,0,0,0.4)] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-[30%] right-[30%] h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/6 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-400/5 blur-[70px]" />
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>
              Platform Features
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="mt-6 text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[46px]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Everything needed to manage{" "}
              <span className="bg-linear-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                academic work
              </span>{" "}
              in one place
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-5 max-w-2xl text-sm leading-[1.8] text-slate-600 dark:text-white/60 sm:text-[15px]"
            >
              AssignBridge helps students, teachers, and administrators manage
              assignments, deadlines, communication, and academic progress in a
              more structured and focused workflow.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                { value: features.length.toString(), label: "core features" },
                { value: "3", label: "user roles" },
                { value: "1", label: "unified platform" },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm dark:border-white/8 dark:bg-white/4"
                >
                  <span
                    className="text-sm font-bold text-cyan-600 dark:text-cyan-300"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {pill.value}
                  </span>
                  <span className="text-[11.5px] text-slate-500 dark:text-white/50">
                    {pill.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-12 h-px w-full max-w-xs bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-white/10"
          />
          <motion.div
            variants={sectionVariants}
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(34,211,238,0.10),0_4px_12px_rgba(15,23,42,0.08)] dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-cyan-400/25 dark:hover:bg-white/6 dark:hover:shadow-[0_16px_40px_rgba(34,211,238,0.08),0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <div className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-5 top-10 font-mono text-[11px] font-semibold text-slate-200 transition-colors duration-300 group-hover:text-cyan-300/40 dark:text-white/8 dark:group-hover:text-cyan-400/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.22 }}
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-100 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400/18 dark:group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3
                    className="relative z-10 mt-5 text-[17px] font-semibold text-slate-900 transition-colors duration-300 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <div className="relative z-10 mt-2 h-px w-0 bg-linear-to-r from-cyan-400/50 to-transparent transition-all duration-500 group-hover:w-10" />
                  <p className="relative z-10 mt-3 text-sm leading-[1.75] text-slate-600 dark:text-white/55">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center"
          >
            <span className="text-sm text-slate-500 dark:text-white/45">
              Ready to bring your classroom into one place?
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-2 text-sm font-medium text-cyan-700 transition-colors duration-300 hover:bg-cyan-100 hover:text-cyan-800 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20 dark:hover:text-cyan-200"
            >
              Get started free
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
        </div>
      </div>
    </motion.section>
  );
}
