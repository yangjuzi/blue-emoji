import React from 'react';
import Link from 'next/link';

// 假设您的类型定义文件位于正确的位置
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
  
  // ⬇️ 调整 1：增大 medium 尺寸，让 Emoji 看起来更大
  const sizeClasses = {
    small: 'w-10 h-10 sm:w-12 sm:h-12', 
    medium: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20', 
    large: 'w-20 h-20 sm:w-24 sm:h-24' 
  };

  const paddingClasses = {
    small: 'p-2 sm:p-3',
    medium: 'p-3 sm:p-4',
    large: 'p-4 sm:p-6'
  };
// ⬇️ 调整 2：增加卡片的 max-w，并设置最小高度 h-32 以容纳两行文本
const cardClassName = [
  'emoji-card', 
  'flex', 'flex-col', 'items-center', 
  paddingClasses[size], 
  'bg-white', 'rounded-xl', 'shadow-md', 'hover:shadow-xl', 
  'transition-all', 'duration-200', 'hover:transform', 'hover:-translate-y-1', 
  'cursor-pointer', 'hover:ring-2', 'hover:ring-blue-400', 
  'min-h-[150px]', // 确保卡片有最小高度
  size === 'small' 
    ? 'max-w-[90px] sm:max-w-[110px]' 
    : size === 'large' 
      ? 'max-w-[150px] sm:max-w-[200px]' 
      : 'max-w-[110px] sm:max-w-[140px]'
].join(' '); 
/*
 * 注意：这里我们使用 Array.join(' ') 来构建 className 字符串，
 * 这是在复杂逻辑下更健壮的做法，避免了模板字符串的解析问题。
*/
const cardContent = (
    <>
      {/* SVG 容器：使用 sizeClasses 确定尺寸 */}
      <div className={`${sizeClasses[size]} flex items-center justify-center mb-1 bg-blue-50 rounded-lg transition duration-300 hover:scale-110`}>
        {/* 关键修改：使用 img 标签加载 SVG 文件 */}
        <img 
          src={emoji.svgPath} 
          alt={emoji.name}
          className="w-full h-full object-contain" 
        />
      </div>
      
      {/* ⬇️ 调整 3：移除 truncate，允许最多两行文本显示 (line-clamp-2) */}
     {showName && (
  <p 
    className="
      text-sm font-medium text-gray-700 text-center 
      w-full
      line-clamp-2
    "
    title={emoji.name}
  >
    {emoji.name}
  </p>
)}
    </>
  );

  // 渲染逻辑保持不变（Link 或 Div）
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
      <Link href={`/emoji/${emoji.id}`} className={cardClassName}>
        {/* <Link> 唯一的子元素就是 cardContent (它是一个 React Fragment <>...</>) */}
        {cardContent} 
      </Link>
    );
  }
};

export default EmojiCard;