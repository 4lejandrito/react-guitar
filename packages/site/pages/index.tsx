import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Button from '../components/Button'
import Demo from '../components/Demo'

const logo = `${process.env.NEXT_PUBLIC_URL}/logo.png`

export default function Home() {
  const title = 'React Guitar'
  const description = 'A beautiful and flexible guitar component for React.'
  return (
    <div className="text-gray-800 font-sans min-h-screen flex flex-col items-center justify-center m-auto">
      <Head>
        <link rel="icon" href={logo} />
      </Head>

      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: process.env.NEXT_PUBLIC_URL,
          title,
          description,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/social.png`,
              alt: `${title} - ${description}`
            }
          ],
          site_name: 'react-guitar.com'
        }}
        twitter={{
          handle: '@4lejandrito',
          cardType: 'summary_large_image'
        }}
      />

      <header className="shadow-inner w-full text-center flex flex-col items-center bg-blue-500 text-white p-6 sm:p-8">
        <h1 className="slide-up text-3xl sm:text-5xl font-bold flex items-center">
          <img
            className="h-6 w-6 sm:h-10 sm:w-10 mr-2 sm:mr-3"
            alt="React Guitar logo"
            src={logo}
          />{' '}
          {title}
        </h1>
        <p className="slide-up text-lg sm:text-xl mt-2">{description}</p>
        <div className="slide-up flex items-center justify-center mt-4 sm:mt-6">
          <Button
            href="https://github.com/4lejandrito/react-guitar"
            label="View on GitHub"
          />
          <Button href="storybook" label="Storybook" target="_blank" />
        </div>
      </header>

      <main className="flex-grow w-full flex flex-col items-center justify-center max-w-screen-xl sm:px-12">
        <Demo />
      </main>

      <footer className="w-full text-center bg-gray-100 text-gray-600 p-6 border-t">
        Made with ❤️ and 🎶 by{' '}
        <a
          className="hover:underline text-blue-500"
          href="https://github.com/4lejandrito"
        >
          4lejandrito
        </a>
      </footer>
    </div>
  )
}
