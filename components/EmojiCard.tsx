import React from 'react';
import Link from 'next/link';

interface EmojiData {
  id: string;
  name: string;
  emoji: string;
  category: string;
  keywords: string[];
  description?: string;
}

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

  const CardWrapper = onClick ? 'div' : Link;
  const cardProps = onClick
    ? { onClick: () => onClick(emoji) }
    : { href: `/emoji/${emoji.id}` };

  return (
    <CardWrapper
      {...cardProps}
      className={`emoji-card flex flex-col items-center ${paddingClasses[size]} bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:transform hover:-translate-y-1 cursor-pointer hover:ring-2 hover:ring-blue-400 ${
        size === 'small' ? 'max-w-[80px] sm:max-w-[100px]' : size === 'large' ? 'max-w-[140px] sm:max-w-[180px]' : 'max-w-[100px] sm:max-w-[120px]'
      }`}
    >
      <div className={`${sizeClasses[size]} flex items-center justify-center mb-2 bg-blue-100 rounded-lg transition duration-300 hover:scale-110 text-blue-600`}>
        <span className="leading-none">{emoji.emoji}</span>
      </div>
      {showName && (
        <p className="text-sm font-semibold text-gray-700 text-center truncate w-full">
          {emoji.name}
        </p>
      )}
    </CardWrapper>
  );
};

export default EmojiCard;