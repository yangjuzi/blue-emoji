import React, { useState, useEffect } from 'react';
import EmojiCard from './EmojiCard';
import { EmojiData } from '../types';

interface SearchProps {
  emojis: EmojiData[];
  onSearchResults?: (results: EmojiData[]) => void;
  placeholder?: string;
  showAllOnEmpty?: boolean;
}

const Search: React.FC<SearchProps> = ({
  emojis,
  onSearchResults,
  placeholder = "Search for hearts, waves, circles, or faces...",
  showAllOnEmpty = true
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<EmojiData[]>(emojis);

  useEffect(() => {
    if (!query.trim()) {
      const newResults = showAllOnEmpty ? emojis : [];
      setResults(newResults);
      onSearchResults?.(newResults);
      return;
    }

    const searchQuery = query.toLowerCase().trim();
    const filtered = emojis.filter(emoji => {
      return (
        emoji.name.toLowerCase().includes(searchQuery) ||
        emoji.category.toLowerCase().includes(searchQuery) ||
        emoji.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery)) ||
        emoji.emoji.includes(searchQuery)
      );
    });

    setResults(filtered);
    onSearchResults?.(filtered);
  }, [query, emojis, onSearchResults, showAllOnEmpty]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in useEffect, but we can add additional search behavior here
    console.log('Searching for:', query);
  };

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
        <div className="flex rounded-xl shadow-lg border border-blue-200 overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 text-lg border-none focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition duration-150"
          >
            <i className="fas fa-search text-xl"></i>
          </button>
        </div>
      </form>

      {/* Search Results Summary */}
      {query && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-blue-600">{results.length}</span> result{results.length !== 1 ? 's' : ''} for "<span className="font-semibold">{query}</span>"
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;