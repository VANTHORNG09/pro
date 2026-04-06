"use client";

import { userRoles } from "@/lib/data/landing-page-data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function WhoItsForSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[12%] h-110 w-110 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-[5%] bottom-[8%] h-95 w-95 rounded-full bg-indigo-500/5 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/3 blur-[90px]" />
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
          variants={fadeUp}
          className="relative overflow-hidden rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-cyan-400/8 dark:bg-white/2.5 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.04)_inset,0_0_100px_rgba(34,211,238,0.05),0_32px_64px_rgba(0,0,0,0.4)] sm:px-10 lg:px-14 lg:py-16"
        >
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-[30%] right-[30%] h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/6 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-400/5 blur-[70px]" />
          <motion.div
            variants={containerVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>
              Who It&apos;s For
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[46px]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Built for every part of the{" "}
              <span className="bg-linear-to-br from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                academic workflow
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm leading-[1.8] text-slate-600 dark:text-white/60 sm:text-[15px]"
            >
              AssignBridge supports students and teachers with a shared system
              for managing assignments, deadlines, submissions, and classroom
              progress.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              {userRoles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.id}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm dark:border-white/8 dark:bg-white/4"
                  >
                    <Icon className="h-3 w-3 text-cyan-600 dark:text-cyan-400/70" />
                    <span className="text-[11.5px] text-slate-500 dark:text-white/50">
                      {role.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 h-px w-full max-w-xs bg-linear-to-r from-transparent via-slate-300 to-transparent dark:via-white/10"
          />
          <motion.div
            variants={containerVariants}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {userRoles.map((role, roleIndex) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  variants={cardVariants}
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(34,211,238,0.10),0_4px_12px_rgba(15,23,42,0.08)] dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-cyan-400/25 dark:hover:bg-white/6 dark:hover:shadow-[0_16px_40px_rgba(34,211,238,0.08),0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <div className="pointer-events-none absolute left-[12%] right-[12%] top-0 h-px bg-linear-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <motion.div
                    animate={{
                      opacity: [0.65, 0.9, 0.65],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: roleIndex * 0.2,
                    }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.07),transparent_55%)]"
                  />
                  <div
                    className="pointer-events-none absolute right-4 top-2 font-mono text-[80px] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-cyan-100 dark:text-white/3 dark:group-hover:text-cyan-400/6"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {role.id}
                  </div>
                  <div className="relative z-10">
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center justify-between"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-100 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400/18 dark:group-hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:border-white/[0.07] dark:bg-white/4 dark:text-white/30">
                        <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-400/50" />
                        Role {roleIndex + 1}
                      </div>
                    </motion.div>
                    <motion.h3
                      variants={itemVariants}
                      className="mt-5 text-[17px] font-semibold text-slate-900 transition-colors duration-300 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-200"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {role.title}
                    </motion.h3>
                    <div className="mt-2 h-px w-0 bg-linear-to-r from-cyan-400/50 to-transparent transition-all duration-500 group-hover:w-10" />
                    <motion.p
                      variants={itemVariants}
                      className="mt-3 text-sm leading-[1.75] text-slate-600 dark:text-white/55"
                    >
                      {role.description}
                    </motion.p>
                    <motion.div
                      variants={containerVariants}
                      className="mt-6 space-y-2.5"
                    >
                      {role.points.map((point) => (
                        <motion.div
                          key={point}
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 hover:border-cyan-300 hover:bg-cyan-50/60 dark:border-white/6 dark:bg-white/3 dark:hover:border-cyan-400/15 dark:hover:bg-cyan-400/4"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.25, 1],
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.35)] dark:bg-cyan-300 dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                          />
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-white/75">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "100%", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.2 + roleIndex * 0.1,
                      }}
                      className="mt-6 h-px bg-linear-to-r from-cyan-400/20 via-slate-200 to-transparent dark:via-white/5"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center"
          >
            <p className="text-sm text-slate-500 dark:text-white/40">
              One platform for students, teachers, and a more organized class
              experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-2 text-sm font-medium text-cyan-700 transition-colors duration-300 hover:bg-cyan-100 hover:text-cyan-800 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
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
        </motion.div>
      </div>
    </motion.section>
  );
}
