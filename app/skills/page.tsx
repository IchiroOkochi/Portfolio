import { SectionWrapper } from '@/components/SectionWrapper';
import { skills } from '@/lib/content';

export default function SkillsPage() {
  return (
    <SectionWrapper title="Skills" subtitle="Technical depth backed by communication and leadership.">
      <div className="grid gap-5 md:grid-cols-2">
        {Object.entries(skills).map(([category, list]) => (
          <article key={category} className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold capitalize">{category}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {list.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
