import Link from 'next/link';
import { blogPosts } from '@/lib/content';

export function BlogPreviewList() {
  return (
    <div className="grid gap-4">
      {blogPosts.map((post) => (
        <article key={post.slug} className="rounded-xl border border-border bg-card/70 p-5 transition hover:border-white/30">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{post.date}</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{post.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <Link href="/blog" className="mt-4 inline-block text-sm text-foreground underline-offset-4 hover:underline">
            Read insights
          </Link>
        </article>
      ))}
    </div>
  );
}
