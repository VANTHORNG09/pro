"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, Terminal, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({ index }: { index: number }) {
  // eslint-disable-next-line react-hooks/purity
  const size = 1.5 + Math.random() * 3;
  // eslint-disable-next-line react-hooks/purity
  const x = Math.random() * 100;
  // eslint-disable-next-line react-hooks/purity
  const duration = 14 + Math.random() * 16;
  // eslint-disable-next-line react-hooks/purity
  const delay = Math.random() * -24;
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-fuchsia-400",
    "bg-rose-300",
  ];
  const color = colors[index % colors.length];
  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-50`}
      style={{ width: size, height: size, left: `${x}%`, bottom: "-8px" }}
      // eslint-disable-next-line react-hooks/purity
      animate={{ y: [0, -(500 + Math.random() * 400)], opacity: [0, 0.7, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-red-400 mix-blend-screen"
        animate={{ x: [0, -4, 3, 0], skewX: [0, -5, 3, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 4 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        animate={{ x: [0, 4, -2, 0], skewX: [0, 4, -2, 0], opacity: [0, 1, 0] }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 4,
          delay: 0.05,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function TypedBadge() {
  const full = "Something went wrong";
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(full.slice(0, ++i));
      if (i >= full.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-red-300"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
      </span>
      {displayed}
      <span className="animate-pulse">_</span>
    </motion.span>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-red-400/30 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-red-400/25"
          style={{ width: i * 100, height: i * 100 }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration: 3,
            delay: i * 0.75,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function ErrorTerminal({ message }: { message: string }) {
  const lines = [
    { prefix: "→", text: "Runtime exception caught", color: "text-red-400" },
    { prefix: "→", text: `${message}`, color: "text-slate-200" },
    { prefix: "→", text: "Attempting recovery…", color: "text-yellow-400" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.52, duration: 0.5 }}
      className="mt-6 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 flex items-center gap-1.5 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          <Terminal className="h-3 w-3" /> error.log
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-4">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.35 }}
            className={`flex gap-2 break-all font-mono text-xs leading-5 ${line.color}`}
          >
            <span className="shrink-0 text-slate-600">{line.prefix}</span>
            {line.text}
          </motion.p>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block h-3.5 w-1.5 bg-slate-400"
        />
      </div>
    </motion.div>
  );
}

function StatChip({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border ${color} bg-black/20 px-4 py-3 backdrop-blur-md`}
    >
      <span className="font-mono text-lg font-bold text-white">{value}</span>
      <span className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  );
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => i);

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  const [retryCount, setRetryCount] = useState(0);
  const handleReset = () => {
    setRetryCount((c) => c + 1);
    reset();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_40%),linear-gradient(160deg,#0c0505_0%,#0f0a10_50%,#070510_100%)]" />
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
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-red-500/15 blur-[80px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-fuchsia-600/12 blur-[90px]"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-orange-500/10 blur-[90px]"
        />
        {PARTICLES.map((i) => (
          <Particle key={i} index={i} />
        ))}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.96, 1, 0.96] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-linear-to-r from-transparent via-red-400/40 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.25, 0.6, 0.25], scaleX: [0.96, 1, 0.96] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-linear-to-r from-transparent via-fuchsia-400/25 to-transparent"
        />
      </div>
      <section className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-white/12 bg-white/5.5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-3xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-linear-to-br from-white/6 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-400/45 to-transparent" />
          <ScanLine />
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mb-6"
            >
              <PulseRings />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border border-red-400/25 bg-linear-to-br from-red-500/20 to-orange-600/10 shadow-[0_0_50px_rgba(239,68,68,0.3),inset_0_1px_0_rgba(255,255,255,0.12)]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-red-400/25"
                />
                <motion.div
                  animate={{ rotate: [-6, 6, -6], scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertTriangle className="h-11 w-11 text-red-300 drop-shadow-[0_0_14px_rgba(239,68,68,0.7)]" />
                </motion.div>
              </motion.div>
            </motion.div>
            <TypedBadge />
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="mt-6 font-bold tracking-tight text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                lineHeight: 1.1,
                fontFamily: "'Syne', 'DM Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <GlitchText text="Unexpected error" />
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="mt-5 flex items-center gap-3"
            >
              <div className="h-px w-12 bg-linear-to-r from-transparent to-white/20" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
                critical fault
              </span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-white/20" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="mt-4 max-w-lg text-sm leading-7 text-slate-400 sm:text-[15px]"
            >
              Something broke while loading this page. This may be a temporary
              issue — try again, or head back to{" "}
              <span className="text-red-300 font-medium">AssignBridge</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.5 }}
              className="mt-7 grid w-full grid-cols-3 gap-3"
            >
              <StatChip label="Status" value="500" color="border-red-400/20" />
              <StatChip
                label="Retries"
                value={String(retryCount)}
                color="border-orange-400/20"
              />
              <StatChip
                label="Digest"
                value={error?.digest ? error.digest.slice(0, 6) : "—"}
                color="border-fuchsia-400/20"
              />
            </motion.div>
            {error?.message && <ErrorTerminal message={error.message} />}
            {error?.digest && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.4 }}
                className="mt-4 font-mono text-[10px] text-slate-600"
              >
                digest: <span className="text-slate-500">{error.digest}</span>
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
              className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <motion.button
                type="button"
                onClick={handleReset}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(239,68,68,0.35)] transition-shadow hover:shadow-[0_6px_36px_rgba(239,68,68,0.55)] sm:w-auto cursor-pointer"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.span>
                Try again
              </motion.button>
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/"
                  className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:border-white/30 hover:bg-white/12 hover:text-white sm:w-auto"
                >
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Home className="h-4 w-4" />
                  Back to home
                </Link>
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 font-mono text-[10px] uppercase tracking-widest text-slate-700"
            >
              AssignBridge · runtime error ·{" "}
              <Zap className="inline h-2.5 w-2.5" /> auto-recovery enabled
            </motion.p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
