/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    trailingSlash: true,
    generateBuildId: () => 'build',
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    distDir: 'out',

    // 🌟 关键修改：禁用或调整实验性追踪功能
    experimental: {
        // 告诉构建追踪器忽略这些可能导致递归扫描的路径
        outputFileTracingIgnores: [
            // 排除 pnpm 存储依赖的特殊路径
            './node_modules/.pnpm/**', 
            // 排除您的数据目录，如果它包含大量文件
            './data/**', 
            // 排除 Next.js 的缓存目录
            './.next/cache/**',
        ],
    },
};

module.exports = nextConfig;