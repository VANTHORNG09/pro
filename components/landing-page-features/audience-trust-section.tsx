"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { audienceGroups, trustStatements } from "@/lib/data/landing-page-data";
import { Sparkles } from "lucide-react";
import { useRef } from "react";

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
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.05);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.05);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GridMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.025] dark:opacity-[0.032]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="at-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(34,211,238,1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#at-grid)" />
      </svg>
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/20 to-transparent dark:via-cyan-400/25"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
    />
  );
}

function FloatingOrb({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={style}
      animate={{ y: [0, -20, 0], opacity: [0.1, 0.22, 0.1] }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function AudienceTrustSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <FloatingOrb
        style={{
          left: "2%",
          top: "10%",
          width: 300,
          height: 300,
          background: "rgba(6,182,212,0.1)",
        }}
        delay={0}
      />
      <FloatingOrb
        style={{
          right: "5%",
          bottom: "15%",
          width: 380,
          height: 380,
          background: "rgba(16,185,129,0.07)",
        }}
        delay={3}
      />
      <FloatingOrb
        style={{
          left: "45%",
          top: "40%",
          width: 220,
          height: 220,
          background: "rgba(34,211,238,0.06)",
        }}
        delay={1.5}
      />
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-cyan-400/10 dark:bg-white/3 dark:shadow-[0_0_100px_rgba(0,255,255,0.05)] sm:px-8 lg:px-12 lg:py-16">
          <GridMesh />
          <ScanLine />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <motion.span
                animate={{ rotate: [0, 18, -18, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.span>
              Who AssignBridge Supports
            </motion.div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Built for teachers, students,{" "}
              <motion.span
                className="relative inline-block bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-200"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                and classrooms together
              </motion.span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              AssignBridge is designed to reduce academic friction by giving
              each role a clearer, more connected way to manage assignments,
              updates, and progress.
            </p>
          </motion.div>
          <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {audienceGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <MagneticCard key={group.title} className="flex h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_24px_60px_rgba(34,211,238,0.10)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.9))] dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)] dark:hover:border-cyan-400/20 dark:hover:shadow-[0_24px_80px_rgba(0,255,255,0.1)]"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_55%)] opacity-60 dark:opacity-70" />
                    <motion.div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-[1.75rem] bg-linear-to-b from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-slate-100/70 to-transparent dark:via-white/5"
                      animate={{ translateX: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        repeatDelay: 2 + index * 0.5,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-[1.75rem] bg-linear-to-r from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-1 flex-col">
                      <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-cyan-600 shadow-[0_0_20px_rgba(34,211,238,0.10)] dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.12 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <motion.div
                          className="pointer-events-none absolute -inset-1 rounded-2xl border border-cyan-300/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:border-cyan-400/20"
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                        {group.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {group.description}
                      </p>
                      <div className="mt-6 flex-1 space-y-3">
                        {group.points.map((point, pIndex) => {
                          const PointIcon = point.icon;
                          return (
                            <motion.div
                              key={point.text}
                              initial={{ opacity: 0, x: -14 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1 + pIndex * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              whileHover={{ x: 4 }}
                              className="group/point relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition-colors duration-300 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-white/8 dark:bg-white/3 dark:hover:border-cyan-400/15"
                            >
                              <motion.div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-2xl bg-linear-to-b from-cyan-400/60 to-emerald-300/60 opacity-0 transition-opacity duration-200 group-hover/point:opacity-100" />
                              <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-400/15 dark:bg-cyan-400/10 dark:text-cyan-300">
                                <motion.div
                                  whileHover={{ rotate: 8, scale: 1.1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <PointIcon className="h-4 w-4" />
                                </motion.div>
                              </div>
                              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                                {point.text}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                      <motion.div className="mt-5 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <motion.div
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.35)] dark:bg-cyan-400 dark:shadow-[0_0_6px_rgba(34,211,238,0.9)]"
                        />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-300/60">
                          Active role
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </MagneticCard>
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-cyan-200/70 bg-white/70 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8 dark:border-cyan-400/10 dark:bg-white/2.5 dark:shadow-none"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.16) 60deg, transparent 120deg)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-px rounded-[1.75rem] bg-transparent" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/20 to-transparent"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
                Trust & Product Direction
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                A platform shaped by{" "}
                <span className="bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:to-emerald-200">
                  real classroom needs
                </span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Instead of relying on scattered tools, AssignBridge aims to give
                academic users a more unified, visible, and scalable workflow.
              </p>
            </div>
            <div className="relative mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {trustStatements.map((item, index) => (
                <MagneticCard key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative h-full overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_16px_32px_rgba(34,211,238,0.10)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(8,15,30,0.78),rgba(2,6,23,0.92))] dark:hover:border-cyan-400/20 dark:hover:shadow-[0_0_35px_rgba(0,255,255,0.08)]"
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-[1.4rem] bg-linear-to-bl from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-b-[1.4rem] bg-linear-to-r from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-slate-100/70 to-transparent dark:via-white/5"
                      animate={{ translateX: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2 + index * 0.4,
                      }}
                    />
                    <div className="relative inline-flex items-center gap-1.5 rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 dark:border-cyan-400/20 dark:bg-cyan-400/10">
                      <motion.div
                        animate={{
                          scale: [1, 1.35, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.4,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.35)] dark:bg-cyan-400 dark:shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">
                        Trust Signal
                      </span>
                    </div>
                    <h4 className="relative mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="relative mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </motion.div>
                </MagneticCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
