import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, SITE } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Small Moments · Blu Baby Show blog',
    description: 'Gentle, practical notes for parents of little ones.',
    site: context.site ?? SITE,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.slug}/`,
      categories: [p.data.cluster, ...p.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
