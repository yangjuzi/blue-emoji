# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Blue Emoji (blue-emoji.com) 是一个基于Next.js的蓝色emoji展示网站，将OpenMoji开源emoji库重新着色为蓝色主题。项目采用静态生成(SSG)架构，支持SEO优化和高性能访问。

## 开发命令

### Next.js 开发环境
```bash
# 安装依赖
npm install

# 本地开发服务器
npm run dev

# 构建生产版本 (静态生成)
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

### 开发流程
1. 使用 `npm run dev` 启动开发服务器
2. 编辑 `pages/` 和 `components/` 目录下的文件
3. 修改 `data/list.json` 更新emoji数据
4. 使用 `npm run build` 验证静态生成

## 技术架构

### 前端技术栈
- **框架**: Next.js (React)
- **渲染**: 静态站点生成 (SSG)
- **样式**: TailwindCSS
- **字体**: Inter字体 (Google Fonts)
- **部署**: Vercel / Cloudflare Pages

### 后端服务
- **评论系统**: Giscus (基于GitHub Issues)
- **图片存储**: 本地静态文件 (`/public/emojis/`)
- **搜索功能**: 客户端JavaScript搜索
- **数据源**: OpenMoji (CC BY-SA 4.0)

### 项目目录结构
```
blue-emoji/
├── package.json
├── next.config.js
├── tailwind.config.js
├── public/                      # 静态资源
│   ├── emojis/                  # emoji文件
│   │   ├── blue-svg/           # SVG格式蓝色emoji
│   │   └── blue-png/           # PNG格式蓝色emoji
│   └── downloads/               # 下载包
├── data/
│   └── list.json                # emoji数据(名称、分类、文件路径)
├── pages/
│   ├── index.tsx               # 首页
│   ├── emoji/
│   │   └── [slug].tsx          # emoji详情页 (动态路由)
│   ├── category/
│   │   └── [category].tsx      # 分类页面 (动态路由)
│   ├── download.tsx            # 下载页面
│   ├── about.tsx               # 关于页面
│   ├── contact.tsx             # 联系页面
│   ├── terms.tsx               # 服务条款
│   └── privacy.tsx             # 隐私政策
├── components/
│   ├── EmojiCard.tsx           # emoji卡片组件
│   ├── Search.tsx              # 搜索组件
│   ├── Related.tsx             # 相关推荐组件
│   └── Layout.tsx              # 页面布局组件
├── scripts/
│   ├── color-convert.js        # SVG蓝色转换脚本
│   └── generate-data.js        # emoji数据生成脚本
└── prototype/                  # 原型文件(开发参考)
    ├── index.html
    ├── detail.html
    └── ...
```

## 核心架构组件

### 数据层 (data/list.json)
```json
{
  "emojis": [
    {
      "id": "blue-heart",
      "name": "Blue Heart",
      "category": "symbols",
      "unicode": "U+1F499",
      "keywords": ["heart", "love", "blue"],
      "svgPath": "/emojis/blue-svg/1F499.svg",
      "pngPath": "/emojis/blue-png/1F499-64.png"
    }
  ],
  "categories": [
    {"id": "symbols", "name": "Symbols", "count": 50},
    {"id": "people", "name": "People", "count": 120}
  ]
}
```

### 页面路由结构
- **首页** (`/`): 所有emoji网格展示，搜索功能
- **详情页** (`/emoji/[slug]`): 单个emoji详细信息，Giscus评论
- **分类页** (`/category/[category]`): 按分类展示emoji
- **下载页** (`/download`): 完整资源包下载
- **关于页** (`/about`): 项目理念和使用场景

### 核心组件设计

#### EmojiCard 组件
```tsx
interface EmojiCardProps {
  emoji: EmojiData;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  onClick?: (emoji: EmojiData) => void;
}
```

#### Search 组件
- **前端搜索**: 基于 `data/list.json` 的客户端搜索
- **搜索字段**: name, category, keywords, unicode
- **实时过滤**: 输入即搜索，无需后端请求

#### Related 组件
- **算法逻辑**: 基于category和keywords计算相关emoji
- **展示数量**: 4-8个相关推荐
- **性能优化**: 预计算相关关系，减少运行时计算

## Emoji处理工作流

### 1. 数据准备阶段
```bash
# 下载OpenMoji原始SVG
npm run download:openmoji

# 批量转换为蓝色主题
node scripts/color-convert.js

# 生成多尺寸PNG
node scripts/generate-png.js

