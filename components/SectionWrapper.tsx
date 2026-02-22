import { ReactNode } from 'react';
import { MotionWrapper } from './MotionWrapper';

export function SectionWrapper({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
      <MotionWrapper>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p> : null}
      </MotionWrapper>
      <div className="mt-8">{children}</div>
    </section>
  );
}
