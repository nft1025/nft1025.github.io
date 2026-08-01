"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    tag: "AI / PYTHON",
    title: "AI related activities",
    desc: "Data prep, regression, and classification using Python, OpenCV, scikit-learn, and Pandas.",
  },
  {
    tag: "BACKEND / PHP",
    title: "Event management system",
    desc: "A student registration system built with PHP, XAMPP, and MySQL on the backend.",
  },
  {
    tag: "FRONTEND / WEB",
    title: "Web development activities",
    desc: "Responsive sites built with HTML, CSS, and JavaScript for varied purposes.",
  },
  {
    tag: "PRODUCTIVITY / REACT",
    title: "Time manager website",
    desc: "A time organizer built during an internship using React, TypeScript, and Node.js.",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="border-b border-[var(--border-soft)] px-8 py-16 md:px-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline gap-3.5"
      >
        <span className="font-mono text-[13px] text-[var(--text-faint)]">01</span>
        <h2 className="font-display text-[28px] font-semibold">Featured projects</h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
