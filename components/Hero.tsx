'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { profile } from '@/lib/content';
import { Button } from './ui/button';
import { SocialIcons } from './SocialIcons';

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-center px-6 py-20 md:px-10">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
        {profile.major}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-foreground md:text-6xl"
      >
        {profile.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="mt-6 max-w-3xl text-lg text-muted-foreground"
      >
        {profile.tagline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
          <Link href="/projects">
            Explore Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/resume">
            Download Resume <FileDown className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
      <div className="mt-10">
        <SocialIcons />
      </div>
    </section>
  );
}
