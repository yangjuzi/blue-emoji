import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | BlueEmoji.com</title>
        <meta name="description" content="Privacy Policy for BlueEmoji.com - How we collect, use, and protect your information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://blue-emoji.com/privacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title="Privacy Policy" description="Privacy Policy for BlueEmoji.com">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          Privacy Policy
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <section className="mb-8">
            <p className="text-gray-600 mb-4">
              <strong>Last updated:</strong> December 6, 2025
            </p>
            <p className="text-gray-700 leading-relaxed">
              At BlueEmoji.com, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li><strong>Comments and Feedback:</strong> When you leave comments on emoji pages using our commenting system (Giscus)</li>
              <li><strong>Contact Form:</strong> When you reach out to us via our contact form or email</li>
              <li><strong>GitHub Contributions:</strong> When you contribute to our project through GitHub</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Usage Analytics:</strong> Anonymous website usage data and statistics</li>
              <li><strong>Server Logs:</strong> Technical information about your visit (IP address, browser type, access times)</li>
              <li><strong>Performance Data:</strong> Information about how our website performs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our website</li>
              <li><strong>Communication:</strong> To respond to your inquiries and feedback</li>
              <li><strong>Community Features:</strong> To enable commenting and discussion functionality</li>
              <li><strong>Technical Support:</strong> To troubleshoot technical issues and maintain service quality</li>
              <li><strong>Security:</strong> To protect our website and users from fraudulent activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">3. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website integrates with the following third-party services:
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Giscus (Comment System)</h3>
              <p className="text-gray-700">
                Our commenting functionality is powered by Giscus, which is based on GitHub Issues. When you leave comments, you are interacting with GitHub&apos;s services and are subject to GitHub&apos;s Privacy Policy. We do not have access to your GitHub account information beyond what is publicly visible in comments.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Vercel (Hosting)</h3>
              <p className="text-gray-700">
                Our website is hosted on Vercel, which may collect technical data for service delivery. Review Vercel&apos;s Privacy Policy for more information.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how our website performs</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">5. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting on this page. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:privacy@blue-emoji.com" className="text-blue-600 hover:text-blue-700">privacy@blue-emoji.com</a>
              </p>
              <p className="text-gray-700">
                <strong>GitHub:</strong> <a href="https://github.com/your-org/blue-emoji" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">github.com/your-org/blue-emoji</a>
              </p>
            </div>
          </section>

          <section className="p-6 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Our Commitment</h3>
            <p className="text-blue-800 text-sm">
              We are committed to protecting your privacy and transparency in our data practices. This Privacy Policy is designed to help you understand how we handle your information and make informed decisions about using our service.
            </p>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPage;