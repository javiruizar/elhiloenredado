import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://elhiloenredado.javierruiz.org';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/login',
        '/checkout/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
