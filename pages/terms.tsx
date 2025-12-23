import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const TermsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | BlueEmoji.com</title>
        <meta name="description" content="Terms of Service and usage guidelines for BlueEmoji.com and our blue emoji collection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://blue-emoji.com/terms" />
      </Head>

      <Layout title="Terms of Service" description="Terms of Service for BlueEmoji.com">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          Terms of Service
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <section className="mb-8">
            <p className="text-gray-600 mb-4">
              <strong>Last updated:</strong> December 6, 2025
            </p>
            <p className="text-gray-700 leading-relaxed">
              Welcome to BlueEmoji.com. These Terms of Service (&quot;Terms&quot;) govern your use of our website and the Blue Emoji collection. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using BlueEmoji.com, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              BlueEmoji.com provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>A curated collection of blue-themed emoji graphics</li>
              <li>Downloadable SVG and PNG emoji files</li>
              <li>Browsing and search functionality for emoji discovery</li>
              <li>Community features including comments and discussions</li>
              <li>Educational content about emoji usage and licensing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">3. License and Usage Rights</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)</h3>
              <p className="text-gray-700 mb-3">
                All Blue Emoji graphics are licensed under CC BY-SA 4.0. This means you are free to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Share</strong> — copy and redistribute the material in any medium or format</li>
                <li><strong>Adapt</strong> — remix, transform, and build upon the material for any purpose, even commercially</li>
              </ul>
              <p className="text-gray-700 mt-3 mb-3">
                Under the following terms:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made</li>
                <li><strong>ShareAlike</strong> — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The website code, design, and textual content are protected by copyright law and may not be reproduced without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">4. Proper Attribution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using Blue Emoji graphics, you must provide attribution in one of the following ways:
            </p>
            <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
              <code className="text-sm">
                Blue Emoji graphics are derivatives of OpenMoji (CC BY-SA 4.0).
              </code>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Attribution should be included in documentation, about pages, or other reasonably prominent locations where the emojis are used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">5. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Upload malicious code or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to access the service excessively</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Blue Emoji collection is based on the OpenMoji project, which is also licensed under CC BY-SA 4.0. We respect intellectual property rights and expect our users to do the same.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All trademarks, service marks, and trade names used on BlueEmoji.com are the property of their respective owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              BlueEmoji.com and the emoji files are provided &quot;as is&quot; without warranty of any kind, either express or implied. We make no warranties regarding the accuracy, reliability, completeness, or timeliness of the content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall BlueEmoji.com or its creators be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service or emoji files.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">9. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain high availability of our service, but we cannot guarantee uninterrupted access. We may temporarily suspend the service for maintenance, updates, or other technical reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:contact@blue-emoji.com" className="text-blue-600 hover:text-blue-700">contact@blue-emoji.com</a>
              </p>
              <p className="text-gray-700">
                <strong>GitHub:</strong> <a href="https://github.com/your-org/blue-emoji" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">github.com/your-org/blue-emoji</a>
              </p>
            </div>
          </section>

          <section className="p-6 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes arising from these terms will be resolved through good faith negotiations.
            </p>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default TermsPage;