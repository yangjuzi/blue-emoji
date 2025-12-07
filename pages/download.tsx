import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import emojiData from '../data/list.json';

const DownloadPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Blue Emoji Complete Download | blue-emoji.com</title>
        <meta name="description" content="Download the complete Blue Emoji library with over 1,500 blue-themed SVG and PNG files. Perfect for designers and developers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout title="Download Blue Emoji Library" description="Complete Blue Emoji resource pack download">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Download the Complete Blue Emoji Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get access to over {emojiData.emojis.length}+ meticulously recolored vector (SVG) and raster (PNG) files. Ready for developers, designers, and creatives.
          </p>
        </header>

        <div className="space-y-12">
          {/* Download Options Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SVG Download Card */}
            <div className="p-8 bg-white rounded-xl shadow-xl border border-blue-200 flex flex-col items-center text-center">
              <i className="fas fa-file-code text-6xl text-blue-600 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Vector Files (SVG)</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Lossless, scalable vector graphics perfect for web, large prints, and app development. Easily recolor and resize without quality loss.
              </p>
              <a
                href="/downloads/blue-emoji-svg.zip"
                download
                className="inline-flex items-center justify-center w-full px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition duration-150"
              >
                <i className="fas fa-download mr-2"></i> Download SVG ZIP (~50MB)
              </a>
            </div>

            {/* PNG Download Card */}
            <div className="p-8 bg-white rounded-xl shadow-xl border border-blue-200 flex flex-col items-center text-center">
              <i className="fas fa-image text-6xl text-blue-600 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Raster Images (PNG)</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Pre-rendered images in common sizes (64x64px, 128x128px, 256x256px) with transparent backgrounds, ready for direct use.
              </p>
              <a
                href="/downloads/blue-emoji-png.zip"
                download
                className="inline-flex items-center justify-center w-full px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition duration-150"
              >
                <i className="fas fa-download mr-2"></i> Download PNG ZIP (~20MB)
              </a>
            </div>
          </section>

          {/* Usage and Licensing Section */}
          <section className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="fas fa-balance-scale text-blue-600 mr-3"></i> Licensing and Usage Rights
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              The entire Blue Emoji library is built upon the wonderful foundation of the <strong className="text-blue-600">OpenMoji</strong> project. As such, all derivative works, including this blue-colored collection, follow the same permissive open-source license.
            </p>

            {/* License Details Block */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-300">
              <h3 className="text-xl font-bold text-gray-700 mb-3">Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4">
                <li><strong className="text-green-600">Share:</strong> You are free to copy and redistribute the material in any medium or format.</li>
                <li><strong className="text-green-600">Adapt:</strong> You are free to remix, transform, and build upon the material for any purpose, even commercially.</li>
                <li><strong className="text-red-600">Attribution:</strong> You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.</li>
                <li><strong className="text-red-600">ShareAlike:</strong> If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                <i className="fas fa-link mr-1"></i> <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View the full CC BY-SA 4.0 Legal Code.</a>
              </p>
            </div>

            {/* Attribution Guidance */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Attribution Guidance</h3>
              <p className="text-gray-600 mb-4">
                When using the Blue Emoji graphics, especially for public or commercial projects, please ensure you include the following attribution in your documentation, license files, or a readily accessible &apos;About&apos; section:
              </p>
              <code className="block bg-gray-800 text-white p-4 rounded-lg text-sm overflow-x-auto select-all">
                Blue Emoji graphics are derivatives of OpenMoji (CC BY-SA 4.0).
              </code>
            </div>
          </section>

          {/* Technical Specifications Section */}
          <section className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i className="fas fa-microchip text-blue-600 mr-3"></i> Technical Specifications
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              This library is optimized for modern design and development workflows. All files are generated for maximum compatibility and performance across different platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center"><i className="fas fa-palette mr-2 text-blue-600"></i> Color Palette</h3>
                <p className="text-sm text-gray-600">The primary color used is a vibrant yet calm blue, based on the hexadecimal code: <code className="bg-gray-200 px-1 rounded">#2563eb</code> (Tailwind blue-600).</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center"><i className="fas fa-vector-square mr-2 text-blue-600"></i> SVG Format Details</h3>
                <p className="text-sm text-gray-600">SVGs are optimized for file size, minimized viewBox, and cleaned of unnecessary metadata, ensuring smooth rendering in browsers and design tools.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center"><i className="fas fa-mobile-alt mr-2 text-blue-600"></i> Compatibility</h3>
                <p className="text-sm text-gray-600">Tested and compatible with major platforms including Web (Chrome, Firefox, Safari), iOS, and Android applications.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center"><i className="fas fa-box-open mr-2 text-blue-600"></i> Package Size</h3>
                <p className="text-sm text-gray-600">The total library contains over {emojiData.emojis.length} individual emoji files, bundled into two separate, convenient ZIP archives.</p>
              </div>
            </div>
          </section>

          {/* File Structure Information */}
          <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">SVG Package Includes:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {emojiData.emojis.length} SVG files (72x72px)</li>
                  <li>• Consistent blue color scheme</li>
                  <li>• Organized by category folders</li>
                  <li>• Ready for web and print use</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">PNG Package Includes:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {emojiData.emojis.length * 3} PNG files total</li>
                  <li>• Multiple sizes: 64x64px, 128x128px, 256x256px</li>
                  <li>• Transparent backgrounds</li>
                  <li>• Organized by category and size</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default DownloadPage;