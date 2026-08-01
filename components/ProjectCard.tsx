"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Project = {
  tag: string;
  title: string;
  desc: string;
  href: string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8, borderColor: "#2C7566", boxShadow: "0 24px 48px rgba(79,227,193,0.18)" }}
      className="overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-2 border-b border-[var(--border-soft)] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#E5645C]" />
        <span className="h-2 w-2 rounded-full bg-[#E5B65C]" />
        <span className="h-2 w-2 rounded-full bg-[#5CC98A]" />
      </div>
      <div className="px-5 py-5">
        <span className="mb-3 inline-block rounded border border-amber-dim bg-amber/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-amber">
          {project.tag}
        </span>
        <h3 className="font-display mb-2 text-base">{project.title}</h3>
        <p className="mb-4 min-h-[58px] text-[13px] text-[var(--text-dim)]">
          {project.desc}
        </p>
        <motion.a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title}`}
          whileHover={{ gap: "10px" }}
          className="flex items-center gap-1.5 font-mono text-xs text-teal"
        >
          view project →
        </motion.a>
      </div>
    </motion.div>
  );
}
