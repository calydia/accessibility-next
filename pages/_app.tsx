import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { useState, useEffect } from "react";
import { useDarkMode } from '../components/useDarkMode'
import Link from 'next/link';
import Toggle from '../components/Toggler';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {

  const [isMounted, setIsMounted] = useState<Boolean>(false);

  const [theme, themeToggler] = useDarkMode();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ApolloProvider client={client}>
        <header className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
          dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header
        ">
          <Link href="#skip-target" id="skip" className="sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8 text-xl focus:p-4 text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white">
            Skip to content
          </Link>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <Header />
        </header>
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
    </ApolloProvider>
  );
}

export default MyApp;
