import { AppProps } from 'next/app'
import '../css/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
