<<<<<<< HEAD
/** @type {import('next').NextConfig} */

// Set this to your repo name if deploying to https://<user>.github.io/<repo>/
// Leave as '' if this repo IS your username.github.io user/org page.
const repoName = process.env.REPO_NAME || '';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions && repoName ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
=======
"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = ["About", "Projects", "Skills", "Contact"];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.12)" : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-40 flex items-center justify-between border-b px-8 py-5 backdrop-blur-md transition-colors md:px-14 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--surface)]/85"
          : "border-[var(--border-soft)] bg-transparent"
      }`}
    >
      <div className="font-display text-sm font-semibold tracking-wide">
        NEIL FRANCIS <span className="text-teal">TERESA</span>
      </div>
      <div className="flex items-center gap-8">
        <ul className="hidden gap-9 md:flex">
          {links.map((link) => (
            <li key={link}>
              <motion.a
                href={`#${link.toLowerCase()}`}
                whileHover={{ y: -1 }}
                className="relative text-sm text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
              >
                {link}
              </motion.a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
>>>>>>> f1ff80c34a6232e32bf4fd8ee09c2b46df2f532c
