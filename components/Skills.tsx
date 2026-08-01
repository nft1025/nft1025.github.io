"use client";

import { motion } from "framer-motion";

const skills = [
  { label: "Python", value: 85 },
  { label: "SharePoint automation", value: 85 },
  { label: "Cisco packet tracer routing", value: 85 },
  { label: "Database management", value: 80 },
  { label: "HTML", value: 70 },
  { label: "JavaScript", value: 65 },
  { label: "PHP", value: 60 },
  { label: "C++", value: 60 },
  { label: "React", value: 40 },
];

export function Skills() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline gap-3.5"
      >
        <span className="font-mono text-[13px] text-[var(--text-faint)]">02</span>
        <h2 className="font-display text-[28px] font-semibold">Skills & focus</h2>
      </motion.div>

      <div>
        {skills.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="mb-4"
          >
            <div className="mb-1.5 flex justify-between text-[13px]">
              <span>{s.label}</span>
              <span className="font-mono text-[var(--text-faint)]">
                {s.value}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 + 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-teal to-amber"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
