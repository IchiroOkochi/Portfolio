'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/content';

export function ProjectCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
          whileHover={{ rotateX: -6, rotateY: 6, scale: 1.02 }}
          className="group relative transform-gpu rounded-2xl border border-border bg-card/70 p-6 shadow-[0_10px_50px_rgba(0,0,0,0.25)] transition duration-300 [transform-style:preserve-3d]"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-slate-300/10 opacity-0 transition group-hover:opacity-100" />
          <p className="relative text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.category}</p>
          <h3 className="relative mt-2 text-2xl font-semibold text-foreground">{project.title}</h3>
          <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <p className="relative mt-4 text-sm text-foreground/90">{project.impact}</p>
          <div className="relative mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
