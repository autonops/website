import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autonops.io'
  
  // All your marketing pages
  const pages = [
    '',           // homepage
    '/products',
    '/migrateiq',
    '/verifyiq',
    '/codifyiq',
    '/complyiq',
    '/dataiq',
    '/secureiq',
    '/tessera',
    '/pricing',
    '/start',
    '/privacy',
    '/security',
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : page === '/pricing' ? 0.9 : 0.8,
  }))
}
