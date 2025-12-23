import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Related from '../../components/Related'
import Giscus from '@giscus/react'
import emojiData from '../../data/list.json'
import { EmojiData } from '../../types'


interface EmojiDetailPageProps {
  emoji: EmojiData
}

/**
 * ✅ 1. 构建期生成所有 /emoji/[slug] 页面
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = emojiData.emojis.map((emoji) => ({
    params: { slug: emoji.id },
  }))

  return {
    paths,
    fallback: false, // SEO & 稳定性最佳
  }
}

/**
 * ✅ 2. 构建期为每个 slug 注入 emoji 数据
 */
export const getStaticProps: GetStaticProps<EmojiDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const emoji = emojiData.emojis.find((e) => e.id === slug)

  if (!emoji) {
    return { notFound: true }
  }

  return {
    props: {
      emoji,
    },
  }
}

/**
 * ✅ 3. 页面组件（纯展示，无 useRouter / useEffect）
 */
export default function EmojiDetailPage({ emoji }: EmojiDetailPageProps) {
  const copyUnicode = () => {
    navigator.clipboard.writeText(emoji.unicode)
    alert('Unicode Copied!')
  }

  const copyHTML = () => {
    const html = `<img src=\"${emoji.svgPath}\" alt=\"${emoji.name} Blue Emoji\" width=\"48\" height=\"48\" />`
    navigator.clipboard.writeText(html)
    alert('HTML Code Copied!')
  }

  return (
    <>
      <Head>
        <title>{emoji.name} Emoji | Blue-Emoji.com</title>
        <meta
          name="description"
          content={emoji.description || `Learn more about the ${emoji.name} blue emoji.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={`https://blue-emoji.com/emoji/${emoji.id}`}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </Head>

      <Layout title={`${emoji.name} - Blue Emoji`}>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${emoji.category}`}
            className="hover:text-blue-600 capitalize"
          >
            {emoji.category.replace(/-/g, ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{emoji.name}</span>
        </nav>

        {/* Main Card */}
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 md:p-10 rounded-xl shadow-xl border">
          {/* Emoji Preview */}
          <div className="md:w-1/3 flex items-center justify-center bg-blue-50 rounded-lg p-8">
            <img
              src={emoji.svgPath}
              alt={`${emoji.name} Blue Emoji`}
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-extrabold mb-2">{emoji.name}</h1>
            <p className="text-blue-500 text-lg font-semibold mb-6">
              The {emoji.name} Emoji
            </p>

            {emoji.description && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="font-bold text-blue-800 mb-1">Meaning</h2>
                <p>{emoji.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Unicode</span>
                <code className="bg-gray-200 px-2 py-1 rounded">{emoji.unicode}</code>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Keywords</span>
                <span className="text-sm">{emoji.keywords.join(', ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={copyUnicode}
                className="bg-blue-600 text-white py-3 rounded-lg font-bold"
              >
                <i className="fas fa-copy mr-2" /> Copy Unicode
              </button>
              <button
                onClick={copyHTML}
                className="bg-blue-500 text-white py-3 rounded-lg font-bold"
              >
                <i className="fas fa-code mr-2" /> Copy HTML
              </button>
            </div>

            {/* Downloads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={emoji.pngPath}
                download
                className="bg-gray-700 text-white py-3 rounded-lg text-center font-bold"
              >
                Download PNG
              </a>
              <a
                href={emoji.svgPath}
                download
                className="bg-gray-200 text-gray-800 py-3 rounded-lg text-center font-bold"
              >
                Download SVG
              </a>
            </div>
          </div>
        </div>

        {/* Comments */}
        <section className="mt-12 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Community Comments</h2>
          <Giscus
            repo="yangjuzi/blue-emoji"
            repoId="R_kgDOQhFI6g"
            category="General"
            categoryId="DIC_kwDOQhFI6s4CztL7"
            mapping="specific"
            term={emoji.id}
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            lang="en"
            loading="lazy"
          />
        </section>

        {/* Related */}
        <Related
          currentEmoji={emoji}
          allEmojis={emojiData.emojis}
          title="Related Emojis"
        />
      </Layout>
    </>
  )
}
