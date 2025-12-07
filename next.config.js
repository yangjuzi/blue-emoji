/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  generateBuildId: () => 'build',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  distDir: 'out'
}

module.exports = nextConfig