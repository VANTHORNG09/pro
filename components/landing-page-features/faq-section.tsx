"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/data/landing-page-data";
import { motion, AnimatePresence } from "framer-motion";

function FloatingOrb({ className }: { className: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-20 ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function IndexBadge({ index, isOpen }: { index: number; isOpen: boolean }) {
  return (
    <motion.span
      animate={{
        backgroundColor: isOpen
          ? "rgba(34,211,238,0.12)"
          : "rgba(248,250,252,0.08)",
        color: isOpen ? "rgb(34,211,238)" : "rgba(148,163,184,0.9)",
        borderColor: isOpen ? "rgba(34,211,238,0.35)" : "rgba(100,116,139,0.3)",
      }}
      transition={{ duration: 0.3 }}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold tabular-nums"
    >
      {String(index + 1).padStart(2, "0")}
    </motion.span>
  );
}

function ShimmerBar() {
  return (
    <motion.div
      className="absolute left-0 right-0 top-0 h-px overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-full w-1/3 bg-linear-to-r from-transparent via-cyan-300/70 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "400%" }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.2,
        }}
      />
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <FloatingOrb className="left-[-10%] top-[10%] h-125 w-125 bg-cyan-400" />
      <FloatingOrb className="bottom-[5%] right-[-8%] h-100 w-100 bg-indigo-500" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-6xl"
      >
        <div className="relative rounded-[2rem] border border-cyan-200/70 bg-white/75 px-6 py-14 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-slate-900/60 dark:shadow-[0_0_100px_rgba(0,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-10 lg:px-16 lg:py-20">
          <span className="pointer-events-none absolute left-7 top-7 h-8 w-px bg-linear-to-b from-cyan-400/50 to-transparent" />
          <span className="pointer-events-none absolute left-7 top-7 h-px w-8 bg-linear-to-r from-cyan-400/50 to-transparent" />
          <span className="pointer-events-none absolute bottom-7 right-7 h-8 w-px bg-linear-to-t from-cyan-400/50 to-transparent" />
          <span className="pointer-events-none absolute bottom-7 right-7 h-px w-8 bg-linear-to-l from-cyan-400/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-1.5 dark:border-cyan-400/25 dark:bg-cyan-400/10"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
                FAQ
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.15]"
            >
              Frequently asked{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-cyan-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-200 dark:to-cyan-400">
                  questions
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/60 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base"
            >
              Clear answers for students, teachers, and classrooms exploring{" "}
              <span className="font-medium text-slate-800 dark:text-white">
                AssignBridge
              </span>
              .
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-12 h-px max-w-sm bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
          />
          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const isHovered = hoveredIndex === index;
              return (
                <motion.div
                  key={item.question}
                  className="group relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      background: isOpen
                        ? "var(--faq-open-bg)"
                        : "var(--faq-closed-bg)",
                      boxShadow: isOpen
                        ? "var(--faq-open-shadow)"
                        : "var(--faq-closed-shadow)",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={
                      {
                        "--faq-open-bg":
                          "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(99,102,241,0.04) 100%)",
                        "--faq-closed-bg": "rgba(255,255,255,0.96)",
                        "--faq-open-shadow":
                          "0 0 0 1px rgba(34,211,238,0.25), 0 8px 32px rgba(34,211,238,0.08)",
                        "--faq-closed-shadow": "0 0 0 1px rgba(226,232,240,1)",
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-400 ${
                      isOpen
                        ? "dark:bg-linear-to-br dark:from-cyan-500/10 dark:via-slate-800/80 dark:to-indigo-500/5 dark:[box-shadow:0_0_0_1px_rgba(34,211,238,0.2),0_8px_32px_rgba(0,0,0,0.4)]"
                        : "dark:bg-slate-800/70 dark:[box-shadow:0_0_0_1px_rgba(100,116,139,0.2)]"
                    }`}
                  />
                  <AnimatePresence>
                    {isHovered && !isOpen && (
                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-2xl dark:bg-linear-to-br dark:from-slate-700/40 dark:to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(248,250,252,0.8) 0%, transparent 60%)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>{isOpen && <ShimmerBar />}</AnimatePresence>
                  <motion.div
                    className="absolute bottom-0 left-0 top-0 w-0.5 rounded-l-2xl"
                    animate={{
                      background: isOpen
                        ? "linear-gradient(180deg, rgba(34,211,238,0.9) 0%, rgba(99,102,241,0.5) 100%)"
                        : "rgba(255,255,255,0)",
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="relative flex w-full cursor-pointer items-center gap-3.5 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <IndexBadge index={index} isOpen={isOpen} />
                    <span
                      className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-300 sm:text-base ${
                        isOpen
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {item.question}
                    </span>
                    <motion.div
                      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-600/50 dark:bg-slate-700/60"
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isOpen
                            ? "text-cyan-500 dark:text-cyan-400"
                            : "text-slate-400 dark:text-slate-400"
                        }`}
                      />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.28, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="relative px-5 pb-5 pl-15 sm:px-6 sm:pb-6 sm:pl-16"
                        >
                          <span className="absolute bottom-4 left-[2.35rem] top-0 w-px bg-linear-to-b from-cyan-400/30 to-transparent sm:left-[2.85rem]" />
                          <p className="text-sm leading-[1.85] text-slate-600 dark:text-slate-300 sm:text-[15px]">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Still have questions?{" "}
              <a
                href="#contact"
                className="font-medium text-cyan-600 underline underline-offset-2 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                Reach out to us
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
