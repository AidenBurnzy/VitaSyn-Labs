/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vitasynlabs.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true, // Allow external images without optimization
  },
}

module.exports = nextConfig