# 生成emoji数据JSON
node scripts/generate-data.js
```

### 2. 颜色转换脚本 (scripts/color-convert.js)
- **输入**: OpenMoji原始SVG文件
- **处理**: 替换fill属性为蓝色主题 (#2563eb)
- **输出**: `/public/emojis/blue-svg/` 目录
- **优化**: 移除metadata，压缩SVG文件大小

### 3. 数据生成脚本 (scripts/generate-data.js)
- **解析**: OpenMoji metadata.json
- **映射**: 生成slug和文件路径映射
- **分类**: 按9个标准emoji分类组织
- **输出**: data/list.json

## 静态生成策略

### Next.js SSG 配置
```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  generateBuildId: () => 'build'
}
```

### 动态路由预生成
- **emoji详情页**: 基于data/list.json生成所有emoji页面
- **分类页面**: 预生成所有9个分类页面
- **构建时生成**: `npm run build` 时生成所有静态HTML

## 评论系统集成

### Giscus 配置
- **GitHub仓库**: 连接到项目的GitHub仓库
- **自动映射**: 每个emoji对应一个GitHub Issue
- **SEO友好**: 评论内容可被搜索引擎索引
- **无成本**: 完全免费，无需数据库

### 集成方式
```tsx
// 在emoji详情页中
import Giscus from '@giscus/react';

<Giscus
  repo="your-org/blue-emoji"
  repoId="your-repo-id"
  category="Emoji Comments"
  categoryId="your-category-id"
  mapping="specific"
  term={emoji.id}
  theme="preferred_color_scheme"
/>
```

## 版权合规与部署

### CC BY-SA 4.0 要求
- **数据源**: OpenMoji开源库
- **版权声明**: 页脚必须显示基于OpenMoji的声明
- **共享要求**: 蓝色版SVG文件必须公开提供下载
- **协议保持**: 衍生作品必须使用相同CC BY-SA 4.0协议

### 部署配置
- **目标平台**: Vercel (推荐) / Cloudflare Pages
- **构建输出**: 静态HTML文件 (`out/` 目录)
- **SEO优化**: 自动生成sitemap.xml
- **CDN**: emoji文件通过CDN分发

### Vercel 部署配置
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "cleanUrls": true,
  "trailingSlash": true
}
```

## 开发阶段规划

### 第一阶段: 基础设施
1. **Next.js项目初始化**
   - 安装依赖包 (next, react, tailwindcss)
   - 配置TypeScript和ESLint
   - 设置TailwindCSS

2. **核心脚本开发**
   - `scripts/color-convert.js`: SVG蓝色转换
   - `scripts/generate-data.js`: emoji数据生成
   - `scripts/generate-png.js`: PNG多尺寸生成

### 第二阶段: 核心功能
1. **数据层实现**
   - 下载并处理OpenMoji数据
   - 生成`data/list.json`
   - 批量转换SVG为蓝色主题

2. **组件开发**
   - EmojiCard: 可复用的emoji展示组件
   - Search: 实时搜索功能
   - Related: 相关推荐算法
   - Layout: 统一页面布局

### 第三阶段: 页面实现
1. **静态页面生成**
   - 首页: emoji网格和搜索
   - 详情页: `/emoji/[slug]` 动态路由
   - 分类页: `/category/[category]` 动态路由

2. **功能页面**
   - 下载页面: 资源包下载
   - 关于页面: 项目说明
   - 法律页面: 条款和隐私政策

### 第四阶段: 优化部署
1. **性能优化**
   - 图片懒加载
   - 代码分割
   - 静态资源压缩

2. **SEO优化**
   - meta标签优化
   - 结构化数据
   - sitemap.xml生成

## 项目状态说明

### 当前状态
- **原型阶段**: 存在于`prototype/`目录的静态HTML文件
- **参考设计**: 可作为Next.js实现的UI/UX参考
- **功能验证**: Firebase评论系统已验证可行性

### 迁移到Next.js
1. 保留`prototype/`目录作为设计参考
2. 新建标准Next.js项目结构
3. 逐步实现核心功能和组件
4. 最终替换为生产版本的Next.js应用

## 开发注意事项

- **数据驱动**: 所有emoji数据来源于`data/list.json`
- **静态优先**: 使用SSG确保最佳SEO和性能
- **组件复用**: EmojiCard等组件在多个页面复用
- **版权合规**: 确保CC BY-SA 4.0协议的正确实施
- **渐进增强**: 核心功能不依赖JavaScript，搜索等作为增强功能