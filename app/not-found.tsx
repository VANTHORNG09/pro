"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Home,
  SearchX,
  Wifi,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function TiltCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="relative cursor-default rounded-2xl border border-white/15 bg-white/6 p-5 backdrop-blur-xl"
    >
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100 ${accent} blur-xl`}
      />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <div className="mb-3">{icon}</div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        animate={{ x: [0, -3, 2, 0], skewX: [0, -4, 2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3.5 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-fuchsia-400 mix-blend-screen"
        animate={{ x: [0, 3, -1, 0], skewX: [0, 3, -2, 0], opacity: [0, 1, 0] }}
        transition={{
          duration: 0.12,
          repeat: Infinity,
          repeatDelay: 3.5,
          delay: 0.04,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function RadarRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-400/20"
          style={{ width: i * 120, height: i * 120 }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{
            duration: 3.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400/40 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

function TypedBadge() {
  const full = "Error 404";
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(full.slice(0, ++i));
      if (i >= full.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
      </span>
      {displayed}
      <span className="animate-pulse">_</span>
    </motion.span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const PARTICLE_CONFIG = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  size: 2 + (index % 4),
  x: (index * 13 + 7) % 100,
  duration: 12 + (index % 6) * 3,
  delay: -(index % 10) * 2,
  travelY: -(620 + (index % 5) * 90),
}));

const PARTICLES = PARTICLE_CONFIG;

function Particle({
  index,
  config,
}: {
  index: number;
  config: {
    id: number;
    size: number;
    x: number;
    duration: number;
    delay: number;
    travelY: number;
  };
}) {
  const colors = [
    "bg-cyan-400",
    "bg-fuchsia-400",
    "bg-sky-300",
    "bg-violet-400",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-60`}
      style={{
        width: config.size,
        height: config.size,
        left: `${config.x}%`,
        bottom: "-8px",
      }}
      animate={{ y: [0, config.travelY], opacity: [0, 0.8, 0] }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.22),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.2),transparent_40%),linear-gradient(160deg,#020617_0%,#0a1020_50%,#0f0a1e_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, 22, 0], y: [0, 28, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[80px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -20, 0], y: [0, -22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-32 h-112 w-md rounded-full bg-fuchsia-600/15 blur-[90px]"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]"
        />
        {PARTICLES.map((particle, index) => (
          <Particle key={particle.id} index={index} config={particle} />
        ))}
      </div>
      <section className="mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-white/13 bg-white/6 px-6 py-12 shadow-[0_20px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-3xl sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-linear-to-br from-white/[0.07] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />
          <ScanLine />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="relative mb-6">
              <RadarRings />
              <motion.div
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/25 bg-linear-to-br from-cyan-500/20 to-sky-600/10 shadow-[0_0_50px_rgba(34,211,238,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20"
                />
                <SearchX className="h-11 w-11 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <TypedBadge />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="mt-6 font-bold tracking-tight text-white"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                lineHeight: 1.1,
                fontFamily: "'Syne', 'DM Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <GlitchText text="Page not found" />
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-3"
            >
              <div className="h-px w-16 bg-linear-to-r from-transparent to-white/25" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                signal lost
              </span>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-white/25" />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-[15px]"
            >
              The page you are looking for does not exist, was moved, or the URL
              may be incorrect. Let&apos;s get you back to{" "}
              <span className="text-cyan-300 font-medium">AssignBridge</span>{" "}
              safely.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <Link
                  href="/"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-cyan-500 to-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(34,211,238,0.35)] transition-shadow hover:shadow-[0_6px_36px_rgba(34,211,238,0.5)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </motion.div>
              <motion.button
                type="button"
                onClick={() => window.history.back()}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/8 px-7 py-3 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:border-white/30 hover:bg-white/12 hover:text-white cursor-pointer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </motion.button>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mt-12 grid w-full max-w-2xl gap-4 sm:grid-cols-3"
            >
              <TiltCard
                icon={<Wifi className="h-5 w-5 text-cyan-400" />}
                title="Assignments"
                description="Track tasks clearly across all subjects"
                accent="bg-cyan-500/10"
              />
              <TiltCard
                icon={<BookOpen className="h-5 w-5 text-fuchsia-400" />}
                title="Classes"
                description="Organize classroom workflows easily"
                accent="bg-fuchsia-500/10"
              />
              <TiltCard
                icon={<BarChart3 className="h-5 w-5 text-sky-400" />}
                title="Progress"
                description="Monitor completion at a glance"
                accent="bg-sky-500/10"
              />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-10 font-mono text-[10px] tracking-widest text-slate-600 uppercase"
            >
              AssignBridge · v2.0 · 404
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
