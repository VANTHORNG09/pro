"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";
import { ThemeToggle } from "../landing-page-features/theme-toggle";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Assignments", href: "#" },
  { label: "Classes", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link
          href="/"
          className={styles.logoWrapper}
          onClick={handleCloseMenu}
          aria-label="AssignBridge home"
        >
          <Image
            src="/logo.png"
            alt="AssignBridge Logo"
            width={50}
            height={50}
            className={styles.logoImage}
          />
          <h1 className={styles.logoText}>AssignBridge</h1>
        </Link>
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.buttonGroup}>
            <ThemeToggle />
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Signup
            </Link>
          </div>
        </div>
        <div className={styles.mobileActions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuToggle}
            onClick={handleToggleMenu}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileNavLinks}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleCloseMenu}
              className={styles.mobileLink}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className={styles.mobileButtonGroup}>
          <Link
            href="/login"
            className={styles.loginBtn}
            onClick={handleCloseMenu}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={styles.signupBtn}
            onClick={handleCloseMenu}
          >
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}