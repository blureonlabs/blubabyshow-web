// Links to blog posts that aren't live yet (draft or future pubDate) render as plain text,
// so scheduled posts never 404. The daily rebuild turns them back into links on publish day.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';

const DIR = path.resolve('src/content/blog');

function liveSlugs() {
  const now = Date.now();
  const live = new Set();
  for (const f of fs.readdirSync(DIR)) {
    if (!f.endsWith('.md')) continue;
    const { data } = matter(fs.readFileSync(path.join(DIR, f), 'utf8'));
    if (data.draft !== true && new Date(data.pubDate).getTime() <= now) live.add(f.slice(0, -3));
  }
  return live;
}

export default function remarkUnlinkFuturePosts() {
  return (tree) => {
    const live = liveSlugs();
    visit(tree, 'link', (node, index, parent) => {
      const m = /^\/blog\/([a-z0-9-]+)\/?(#.*)?$/.exec(node.url || '');
      if (m && !live.has(m[1]) && parent && index != null) {
        parent.children.splice(index, 1, ...node.children);
        return index;
      }
    });
  };
}
