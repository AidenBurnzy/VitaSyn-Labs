/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vitasynlabs.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
