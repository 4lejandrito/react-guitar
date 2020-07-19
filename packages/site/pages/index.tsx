import Head from 'next/head'
import Demo from '../components/Demo'
import { NextSeo } from 'next-seo'

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
          site_name: '4lejandrito.github.io/react-guitar'
        }}
      />

      <header className="shadow-inner w-full text-center flex flex-col items-center bg-blue-500 text-white p-6 sm:p-8">
        <h1 className="text-3xl sm:text-5xl font-bold flex items-center">
          <img className="h-6 w-6 sm:h-10 sm:w-10 mr-2 sm:mr-3" src={logo} />{' '}
          {title}
        </h1>
        <p className="text-lg sm:text-xl mt-2">{description}</p>
        <div className="flex items-center justify-center mt-4 sm:mt-6">
          <a
            href="https://github.com/4lejandrito/react-guitar"
            className="mx-2 border-2 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
          >
            View on GitHub
          </a>
          <a
            href="storybook"
            className="mx-2 border-2 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
          >
            Storybook
          </a>
        </div>
      </header>

      <main className="flex-grow w-full flex flex-col justify-center max-w-screen-md">
        <Demo />
      </main>

      <footer className="w-full text-center bg-gray-100 text-gray-600 p-8 border-t">
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
