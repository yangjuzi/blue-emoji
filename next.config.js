/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    trailingSlash: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    
    // 🌟 关键修改：将 outputFileTracingIgnores 更改为 outputFileTracingExcludes
    experimental: {
        outputFileTracingExcludes: { // 💡 新名称
            '*': [
                './node_modules/.pnpm/**', 
                './data/**', 
                './.next/cache/**',
            ]
        },
    },
}

module.exports = nextConfig