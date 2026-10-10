import { site } from './content';

const base = site.url || 'https://example.com';

export default function sitemap() {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
