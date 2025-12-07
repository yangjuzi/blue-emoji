import React from 'react';
import EmojiCard from './EmojiCard';
import { EmojiData } from '../types';

interface RelatedProps {
  currentEmoji: EmojiData;
  allEmojis: EmojiData[];
  maxCount?: number;
  title?: string;
}

const Related: React.FC<RelatedProps> = ({
  currentEmoji,
  allEmojis,
  maxCount = 8,
  title = "Related Emojis"
}) => {
  // Find related emojis based on category and keywords
  const findRelatedEmojis = (emoji: EmojiData): EmojiData[] => {
    const related = allEmojis
      .filter(e => e.id !== emoji.id)
      .map(e => {
        let score = 0;

        // Same category gets highest score
        if (e.category === emoji.category) {
          score += 10;
        }

        // Matching keywords
        const commonKeywords = e.keywords.filter(keyword =>
          emoji.keywords.some(ek => ek.toLowerCase() === keyword.toLowerCase())
        );
        score += commonKeywords.length * 5;

        // Name similarity (basic)
        const nameWords = emoji.name.toLowerCase().split(' ');
        const eNameWords = e.name.toLowerCase().split(' ');
        const commonWords = nameWords.filter(word => eNameWords.includes(word));
        score += commonWords.length * 3;

        return { emoji: e, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxCount)
      .map(item => item.emoji);

    // If not enough related emojis by score, add some from same category
    if (related.length < maxCount) {
      const sameCategory = allEmojis
        .filter(e => e.category === emoji.category && e.id !== emoji.id && !related.includes(e))
        .slice(0, maxCount - related.length);

      related.push(...sameCategory);
    }

    // If still not enough, add random ones
    if (related.length < maxCount) {
      const random = allEmojis
        .filter(e => e.id !== emoji.id && !related.includes(e))
        .sort(() => 0.5 - Math.random())
        .slice(0, maxCount - related.length);

      related.push(...random);
    }

    return related.slice(0, maxCount);
  };

  const relatedEmojis = findRelatedEmojis(currentEmoji);

  if (relatedEmojis.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">
        {title}
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4">
        {relatedEmojis.map((emoji) => (
          <EmojiCard
            key={emoji.id}
            emoji={emoji}
            size="small"
          />
        ))}
      </div>
    </section>
  );
};

export default Related;