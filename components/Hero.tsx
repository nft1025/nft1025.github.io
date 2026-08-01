"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { NeuralCanvas } from "./NeuralCanvas";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function MagneticButton({
  children,
  variant,
  href,
}: {
  children: React.ReactNode;
  variant: "primary" | "ghost";
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  }

  const base =
    "rounded-md px-6 py-[13px] text-sm font-semibold transition-shadow";
  const styles =
    variant === "primary"
      ? "bg-teal text-[#052620] hover:shadow-[0_8px_24px_rgba(79,227,193,0.3)]"
      : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--text-dim)]";

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const [spot, setSpot] = useState({ x: 50, y: 30 });

  return (
    <section
      id="about"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative overflow-hidden border-b border-[var(--border-soft)] px-8 py-20 md:px-14 md:py-24"
    >
      <NeuralCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(480px circle at ${spot.x}% ${spot.y}%, rgba(79,227,193,0.10), transparent 65%)`,
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr]"
      >
        <div>
          <motion.div
            variants={item}
            className="mb-6 flex items-center gap-2 font-mono text-xs tracking-wider text-teal"
          >
            <span className="h-px w-4 bg-teal" />
            PORTFOLIO.INIT()
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-[54px]"
          >
            Neil Francis
            <br />
            A. Teresa
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="ml-1.5 inline-block h-11 w-1 -translate-y-1 bg-teal align-middle"
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-4 max-w-[480px] text-base text-[var(--text-dim)]"
          >
            Aspiring AI engineer and full-stack developer, building systems
            with clean logic and practical impact.
          </motion.p>

          <motion.div
            variants={item}
            className="mb-8 font-mono text-[13px] leading-relaxed text-[var(--text-faint)]"
          >
            stack: <b className="font-medium text-amber">Python</b> ·{" "}
            <b className="font-medium text-amber">C++</b> · HTML ·
            JavaScript · PHP · SQL · Packet Tracer ·{" "}
            <b className="font-medium text-amber">Machine Learning</b>
          </motion.div>

          <motion.div variants={item} className="flex gap-3.5">
            <MagneticButton href="#projects" variant="primary">View my projects</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Contact me</MagneticButton>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        >
          <div className="flex items-center gap-2 border-b border-[var(--border-soft)] bg-[var(--surface-2)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5645C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5B65C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5CC98A]" />
            <span className="ml-1.5 font-mono text-[11px] text-[var(--text-faint)]">
              overview.sh
            </span>
          </div>
          <div className="p-6">
            <p className="mb-5 text-sm text-[var(--text-dim)]">
              This portfolio spans software, AI, web development, and data —
              a blend of technical skill and practical problem-solving.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "4+", l: "PROJECT CATEGORIES" },
                { n: "8", l: "CORE TECHNICAL SKILLS" },
                { n: "AI", l: "ML & ANALYTICS FOCUS", amber: true },
                { n: "WEB", l: "FRONTEND + BACKEND", amber: true },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  whileHover={{
                    y: -4,
                    borderColor: "#2C7566",
                    boxShadow: "0 12px 28px rgba(79,227,193,0.16)",
                  }}
                  className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-2)] p-4"
                >
                  <b
                    className={`font-display block text-2xl ${
                      s.amber ? "text-amber" : ""
                    }`}
                  >
                    {s.n}
                  </b>
                  <span className="font-mono text-[11px] text-[var(--text-faint)]">
                    {s.l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
