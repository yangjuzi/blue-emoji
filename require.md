Blue Emoji 网站需求文档（方案 B：静态 + 评论托管）
1. 项目简介

Blue Emoji（blue-emoji.com） 提供蓝色风格的 emoji 展示、浏览、搜索与评论功能。
网站基于 OpenMoji 重新上色为 Blue 系列，符合 CC BY-SA 4.0 共享协议。
整体结构为静态站点，配合第三方评论系统实现动态评论。

2. 技术架构
2.1 前端

Next.js 

静态产出（SSG）

TailwindCSS（快速样式）

Vercel / Cloudflare Pages 部署均可

2.2 后端

无需自建后端，使用外部托管：

功能	服务	免费	是否足够	备注
评论系统	Giscus / GitHub Issues	✔	✔	无需数据库
图片存储	GitHub / 本地静态文件	✔	✔	存放蓝色版 emoji SVG/PNG
搜索功能	客户端搜索	✔	✔	使用前端 JS 全量搜索
3. Emoji 处理方式
3.1 数据来源

OpenMoji（官方开源）

库地址：https://openmoji.org/

使用其 SVG 文件重新着色为单色蓝

3.2 再加工（变蓝）

编写批处理脚本：

替换 SVG 填充颜色 fill="xxxxxx" → #007BFF 或你指定的蓝色

输入：原始 openmoji SVG

输出：蓝色版 openmoji SVG/PNG

3.3 版权要求

网站底部注明：

Emoji graphics based on OpenMoji – the open-source emoji library.
Licensed under CC BY-SA 4.0.


蓝色版 emoji（你加工后的版本）必须提供下载（ZIP 或 GitHub）。

4. 网站功能
4.1 首页

展示所有 “Blue Emojis” 网格列表

搜索框（前端模糊搜索）

分组快捷入口（人类、动物、手势、表情、物品等）

推荐热门 emoji（可用固定列表）

4.2 Emoji 列表页（分类页）

例如：

/people
/animals
/gestures
/symbols


每个分类包含栅格式展示：

Emoji 预览

Emoji 名称

链接到单独的详情页

4.3 Emoji 详情页

每个 Emoji 一页（例如 raising hands 🙌）：

路径格式：

/emojis/raising-hands


功能包含：

4.3.1 Emoji内容展示

蓝色版 SVG（主视觉）

PNG（可选）

Emoji 名称、分类

官方 Unicode 编码

Keywords 标签（有利 SEO）

4.3.2 下载功能

下载 SVG

下载 PNG

4.3.3 评论区（托管，无后端）


评论系统使用
Giscus（推荐）	静态、无成本、SEO 友好	需要 GitHub 登录


你选择 Giscus：

每个 emoji 自动对应 GitHub issue ID

评论自动同步，无需数据库

4.4 Related Emojis（相关推荐）

根据规则自动计算：

可用算法：

相同分类

相似关键字（hands、gesture）

同风格（全部蓝色）

展示 4〜8 个相关 emoji，例如：

🙌 Raising Hands → 👍 Thumbs Up → 🫶 Heart Hands

4.5 搜索功能

前端 JS 全量搜索（0 后端）

搜索字段：

名称

Unicode 名称

category

keywords

4.6 Sitemap + SEO

自动生成：

/sitemap.xml

每个 emoji 详情页都是高价值 SEO 页面。

你的网站大约会生成：

1000+ emoji 页面

40+ 分类页面

1 个首页
全部可索引，可放广告。

5.footer
footer部分要展示About Us、Contact Us、Terms of Service、Privacy Policy
并且显示© 2025 Blue-Emoji.com. | Based on OpenMoji and released under CC BY-SA 4.0.


6. 项目目录结构（推荐）
/public/emojis/blue-svg/*.svg
/public/emojis/blue-png/*.png
/data/list.json
/pages/index.tsx
/pages/emoji/[slug].tsx
/pages/category/[category].tsx
/components/EmojiCard.tsx
/components/Search.tsx
/components/Related.tsx

7. 开源要求（CC BY-SA）

必须公开：

原版 OpenMoji 来源声明

你修改后的蓝色版 SVG（ZIP 或 GitHub）

不需要公开：

网站代码

搜索逻辑

UI



8. 开发流程

下载 OpenMoji SVG 库

批量变蓝脚本处理

生成 emoji JSON 表（名称、分类、文件路径）

Next.js 生成静态页面

为每个 slug 生成独立详情页

插入 Giscus 评论

配置 SEO + sitemap

部署到 Vercel 或 Cloudflare

9. 后续扩展功能（可选）


9.1互动功能

用户点赞、收藏、分享


Emoji Color Picker（让用户选择不同蓝色）

