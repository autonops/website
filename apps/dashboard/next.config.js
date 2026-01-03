/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: [
      'img.clerk.com', // Clerk user avatars
      'autonops.io',
    ],
  },
  
  // Environment variables available on the client
  env: {
    NEXT_PUBLIC_APP_NAME: 'InfraIQ',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Redirects
  async redirects() {
    return [
      // Redirect root to dashboard for logged in users (handled by middleware)
      // These are fallback redirects
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
