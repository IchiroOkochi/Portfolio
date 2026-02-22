'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bolt, Cpu, Hammer, TerminalSquare } from 'lucide-react';
import type { SkillCategory } from '@/lib/content';
import { skills } from '@/lib/content';

const categories: SkillCategory[] = ['Programming', 'Hardware', 'Tools', 'Leadership'];

const iconByCategory = {
  Programming: TerminalSquare,
  Hardware: Cpu,
  Tools: Hammer,
  Leadership: Bolt
} as const;

export function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Programming');

  const filteredSkills = useMemo(
    () => skills.filter((skill) => skill.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = iconByCategory[category];
          const active = category === activeCategory;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? 'border-white/60 bg-white text-black shadow-[0_8px_24px_-12px_rgba(255,255,255,0.8)]'
                  : 'border-white/25 bg-black/50 text-white/75 hover:border-white/45 hover:text-white'
              }`}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="grid gap-4 md:grid-cols-2"
      >
        {filteredSkills.map((skill, index) => (
          <motion.article
            key={skill.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-white/15 bg-white/[0.03] p-4 shadow-[0_18px_45px_-35px_rgba(255,255,255,0.7)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{skill.name}</p>
              <span className="text-xs text-white/60">{skill.level}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.08 * index + 0.1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-white/90 via-white to-white/70"
              />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
