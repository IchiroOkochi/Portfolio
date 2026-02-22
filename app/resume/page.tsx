import Link from 'next/link';
import { FileDown } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  return (
    <SectionWrapper title="Resume" subtitle="Download or preview my latest resume for internship and collaboration opportunities.">
      <div className="rounded-2xl border border-border bg-card/70 p-6">
        <p className="mb-6 max-w-2xl text-muted-foreground">This portfolio includes a downloadable resume asset configured for recruiters and technical teams.</p>
        <Button asChild className="bg-white text-black hover:bg-white/90">
          <Link href="/resume/Ichiro_Okochi_Resume.pdf" download>
            Download Resume <FileDown className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
