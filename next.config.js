/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vitasynlabs.com', 'www.vitasynlabs.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vitasynlabs.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vitasynlabs.com',
      },
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
  // Ensure images work in production
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

module.exports = nextConfig
