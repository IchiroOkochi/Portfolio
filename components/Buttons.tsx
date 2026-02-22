import Link from 'next/link';
import { Button } from './ui/button';

export function Buttons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="bg-white text-black hover:bg-white/90">
        <Link href="/contact">Start a Conversation</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/resume">View Resume</Link>
      </Button>
    </div>
  );
}
