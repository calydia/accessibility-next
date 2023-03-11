import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name='theme-color' content='#18399A' />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel='icon' sizes='192x192' href='/favicons/android-chrome-192x192.png' />
        <link rel='icon' type='image/png' sizes='384x384' href='/favicons/android-chrome-384x384.png' />
        <link rel='icon' type='image/png' sizes='512x512' href='/favicons/icon-512x512.png' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
