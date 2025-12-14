import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Blue Emoji', description = 'Explore blue-themed emojis' }) => {
  const router = useRouter();

  const isCurrentPage = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Navigation Bar */}
      <header className="shadow-md bg-white sticky top-0 z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-blue-600 tracking-tight">
            BLUE EMOJI
          </Link>

          <nav className="hidden md:flex space-x-6 text-sm font-medium items-center">
            {/* HOME */}
            <Link
              href="/"
              className={`${isCurrentPage('/') ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'} transition`}
            >
              HOME
            </Link>

            {/* CATEGORY Dropdown */}{/*
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center py-2">
                Category <i className="fas fa-chevron-down text-xs ml-1 transition-transform group-hover:rotate-180"></i>
              </button>*/}
              {/* Dropdown Menu */}{/*
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white rounded-xl shadow-2xl z-20 overflow-hidden ring-1 ring-blue-100 transform origin-top transition duration-200">
                <Link href="/category/smileys-emotion" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Smileys Emotion</Link>
                <Link href="/category/people" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">People</Link>
                <Link href="/category/animals-nature" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Animals & Nature</Link>
                <Link href="/category/food-drink" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Food & Drink</Link>
                <Link href="/category/activities" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Activities</Link>
                <Link href="/category/travel-places" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Travel & Places</Link>
                <Link href="/category/objects" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Objects</Link>
                <Link href="/category/symbols" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Symbols</Link>
                <Link href="/category/flags" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Flags</Link>

                <div className="border-t border-gray-100"></div>
                <Link href="/category/all" className="block px-4 py-2 bg-gray-50 text-blue-600 hover:bg-blue-100 transition font-semibold">View All Categories...</Link>
              </div>
            </div>
                */}
            {/* DOWNLOAD */}
            <Link
              href="/download"
              className={`${isCurrentPage('/download') ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'} transition`}
            >
              Download
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              className={`${isCurrentPage('/about') ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'} transition`}
            >
              About
            </Link>
          </nav>

          <button className="md:hidden text-gray-600 hover:text-blue-600 p-2 rounded-lg">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-4 text-sm">
            <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link>
            <Link href="/terms" className="hover:text-blue-400 transition">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link>
          </div>
          <p className="text-sm mb-4">
            © 2025 Blue-Emoji.com. | Based on OpenMoji and released under CC BY-SA 4.0.
          </p>
          <p className="text-xs text-gray-400">
            Emoji graphics based on <a href="https://openmoji.org/" className="underline hover:text-blue-400">OpenMoji</a> – the open-source emoji library.
          </p>
          <p className="text-xs text-gray-400">
            Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline hover:text-blue-400">CC BY-SA 4.0</a>. Blue edition files are available for download.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;