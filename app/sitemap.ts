import { MetadataRoute } from 'next';
import prisma from '@/prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wiki.batcore.eu';

  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changefreq: 'weekly', priority: 1.0, language: 'sk' },
    { url: `${baseUrl}/category/minecraft`, lastModified: new Date(), changefreq: 'weekly', priority: 0.8, language: 'sk' },
    { url: `${baseUrl}/category/ostatne`, lastModified: new Date(), changefreq: 'weekly', priority: 0.8, language: 'sk' },
    { url: `${baseUrl}/category/vps`, lastModified: new Date(), changefreq: 'weekly', priority: 0.8, language: 'sk' },
  ];

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: article.updatedAt,
    changefreq: 'weekly',
    priority: 0.7,
    language: 'sk',
  }));

  return [...staticPages, ...articlePages];
}