import { profile } from '@/lib/content';
import { SocialIcons } from './SocialIcons';

export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <div>
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="text-sm text-muted-foreground">{profile.tagline}</p>
        </div>
        <SocialIcons />
      </div>
    </footer>
  );
}
