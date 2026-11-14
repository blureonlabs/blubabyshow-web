import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const SITE = 'https://www.blubabyshow.com';

export const CLUSTER_LABELS: Record<Post['data']['cluster'], string> = {
  'big-feelings': 'Big feelings',
  'new-sibling': 'New sibling',
  'screen-free-play': 'Screen-free play',
  'early-learning': 'Early learning',
  'parent-life': 'Parent life',
};

/** The one visibility rule: not a draft AND pubDate <= build time. */
export const isPublished = (p: Post, now = new Date()) =>
  p.data.draft === false && p.data.pubDate.getTime() <= now.getTime();

/** All published posts, newest first. Use this everywhere (routes, listings, RSS). */
export async function getPublishedPosts(): Promise<Post[]> {
  const now = new Date();
  const all = await getCollection('blog', (p) => isPublished(p, now));
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Minutes to read at 200 wpm (markdown body, syntax stripped). */
export function readingTime(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
