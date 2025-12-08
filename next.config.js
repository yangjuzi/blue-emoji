/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ❌ 不要使用 export
  // output: "export",

  // ❌ 不需要 unoptimized，Vercel 有 Image Optimization
  // images: { unoptimized: true },

  // ❌ 不要 trailingSlash，否则 Vercel 会出现路由文件对不上
  // trailingSlash: true,

  // 你可以保留这个：用于自定义忽略文件，但不影响部署
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
