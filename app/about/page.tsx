import { SectionWrapper } from '@/components/SectionWrapper';
import { profile } from '@/lib/content';

export default function AboutPage() {
  return (
    <SectionWrapper title="About Me" subtitle={profile.tagline}>
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        I’m {profile.name}, a {profile.major} student who enjoys shipping meaningful products at the intersection of AI, engineering, and user
        experience. My work spans student engineering teams, cross-border product collaboration, and client-facing web development.
      </p>
    </SectionWrapper>
  );
}
