import { SectionWrapper } from '@/components/SectionWrapper';
import { experiences } from '@/lib/content';

export default function ExperiencePage() {
  return (
    <SectionWrapper title="Experience" subtitle="Leadership, engineering execution, and product-minded communication.">
      <div className="space-y-4">
        {experiences.map((exp) => (
          <article key={exp.role} className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{exp.period}</p>
            <h3 className="mt-2 text-xl font-semibold">{exp.role}</h3>
            <p className="text-sm text-muted-foreground">{exp.org}</p>
            <p className="mt-3 text-sm text-foreground/90">{exp.detail}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
