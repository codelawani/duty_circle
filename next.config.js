/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'discordapp.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['swagger-jsdoc'],
  },
};

module.exports = nextConfig;
