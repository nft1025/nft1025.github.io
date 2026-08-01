"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const links = ["About", "Projects", "Skills", "Contact"];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("About");

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  useEffect(() => {
    const updateActiveLink = () => {
      const activationPoint = window.innerHeight * 0.35;
      let active = "About";

      for (const link of links) {
        const section = document.getElementById(link.toLowerCase());
        if (section && section.getBoundingClientRect().top <= activationPoint) {
          active = link;
        }
      }

      setActiveLink(active);
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,0.12)" : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-40 flex flex-col items-start justify-between gap-2 border-b px-5 py-3 backdrop-blur-md transition-colors sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-4 md:px-14 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--surface)]/85"
          : "border-[var(--border-soft)] bg-transparent"
      }`}
    >
      <motion.div
        whileHover={{ letterSpacing: "0.08em" }}
        transition={{ duration: 0.2 }}
        className="font-display text-sm font-semibold tracking-wide"
      >
        NEIL FRANCIS <span className="text-teal">TERESA</span>
      </motion.div>
      <div className="w-full sm:w-auto">
        <ul className="flex items-center justify-between gap-3 text-xs sm:justify-start sm:gap-5 sm:text-sm md:gap-9">
          {links.map((link) => (
            <li key={link}>
              <motion.a
                href={`#${link.toLowerCase()}`}
                onClick={() => setActiveLink(link)}
                whileHover={{ y: -1 }}
                className={`relative whitespace-nowrap py-2 transition-colors ${
                  activeLink === link
                    ? "text-[var(--text)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]"
                }`}
              >
                {link}
                {activeLink === link && (
                  <motion.span
                    layoutId="active-nav-link"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-teal"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
