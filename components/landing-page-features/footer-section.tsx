"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  productLinks,
  companyLinks,
  supportLinks,
  socialLinks,
} from "@/lib/data/landing-page-data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="overflow-hidden">
          <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-12">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                  <Image
                    src="/logo.png"
                    alt="AssignBridge Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  AssignBridge
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-white/70 sm:text-base">
                AssignBridge is a classroom workflow platform that helps
                students, teachers, and classrooms manage assignments,
                deadlines, updates, and progress in one clear place.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-white/65">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                  <span>pisethmao2002@gmail.com</span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                  <span>+855 095 256 602</span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                  <span>Phnom Penh, Cambodia</span>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-cyan-400/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-8 sm:grid-cols-3 lg:col-span-7"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                  Product
                </h3>
                <ul className="mt-5 space-y-3">
                  {productLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors duration-300 hover:text-cyan-700 dark:text-white/70 dark:hover:text-cyan-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                  Company
                </h3>
                <ul className="mt-5 space-y-3">
                  {companyLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors duration-300 hover:text-cyan-700 dark:text-white/70 dark:hover:text-cyan-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                  Support
                </h3>
                <ul className="mt-5 space-y-3">
                  {supportLinks.map((link) => (
                    <motion.li
                      key={link.label}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors duration-300 hover:text-cyan-700 dark:text-white/70 dark:hover:text-cyan-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="border-t border-cyan-200/70 px-6 py-5 dark:border-cyan-400/10 sm:px-8 lg:px-12"
          >
            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-slate-500 dark:text-white/50 sm:text-sm">
                © 2026 AssignBridge. All rights reserved.
              </p>
              <p className="text-xs text-slate-400 dark:text-white/40 sm:text-sm">
                Built for smarter classroom organization and assignment
                tracking.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}