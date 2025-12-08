/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        './node_modules/.pnpm/**',
        './data/**',
        './.next/cache/**',
      ],
    },
  },
};

module.exports = nextConfig;
