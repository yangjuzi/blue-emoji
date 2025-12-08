/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    trailingSlash: true,
    // 移除 generateBuildId: () => 'build',
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    // 🌟 关键修改：移除 distDir: 'out'
    
    // 保留上次添加的 experimental 修复配置
    experimental: {
        outputFileTracingIgnores: [
            './node_modules/.pnpm/**', 
            './data/**', 
            './.next/cache/**',
        ],
    },
}

module.exports = nextConfig