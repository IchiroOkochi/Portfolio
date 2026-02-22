'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import { projects } from '@/lib/content';

function ProjectCard({
  project,
  index
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2), transparent 70%)`;

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(((y - rect.height / 2) / rect.height) * -10);
    rotateY.set(((x - rect.width / 2) / rect.width) * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/80 p-5 shadow-[0_28px_80px_-45px_rgba(255,255,255,0.5)]"
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_40%,transparent_60%,rgba(255,255,255,0.08))] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-3 backdrop-blur-sm">
            <Image src={project.image} alt={`${project.title} logo`} width={38} height={38} className="h-9 w-9" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/75">
            <Layers3 className="h-3.5 w-3.5" />
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white md:text-2xl">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{project.summary}</p>
        </div>

        <p className="rounded-xl border border-white/15 bg-white/[0.03] p-3 text-sm text-white/85">{project.impact}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white/70 transition group-hover:border-white/40 group-hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={project.href ?? '/projects'}
          className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          Explore Project
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ProjectCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
