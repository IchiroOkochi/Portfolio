import Link from 'next/link';
import { profile } from '@/lib/content';
import { PersonalLogo } from './PersonalLogo';

const links = ['about', 'experience', 'projects', 'skills', 'gallery', 'blog', 'contact', 'resume'];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <PersonalLogo />
          <div>
            <p className="text-sm font-semibold text-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground">Portfolio</p>
          </div>
        </Link>
        <ul className="hidden gap-5 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <li key={link}>
              <Link href={`/${link === 'about' ? 'about' : link}`} className="capitalize transition hover:text-foreground">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
