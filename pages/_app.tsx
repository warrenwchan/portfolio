import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { Provider } from '../lib/context/context'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <ThemeProvider attribute="class">
          <div className={`${inter.className} h-full`}>
            <Component {...pageProps} />
            <Analytics />
          </div>
        </ThemeProvider>
      </Provider>
    </>
  )
}
