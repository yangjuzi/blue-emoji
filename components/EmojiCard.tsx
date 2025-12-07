import React from 'react';
import Link from 'next/link';

// 🌟 导入全局定义的 EmojiData 接口 (假设路径是 ../../types)
import { EmojiData } from '../types';

interface EmojiCardProps {
  emoji: EmojiData;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  onClick?: (emoji: EmojiData) => void;
}

const EmojiCard: React.FC<EmojiCardProps> = ({
  emoji,
  size = 'medium',
  showName = true,
  onClick
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 sm:w-10 sm:h-10 text-2xl sm:text-3xl',
    medium: 'w-12 h-12 sm:w-16 sm:h-16 text-4xl sm:text-5xl',
    large: 'w-16 h-16 sm:w-20 sm:h-20 text-5xl sm:text-6xl'
  };

  const paddingClasses = {
    small: 'p-2 sm:p-3',
    medium: 'p-3 sm:p-4',
    large: 'p-4 sm:p-6'
  };

  // 提取通用样式，用于 Link 内部的 <a> 标签 或 div
  const cardClassName = `emoji-card flex flex-col items-center ${paddingClasses[size]} bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:transform hover:-translate-y-1 cursor-pointer hover:ring-2 hover:ring-blue-400 ${
    size === 'small' ? 'max-w-[80px] sm:max-w-[100px]' : size === 'large' ? 'max-w-[140px] sm:max-w-[180px]' : 'max-w-[100px] sm:max-w-[120px]'
  }`;

  // 提取卡片核心内容，方便复用
  const cardContent = (
    <>
      <div className={`${sizeClasses[size]} flex items-center justify-center mb-2 bg-blue-100 rounded-lg transition duration-300 hover:scale-110 text-blue-600`}>
        <span className="leading-none">{emoji.emoji}</span>
      </div>
      {showName && (
        <p className="text-sm font-semibold text-gray-700 text-center truncate w-full">
          {emoji.name}
        </p>
      )}
    </>
  );

  // 🌟 修复 Type Error 的关键：使用条件渲染
  if (onClick) {
    // 情况 1: 提供了 onClick prop -> 渲染一个带点击事件的 div
    return (
      <div
        onClick={() => onClick(emoji)} 
        className={cardClassName}
      >
        {cardContent}
      </div>
    );
  } else {
    // 情况 2: 没有提供 onClick prop -> 渲染一个用于页面导航的 Next.js Link
    return (
      <Link href={`/emoji/${emoji.id}`} passHref legacyBehavior>
        {/* 使用 legacyBehavior 确保样式正确应用到 <a> 标签上 */}
        <a className={cardClassName}>
          {cardContent}
        </a>
      </Link>
    );
  }
};

export default EmojiCard;