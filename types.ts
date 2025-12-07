export interface EmojiData {
  id: string;
  name: string;
  category: string;
  unicode: string;
  emoji: string;
  keywords: string[];
  description?: string;
  svgPath?: string;
  pngPath?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  count: number;
}

export interface EmojiListData {
  emojis: EmojiData[];
  categories: CategoryData[];
}