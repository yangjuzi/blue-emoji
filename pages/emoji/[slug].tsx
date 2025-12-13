import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import EmojiCard from '../../components/EmojiCard';
import Related from '../../components/Related';
import Giscus from '@giscus/react';
import { EmojiData } from '../../types';
import emojiData from '../../data/list.json';


interface EmojiDetailPageProps { }

const EmojiDetailPage: React.FC<EmojiDetailPageProps> = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [emoji, setEmoji] = useState<EmojiData | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // 关键修改 1: 使用 router.isReady 确保路由参数已加载
  useEffect(() => {
    // 只有当路由参数准备就绪 (router.isReady) 且 slug 存在时才进行查找
    if (router.isReady && slug && emojiData.emojis && !Array.isArray(slug)) {
      console.log('--- Debugging Detail Page ---');
      console.log('1. Current Slug (URL Parameter):', slug);

      // 尝试查找 (使用您的 e.id === slug 逻辑)
      const foundEmoji = emojiData.emojis.find((e: EmojiData) => e.id === slug);

      setEmoji(foundEmoji || null);
      console.log('3. Emoji Found Status:', !!foundEmoji);
    }
  }, [router.isReady, slug]); // 依赖项中添加 router.isReady

  const showMessageNotification = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setShowMessage(true);
    // In a real app, you'd have a more sophisticated notification system
    alert(text);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const copyUnicode = () => {
    if (emoji) {
      navigator.clipboard.writeText(emoji.unicode);
      showMessageNotification('Unicode Copied!');
    }
  };

  const copyHTML = () => {
    if (emoji) {
      const html = `<img src="${window.location.origin}${emoji.svgPath}" alt="${emoji.name} Blue Emoji" width="48" height="48" />`;
      navigator.clipboard.writeText(html);
      showMessageNotification('HTML Code Copied!');
    }
  };

  // 关键修改 2: 在路由参数未就绪时，显示明确的加载状态
  if (!router.isReady) {
    return (
      <Layout title="Loading...">
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-spinner fa-spin mr-2"></i> Loading Emoji Details...
        </div>
      </Layout>
    );
  }

  // slug 存在，但数据查找结果为 null (找不到)
  if (!emoji) {
    return (
      <Layout title="Emoji Not Found">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Emoji Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find the emoji you&apos;re looking for: {slug}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title> {emoji.name} Details | blue-emoji.com</title>
        <meta name="description" content={emoji.description || `Learn more about the ${emoji.name} emoji (${emoji.unicode})`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={emoji.pngPath} type="image/png" sizes="64x64" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout title={`${emoji.name} - Blue Emoji`}>
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-1">/</span> {/* 使用 span 替换 / 以防止误解 */}
          <a href={`/category/${emoji.category}`} className="hover:text-blue-600"> {emoji.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</a> /
          <span className="text-gray-900">{emoji.name}</span>
        </nav>

        {/* Detail Section Layout */}
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 md:p-10 rounded-xl shadow-xl border border-blue-100">

          {/* Left Column: Emoji Display */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 bg-blue-50 rounded-lg">
            <div className="text-[120px] md:text-[180px] leading-none text-blue-600 transition duration-500 hover:scale-105" aria-label={`${emoji.name} Emoji`}>
              <img
                src={emoji.svgPath}
                alt={`${emoji.name} Blue Emoji`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Column: Info and Actions */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
              {emoji.name}
            </h1>
            <p className="text-xl text-blue-500 mb-6 font-semibold">
              The {emoji.name} Emoji
            </p>

            {/* Emoji Meaning/Description */}
            {emoji.description && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Meaning</h3>
                <p className="text-gray-800">
                  {emoji.description}
                </p>
              </div>
            )}

            {/* Key Details Table */}
            <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Category</span>
                <a href={`/category/${emoji.category}`} className="text-blue-600 font-semibold hover:underline capitalize">
                  {emoji.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium text-gray-700">Unicode</span>
                <code className="text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm select-all">
                  {emoji.unicode}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Keywords</span>
                <span className="text-gray-800 text-sm">
                  {emoji.keywords.join(', ')}
                </span>
              </div>
            </div>

            {/* Action Buttons: Copy & Download */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-700 mb-2">Copy & Download</h2>

              {/* Copy Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={copyUnicode}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center"
                >
                  <i className="fas fa-copy mr-2"></i> Copy Unicode ({emoji.unicode})
                </button>
                <button
                  onClick={copyHTML}
                  className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-150 flex items-center justify-center"
                >
                  <i className="fas fa-code mr-2"></i> Copy HTML Code
                </button>
              </div>

              {/* Download Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={emoji.pngPath || '#'}
                  download={`${emoji.id}.png`}
                  className="w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-lg shadow-md hover:bg-gray-800 transition duration-150 flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i> Download PNG (64px)
                </a>
                <a
                  href={emoji.svgPath || '#'}
                  download
                  className="w-full py-3 px-4 bg-gray-200 text-gray-800 font-bold rounded-lg shadow-md hover:bg-gray-300 transition duration-150 flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i> Download SVG
                </a>
              </div>

              {/* Usage/License Note */}
              <p className="text-xs text-gray-500 pt-4 border-t mt-4">
                <i className="fas fa-info-circle mr-1"></i> You are free to use this emoji. All Blue Emojis are licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline hover:text-blue-600">CC BY-SA 4.0</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mt-12 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">Community Comments</h2>

          {/* Giscus Comments */}
          <Giscus
            repo="yangjuzi/blue-emoji"  // Replace with actual repo
            repoId="R_kgDOQhFI6g"       // Replace with actual repo ID
            category="General"
            categoryId="DIC_kwDOQhFI6s4CztL7"  // Replace with actual category ID
            mapping="pathname"
            term={router.asPath.split('?')[0]}
            theme="preferred_color_scheme"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            lang="en"
            loading="lazy"
          />
        </section>

        {/* Related Emojis Section */}
        <Related
          currentEmoji={emoji}
          allEmojis={emojiData.emojis}
          title="Related Emojis"
        />
      </Layout>
    </>
  );
};

export default EmojiDetailPage;