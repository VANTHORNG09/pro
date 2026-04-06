"use client";

import { motion, cubicBezier, useMotionValue, useSpring } from "framer-motion";
import { platformStats, whyChooseItems } from "@/lib/data/landing-page-data";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
};

function AnimatedStat({ value }: { value: string }) {
  const numMatch = value.match(/^(\d+)(.*)$/);
  if (!numMatch) return <>{value}</>;
  const target = parseInt(numMatch[1], 10);
  const suffix = numMatch[2] ?? "";

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ innerText: 0 } as never}
        whileInView={{ innerText: target } as never}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onUpdate={() => {}}
      >
        <CountUp target={target} suffix={suffix} />
      </motion.span>
    </motion.span>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!nodeRef.current) return;
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          if (nodeRef.current) {
            nodeRef.current.textContent = `${Math.round(target * eased)}${suffix}`;
          }
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      0{suffix}
    </motion.span>
  );
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
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.055);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.055);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`h-full ${className ?? ""}`}
    >
      {children}
    </motion.div>
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
      animate={{ y: [0, -18, 0], opacity: [0.12, 0.25, 0.12] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/25 to-transparent dark:via-cyan-400/30"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  );
}

function GridMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="bp-grid"
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
        <rect width="100%" height="100%" fill="url(#bp-grid)" />
      </svg>
    </div>
  );
}


export default function BenefitsProofSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <FloatingOrb
        style={{
          left: "5%",
          top: "15%",
          width: 280,
          height: 280,
          background: "rgba(6,182,212,0.1)",
        }}
        delay={0}
      />
      <FloatingOrb
        style={{
          right: "8%",
          bottom: "20%",
          width: 360,
          height: 360,
          background: "rgba(16,185,129,0.07)",
        }}
        delay={2.5}
      />
      <FloatingOrb
        style={{
          left: "50%",
          top: "50%",
          width: 200,
          height: 200,
          background: "rgba(34,211,238,0.06)",
        }}
        delay={1.2}
      />
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative rounded-4xl border border-cyan-200/70 bg-white/75 px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-cyan-400/10 dark:bg-white/3 dark:shadow-[0_0_100px_rgba(0,255,255,0.05)] sm:px-8 lg:px-12 lg:py-16">
          <GridMesh />
          <ScanLine />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="relative mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              <motion.span
                animate={{ rotate: [0, 18, -18, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.span>
              Benefits & Outcomes
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Why Choose{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.03 }}
              >
                <motion.span
                  className="pointer-events-none absolute inset-0 blur-2xl"
                  style={{ background: "rgba(34,211,238,0.16)" }}
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span className="relative bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-200">
                  AssignBridge
                </span>
              </motion.span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base"
            >
              AssignBridge is designed to simplify academic coordination through
              one organized platform for assignments, communication,
              submissions, and progress visibility.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {platformStats.map((stat, index) => (
              <MagneticCard key={stat.label} className="h-full">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-white/3 dark:shadow-[0_0_30px_rgba(0,255,255,0.03)] dark:hover:border-cyan-400/20 dark:hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-linear-to-bl from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-3xl bg-linear-to-r from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <motion.div
                    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-slate-100/60 to-transparent dark:via-white/5"
                    animate={{ translateX: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1.5 + index * 0.4,
                    }}
                  />
                  <div className="relative text-3xl font-semibold tabular-nums tracking-tight text-cyan-600 dark:text-cyan-300 sm:text-4xl">
                    <AnimatedStat value={stat.value} />
                  </div>
                  <h3 className="relative mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                    {stat.label}
                  </h3>
                  <p className="relative mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {stat.description}
                  </p>
                </motion.div>
              </MagneticCard>
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={containerVariants}
            className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <MagneticCard key={item.title} className="h-full">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-b from-white to-slate-50/80 p-6 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_16px_40px_rgba(34,211,238,0.10)] dark:border-white/10 dark:bg-linear-to-b dark:from-white/5 dark:to-white/2 dark:hover:border-cyan-400/20 dark:hover:shadow-[0_0_40px_rgba(0,255,255,0.07)]"
                  >
                    <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-br-3xl bg-linear-to-br from-cyan-400/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-3xl bg-linear-to-b from-cyan-400 to-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-slate-100/60 to-transparent dark:via-white/5"
                      animate={{ translateX: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        repeatDelay: 2 + index * 0.3,
                      }}
                    />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.12 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <motion.div
                        className="pointer-events-none absolute -inset-1 rounded-2xl border border-cyan-300/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:border-cyan-400/20"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    </div>
                    <h3 className="relative mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                    <motion.div
                      className="mt-5 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      initial={false}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.35)] dark:bg-cyan-400 dark:shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                      />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-600/70 dark:text-cyan-300/60">
                        Active feature
                      </span>
                    </motion.div>
                  </motion.div>
                </MagneticCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
