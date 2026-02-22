import { SectionWrapper } from '@/components/SectionWrapper';
import { GalleryViewer } from '@/components/GalleryViewer';

export default function GalleryPage() {
  return (
    <SectionWrapper title="Gallery" subtitle="Rockets, projects, and personal brand artifacts.">
      <GalleryViewer />
    </SectionWrapper>
  );
}
