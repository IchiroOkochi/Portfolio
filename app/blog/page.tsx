import { SectionWrapper } from '@/components/SectionWrapper';
import { BlogPreviewList } from '@/components/BlogPreviewList';

export default function BlogPage() {
  return (
    <SectionWrapper title="Blog" subtitle="Thoughts on AI, UX, engineering process, and building a standout portfolio.">
      <BlogPreviewList />
    </SectionWrapper>
  );
}
