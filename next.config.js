/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 关键修改：添加 redirects 规则
  async redirects() {
    return [
      {
        // 匹配所有以 /emoji/ 开头，并且包含 'giscus=' 查询参数的 URL
        source: '/emoji/:path*',
        has: [
          {
            type: 'query',
            key: 'giscus',
          },
        ],
        // 重定向到不带查询参数的干净路径
        destination: '/emoji/:path',
        permanent: true,
      },
    ];
  },
  
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
