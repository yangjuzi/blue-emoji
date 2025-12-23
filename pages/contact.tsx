import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us | BlueEmoji.com</title>
        <meta name="description" content="Get in touch with the Blue Emoji team. We'd love to hear your feedback, suggestions, or questions about our blue emoji collection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://blue-emoji.com/contact" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </Head>

      <Layout title="Contact Us" description="Get in touch with the Blue Emoji team">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          Contact Us
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We&apos;d love to hear from you! Whether you have feedback about our blue emoji collection, suggestions for improvement, or questions about licensing and usage, feel free to reach out.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl">
                  <i className="fab fa-github"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">GitHub</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Report issues, request features, or contribute to the project.
                  </p>
                  <a href="https://github.com/your-org/blue-emoji" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View on GitHub →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    For general inquiries, partnership opportunities, or licensing questions.
                  </p>
                  <a href="mailto:contact@blue-emoji.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    contact@blue-emoji.com →
                  </a>
                </div>
              </div>

              {/* Twitter */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl">
                  <i className="fab fa-twitter"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Twitter</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Follow us for updates, new emoji releases, and project news.
                  </p>
                  <a href="https://twitter.com/blueemoji" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    @blueemoji →
                  </a>
                </div>
              </div>

              {/* Community */}
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Community</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Join discussions and share your creations using our blue emojis.
                  </p>
                  <a href="https://github.com/your-org/blue-emoji/discussions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Join Discussion →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Can I use Blue Emoji in commercial projects?</h3>
                <p className="text-gray-600">
                  Yes! Blue Emoji is licensed under CC BY-SA 4.0, which allows commercial use. You just need to provide attribution and share any derivative works under the same license.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">How do I contribute to the project?</h3>
                <p className="text-gray-600">
                  We welcome contributions! You can report bugs, suggest new features, or submit pull requests on our GitHub repository. Check our contribution guidelines for more details.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Can I request a specific emoji?</h3>
                <p className="text-gray-600">
                  Absolutely! Use our GitHub Issues to request specific emojis or variations. We review all requests and prioritize based on community feedback.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Are there different shades of blue available?</h3>
                <p className="text-gray-600">
                  Currently, we use a consistent blue theme (#2563eb) across all emojis. However, We&apos;re exploring options for different blue variations in future releases based on community demand.
                </p>
              </div>
            </div>
          </section>

          {/* Response Time */}
          <section className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Response Times</h3>
            <p className="text-blue-800 text-sm">
              We typically respond to emails within 2-3 business days. GitHub issues and discussions are usually addressed within 24-48 hours. For urgent matters, please include [URGENT] in your email subject line.
            </p>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default ContactPage;