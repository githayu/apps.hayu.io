/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => [
    {
      source: '/',
      destination: 'https://hayu.io',
      permanent: false,
    },
  ],
}

module.exports = nextConfig
