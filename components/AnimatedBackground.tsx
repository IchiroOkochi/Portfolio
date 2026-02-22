'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),radial-gradient(circle_at_80%_20%,_rgba(148,163,184,0.15),_transparent_36%)]"
      />
      <div className="absolute inset-0 animate-pulse-grid bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-slate-300/10 blur-3xl" />
    </div>
  );
}
