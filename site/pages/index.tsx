import React from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { headerButton } from '../css/classes'
import Demo from '../components/Demo'
import PlausibleProvider from 'next-plausible'
import classNames from 'classnames'
import { BuyMeACoffee } from '../components/BuyMeACoffee'
import Emoji from '../components/Emoji'

const logo = `${process.env.NEXT_PUBLIC_URL}/logo.png`

function Home() {
  const title = 'React Guitar'
  const description = 'A beautiful and accessible guitar component for React.'
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
              alt: `Screenshot of the rendered component with an E major chord`
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
        <p className="slide-up text-lg sm:text-xl mt-2">
          {description}
          <span className="sr-only">
            Hopefully accessible enough to be usable for you.
          </span>
        </p>
        <div className="slide-up flex items-center justify-center mt-4 sm:mt-6">
          <a
            className={headerButton}
            href="https://github.com/4lejandrito/react-guitar"
            children="GitHub"
            target="_blank" // eslint-disable-line react/jsx-no-target-blank
            rel="noopener"
          />
          <a
            className={classNames(headerButton, 'hidden sm:inline-block')}
            href="storybook"
            children="Storybook"
            target="_blank"
            rel="noopener"
          />
          <BuyMeACoffee />
        </div>
      </header>

      <main className="flex-grow w-full flex flex-col items-center justify-center max-w-screen-xl sm:px-12">
        <Demo />
      </main>

      <footer className="w-full text-center bg-gray-100 text-gray-600 p-6 border-t">
        <Emoji text="Made with ❤️ and 🎶 by" />{' '}
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

export default function HomeWithPlausible() {
  return (
    <PlausibleProvider domain="react-guitar.com">
      <Home />
    </PlausibleProvider>
  )
}
