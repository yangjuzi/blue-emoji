import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import EmojiCard from '../../components/EmojiCard';
import Search from '../../components/Search';
import { EmojiData, CategoryData } from '../../types';
import emojiData from '../../data/list.json';

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const router = useRouter();
  const { category } = router.query; // 这里的 category 类型是 string | string[] | undefined
  const [filteredEmojis, setFilteredEmojis] = useState<EmojiData[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryData | null>(null);

  useEffect(() => {
    if (category && emojiData.emojis) {
        // 🌟 修复 Type Error 的关键：确保 categoryId 是一个单独的字符串
        const categoryId = Array.isArray(category) ? category[0] : category; 
        
      if (categoryId === 'all') { // 使用 categoryId
        // Show all emojis
        setFilteredEmojis(emojiData.emojis);
        setCategoryInfo({
          id: 'all',
          name: 'All Categories',
          count: emojiData.emojis.length
        });
      } else {
        // Filter by category
        const categoryEmojis = emojiData.emojis.filter((emoji: EmojiData) => emoji.category === categoryId); // 使用 categoryId
        const categoryData = emojiData.categories.find((cat: CategoryData) => cat.id === categoryId); // 使用 categoryId

        setFilteredEmojis(categoryEmojis);
        setCategoryInfo(categoryData || {
          id: categoryId, // 使用 categoryId
          name: categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // 在确定的 string 上调用 split
          count: categoryEmojis.length
        });
      }
    }
  }, [category]);

  const handleEmojiClick = (emoji: EmojiData) => {
    // Navigate to emoji detail page
    router.push(`/emoji/${emoji.id}`);
  };

  const formatCategoryName = (categoryId: string) => {
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getCategoryDescription = (categoryId: string) => {
    const descriptions: { [key: string]: string } = {
      'smileys-emotion': 'Express yourself with blue-themed smiley faces and emotional expressions.',
      'people': 'Blue variations of people emojis including faces, gestures, and characters.',
      'animals-nature': 'Animals and nature emojis in calming blue tones.',
      'food-drink': 'Food and drink items with a blue color scheme.',
      'activities': 'Activities and hobbies represented in blue colors.',
      'travel-places': 'Travel and location emojis with blue themes.',
      'objects': 'Everyday objects and items in blue color variations.',
      'symbols': 'Symbols, signs, and abstract shapes in blue.',
      'flags': 'Blue-themed flag symbols and representations.',
      'all': 'Browse through our entire collection of blue emojis from all categories.'
    };

    return descriptions[categoryId] || 'Explore blue-themed emojis in this category.';
  };

  if (!category) {
    return (
      <Layout title="Loading...">
        <div className="text-center py-12">
          <p>Loading category...</p>
        </div>
      </Layout>
    );
  }

  // 在组件的其余部分，我们需要确保 category 是 string 类型
  const currentCategory = Array.isArray(category) ? category[0] : category;


  return (
    <>
      <Head>
        <title>{categoryInfo ? formatCategoryName(categoryInfo.id) : 'Category'} Blue Emojis | BlueEmoji.com</title>
        <meta name="description" content={`Explore ${categoryInfo ? formatCategoryName(categoryInfo.id) : 'blue-themed'} emojis. ${getCategoryDescription(currentCategory as string)}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout
        title={`${categoryInfo ? formatCategoryName(categoryInfo.id) : 'Category'} - Blue Emoji`}
        description={getCategoryDescription(currentCategory as string)}
      >
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium text-gray-500 mb-6">
          <Link href="/" passHref>
            <a className="hover:text-blue-600">Home</a>
          </Link>
        <span className="text-gray-900"> {categoryInfo ? formatCategoryName(categoryInfo.id) : 'Category'}</span>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {categoryInfo ? formatCategoryName(categoryInfo.id) : 'Blue Emojis'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            {getCategoryDescription(currentCategory as string)}
          </p>
          {categoryInfo && categoryInfo.id !== 'all' && (
            <div className="flex justify-center items-center text-sm text-gray-500">
              <i className="fas fa-layer-group mr-2"></i>
              <span>{categoryInfo.count} emoji{categoryInfo.count !== 1 ? 's' : ''} in this category</span>
            </div>
          )}
        </div>

        {/* Search for this category */}
        <div className="mb-8">
          <Search
            emojis={filteredEmojis}
            placeholder={`Search ${categoryInfo ? formatCategoryName(categoryInfo.id).toLowerCase() : 'emojis'}...`}
            showAllOnEmpty={true}
          />
        </div>

        {/* Category Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            {categoryInfo ? formatCategoryName(categoryInfo.id) : 'Blue Emojis'}
          </h2>

          {filteredEmojis.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
              {filteredEmojis.map((emoji) => (
                <EmojiCard
                  key={emoji.id}
                  emoji={emoji}
                  onClick={handleEmojiClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">
                No emojis found in this category
              </p>
              <p className="text-gray-400 mt-2">
                Try browsing 
                <Link href="/category/all" passHref>
                  <a className="text-blue-600 hover:text-blue-700">all categories</a>
                </Link>
                instead.
              </p>
            </div>
          )}
        </section>

        {/* Other Categories */}
        {currentCategory !== 'all' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              Browse Other Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emojiData.categories
                .filter(cat => cat.count > 0 && cat.id !== currentCategory) // 使用 currentCategory
                .slice(0, 6)
                .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  passHref
                  legacyBehavior // 修复 Next.js 警告
                >
                    <a
                        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
                    >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        {formatCategoryName(cat.id)}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {getCategoryDescription(cat.id).substring(0, 80)}...
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export default CategoryPage;