import { Hero } from '@/components/Hero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { MotionWrapper } from '@/components/MotionWrapper';
import { profile, experiences } from '@/lib/content';
import { ProjectCards } from '@/components/ProjectCards';
import { LogoGrid } from '@/components/LogoGrid';
import { Buttons } from '@/components/Buttons';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionWrapper title="About Me" subtitle="Engineering curiosity, design discipline, and leadership-forward execution.">
        <MotionWrapper>
          <p className="max-w-3xl text-muted-foreground">
            I am {profile.name}, a {profile.major} student focused on blending {profile.interests.join(', ')} into products that feel
            technically strong and genuinely useful.
          </p>
        </MotionWrapper>
      </SectionWrapper>
      <SectionWrapper title="Experience Snapshot">
        <div className="grid gap-4 md:grid-cols-3">
          {experiences.map((exp, i) => (
            <MotionWrapper key={exp.role} delay={i * 0.1}>
              <article className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs tracking-[0.18em] text-muted-foreground">{exp.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-muted-foreground">{exp.org}</p>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper title="Featured Projects" subtitle="Interactive cards with motion depth and layered visual hierarchy.">
        <ProjectCards />
      </SectionWrapper>
      <SectionWrapper title="Project Logos">
        <LogoGrid />
      </SectionWrapper>
      <SectionWrapper title="Let’s Build Something Exceptional">
        <Buttons />
      </SectionWrapper>
    </>
  );
}
