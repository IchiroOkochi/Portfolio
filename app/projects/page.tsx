import { SectionWrapper } from '@/components/SectionWrapper';
import { ProjectCards } from '@/components/ProjectCards';

export default function ProjectsPage() {
  return (
    <SectionWrapper title="Projects" subtitle="A highly interactive portfolio gallery designed for depth and clarity.">
      <ProjectCards />
    </SectionWrapper>
  );
}
