import { SectionWrapper } from '@/components/SectionWrapper';
import { ContactForm } from '@/components/ContactForm';
import { SocialIcons } from '@/components/SocialIcons';

export default function ContactPage() {
  return (
    <SectionWrapper title="Contact" subtitle="Open to internships, collaboration, and impactful engineering opportunities.">
      <div className="grid gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="space-y-4 rounded-2xl border border-border bg-card/70 p-6">
          <p className="text-sm text-muted-foreground">
            I’m actively looking for Summer 2026 internships and high-impact teams where I can contribute across product, engineering, and
            leadership.
          </p>
          <SocialIcons />
        </div>
      </div>
    </SectionWrapper>
  );
}
