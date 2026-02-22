import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { socialLinks } from '@/lib/content';

const items = [
  { href: socialLinks.github, label: 'GitHub', icon: Github },
  { href: socialLinks.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: socialLinks.email, label: 'Email', icon: Mail },
  { href: socialLinks.instagram, label: 'Instagram', icon: Instagram }
];

export function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target="_blank"
          className="rounded-full border border-border bg-card p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          aria-label={item.label}
        >
          <item.icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}
