import { SectionWrapper } from '@/components/SectionWrapper';
import { SkillsShowcase } from '@/components/SkillsShowcase';

export default function SkillsPage() {
  return (
    <SectionWrapper
      title="Skills"
      subtitle="Interactive skill matrix with category filters, animated proficiency bars, and polished micro-interactions."
    >
      <SkillsShowcase />
    </SectionWrapper>
  );
}
