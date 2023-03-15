import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { useState, useEffect } from "react";
import Footer from '../components/Footer';
import '../styles/globals.css';
import { Average_Sans, Rock_Salt } from 'next/font/google'
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rock-salt'
})

const averageSans = Average_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-average-sans'
})

function MyApp({ Component, pageProps }: AppProps) {

  const [isMounted, setIsMounted] = useState<Boolean>(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { t } = useTranslation('common')

  return (
    <ApolloProvider client={client}>
      <div className={`${rockSalt.className} ${averageSans.className} ${rockSalt.variable} ${averageSans.variable}`}>
        <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
            `,
            }}
          />
        {isMounted && <Component {...pageProps} />}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
