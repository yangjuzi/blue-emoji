import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import EmojiCard from '../components/EmojiCard';
import Search from '../components/Search';
import { EmojiData } from '../types';
import emojiData from '../data/list.json';

interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = () => {
  const [searchResults, setSearchResults] = useState<EmojiData[]>(emojiData.emojis);
  const [showMessage, setShowMessage] = useState(false);

  // Show welcome message when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 定义 6 个固定的 emoji 链接
  const fixedEmojiLinks = [
    // 假设您想链接到这些 emoji 的详情页 (请根据您实际的 emoji ID/slug 修改 id)
    { name: 'Grinning Face', id: 'grinning-face' },
    { name: 'Tears of Joy', id: 'face-with-tears-of-joy' },
    { name: 'Heart with Arrow', id: 'heart-with-arrow' },
    { name: 'Star Struck', id: 'star-struck' },
    { name: 'Kiss Mark', id: 'kiss-mark' },
    { name: 'Two Hearts', id: 'two-hearts' },
  ];

  return (
    <>
      <Head>
        <title>Blue-Emoji.com - Explore Blue Emojis,smileys emotion blue emoji</title>
        <meta name="description" content="The definitive library of open-source emojis, colored for calm, loyalty, and serenity." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://blue-emoji.com/" />

        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout title="Blue Emoji" description="Explore blue-themed emojis">
        {/* Welcome Message */}
        {showMessage && (
          <div
            id="messageBox"
            className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 show"
          >
            Welcome to Blue Emoji! Explore our collection of blue-themed emojis.
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            <span className="text-blue-600">Blue-</span>Emoji.com
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            The definitive library of open-source emojis, colored for calm, loyalty, and serenity.
          </p>

          {/* Search Component */}
          <Search
            emojis={emojiData.emojis}
            onSearchResults={setSearchResults}
          />
        </div>

        {/* Quick Categories Links */}{/*注释首页搜索框下的类别快速跳转
        <section className="mb-12 border-b border-gray-200 pb-6">
          <h2 className="sr-only">Quick Categories</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
            {emojiData.categories.filter(cat => cat.count > 0).map((category) => (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="category-link"
              >
                {category.name}
              </a>
            ))}
          </div>
        </section>
          */}
        {/* 🎯 替换后的固定 Emoji 详情链接 (原 Quick Categories Links) 🎯 */}
        <section className="mb-12 border-b border-gray-200 pb-6">
          <h2 className="sr-only">Quick Emoji Details Links</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
            {fixedEmojiLinks.map((emoji) => (
              <a
                key={emoji.id}
                href={`/emoji/${emoji.id}`} // *** 路径修改为 /emoji/id ***
                className="category-link" // 保持原有样式，让它看起来像按钮
              >
                {emoji.name}
              </a>
            ))}
          </div>
        </section>

        {/* Featured/All Emojis Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
            <i className="fas fa-star text-yellow-500 mr-3"></i> All Blue Emojis
          </h2>

          {/* Emoji Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-3 sm:gap-4">
              {searchResults.map((emoji) => (
                <EmojiCard
                  key={emoji.id}
                  emoji={emoji}
                //onClick={handleEmojiClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">No emojis found matching your search.</p>
              <p className="text-gray-400 mt-2">Try searching for different keywords or browse our categories.</p>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
};

export default HomePage;