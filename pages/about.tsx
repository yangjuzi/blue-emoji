import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Blue Emoji | blue-emoji.com</title>
        <meta name="description" content="Learn about Blue Emoji project philosophy, use cases, and our commitment to open source." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout title="About Blue Emoji" description="Learn about the Blue Emoji project">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          About Blue Emoji
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Project Philosophy</h2>
            <p className="text-gray-700 leading-relaxed">
              Blue Emoji was born from a need for simple and unique design. In digital and print design, a set of monochrome emojis with a unified style is often required to match specific brand colors or interface themes. We chose the color blue (#007BFF) because it symbolizes calmness, technology, and trust, aligning perfectly with many UI/UX design principles. This unified approach eliminates visual noise, making the icons suitable for professional and minimalist contexts.
            </p>
          </section>

          {/* Key Use Cases */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Key Use Cases</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Blue Emoji set is designed for versatility in various professional and creative contexts where full-color emojis may feel distracting or inappropriate. They serve as ideal, expressive icons for several fields:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 pl-4">
              <li>
                <strong>UI/UX Design:</strong> Perfect for iconography in dark mode interfaces or to maintain a clean, monochromatic application theme. Their simplified palette reduces visual fatigue.
              </li>
              <li>
                <strong>Data Visualization:</strong> Ideal for charts and graphs to represent emotional tone or categories without introducing competing colors, ensuring data readability remains paramount.
              </li>
              <li>
                <strong>Technical Documentation:</strong> Excellent for adding quick visual markers to code documentation, READMEs, or user guides for better navigation and emphasis.
              </li>
              <li>
                <strong>Print and Merchandise:</strong> Since the color is unified, they translate cleanly and cost-effectively to print materials, packaging, and merchandise design.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Data Source and Technology</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                <strong>Data Foundation:</strong> All of our emoji graphics are based on the <a href="https://openmoji.org/" className="text-blue-600 hover:underline font-medium">OpenMoji</a> library. OpenMoji is a high-quality, open-source emoji project that provided us with a solid starting point.
              </li>
              <li>
                <strong>Redesign Process:</strong> We used custom scripts to batch process the original OpenMoji SVG files, replacing the main color fills with a unified blue tone, ensuring style consistency across the entire set.
              </li>
              <li>
                <strong>Technical Architecture:</strong> The website utilizes modern static site generation (SSG) techniques with Next.js, combined with Tailwind CSS, resulting in extremely fast loading speeds and excellent mobile responsiveness. The commenting feature is hosted by Giscus (based on GitHub Issues), ensuring a lightweight and highly available solution.
              </li>
            </ul>
          </section>

          {/* Future Direction and Community */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Future Direction and Community</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are continuously working to improve and expand the Blue Emoji collection. Our goals are to maintain the highest standard of quality and utility for designers and developers worldwide.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 pl-4">
              <li>
                <strong>Roadmap:</strong> We plan to introduce new, efficient file formats, such as web fonts, and regularly update the collection to align with the latest Unicode standards and include newly released emojis.
              </li>
              <li>
                <strong>Community Feedback:</strong> We strongly encourage users to contribute feedback, report issues, or suggest new monochrome concepts through our official GitHub repository. Your input helps shape the future of this project.
              </li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Licensing (CC BY-SA 4.0)</h2>
            <p className="text-blue-800 leading-relaxed">
              We are committed to the spirit of open source. Therefore, Blue Emoji and its foundational graphics are released under the
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-blue-600 hover:underline font-semibold"> Creative Commons Attribution-ShareAlike 4.0 International</a> license.
            </p>
            <p className="text-blue-800 mt-2">
              This means you are free to: <strong>use, share, and modify</strong> our Blue Emojis, but you must: <strong>credit the original authors (OpenMoji) and our modification, and release your contributions under the same CC BY-SA 4.0 license.</strong>
            </p>
            <a href="/download" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold transition">
              <i className="fas fa-hand-point-right mr-1"></i> Go to Download Full Resource Pack
            </a>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;