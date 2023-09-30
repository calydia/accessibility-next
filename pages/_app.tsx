import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { Rock_Salt, Inter, Lato } from 'next/font/google'
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import { useClickAnyWhere } from 'usehooks-ts';

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato'
})

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rock-salt'
})

const averageSans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-average-sans'
})

function MyApp({ Component, pageProps }: AppProps) {

  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const { events } = useRouter();

  const closeMenus = () => {
    // Close all other menu levels except the current one
    const allButtons = document.getElementsByClassName('menu-button');
    if (allButtons instanceof HTMLCollection) {
      Array.from(allButtons).forEach((element: Element) => {
        element.setAttribute('aria-expanded', 'false');
      });
    }
    const langButton = document.getElementById('language-menu-button');
    (langButton as HTMLButtonElement).setAttribute('aria-expanded', 'false');
  };

  const keyHandler = (event: KeyboardEvent) => {
    if (event.code == "Escape") {
      const targetClass = (event.target as HTMLButtonElement).classList;
      const currentExpanded = (event.target as HTMLButtonElement).getAttribute('aria-expanded');

      /**
       * Main menu
       */

      // If we press esc when focused on a menu button or the toggle.
      if (targetClass.contains('menu-button') || targetClass.contains('menu-toggle') || targetClass.contains('mobile-menu-toggle')) {
        (event.target as HTMLButtonElement).setAttribute('aria-expanded', 'false');
        (event.target as HTMLButtonElement).focus();
      }

      // If esc is pressed on a menu button with aria-expanded as false, close the menu and focus the toggle.
      if (targetClass.contains('menu-button') && currentExpanded == 'false') {
        const menuToggle = document.getElementById('main-menu-toggle');
        (menuToggle as HTMLButtonElement).setAttribute('aria-expanded', 'false');
        (menuToggle as HTMLButtonElement).focus();
      }

      // If esc is pressed on a menu plus/minus button with aria-expanded as false, close the menu and focus the previous button.
      if (targetClass.contains('mobile-menu-toggle') && currentExpanded == 'false') {
        const closestMenuButton = (event.target as HTMLAnchorElement).closest('.menu-button-ul');
        if (closestMenuButton) {
          (closestMenuButton.previousSibling as HTMLButtonElement).setAttribute('aria-expanded', 'false');
          (closestMenuButton.previousSibling as HTMLButtonElement).focus();
        }
      }

      // Find closest menu button or menu toggle, close menu elements accordingly.
      if ((event.target as HTMLElement).tagName == 'A') {
        const closestMenuLevelToggle = (event.target as HTMLAnchorElement).closest('.menu-lower-level');
        const closestMenuButton = (event.target as HTMLAnchorElement).closest('.menu-button-ul');
        const closestMenuToggle = (event.target as HTMLAnchorElement).closest('#main-menu');

        if (closestMenuLevelToggle) {
          (closestMenuLevelToggle.previousSibling as HTMLButtonElement).setAttribute('aria-expanded', 'false');
          (closestMenuLevelToggle.previousSibling as HTMLButtonElement).focus();
        } else if (closestMenuButton) {
          (closestMenuButton.previousSibling as HTMLButtonElement).setAttribute('aria-expanded', 'false');
          (closestMenuButton.previousSibling as HTMLButtonElement).focus();
        } else if (closestMenuToggle) {
          const menuToggle = document.getElementById('main-menu-toggle');
          (menuToggle as HTMLButtonElement).setAttribute('aria-expanded', 'false');
          (menuToggle as HTMLButtonElement).focus();
        }
      }

      /**
       * Language switcher
       */

      // If we press esc when focused on language switcher toggle.
      if (targetClass.contains('lang-switcher')) {
        (event.target as HTMLButtonElement).setAttribute('aria-expanded', 'false');
        (event.target as HTMLButtonElement).focus();
      }

      // Close the language swicher if we press esc in a language switcher link
      if ((event.target as HTMLElement).tagName == 'A') {
        const closestMenuToggle = (event.target as HTMLAnchorElement).closest('#lang-switcher');

        if (closestMenuToggle) {
          const menuToggle = document.getElementById('language-menu-button');
          (menuToggle as HTMLButtonElement).setAttribute('aria-expanded', 'false');
          (menuToggle as HTMLButtonElement).focus();
        }
      }
    }
  }

  useClickAnyWhere(() => {
    const mainNav = document.getElementById('main-menu-nav');
    const langNav = document.getElementById('language-switcher');

    if (event !== undefined) {
      if ((event.target !== undefined)) {
        const currentTarget = (event.target as HTMLElement);
        const currentTargetSource = (event.srcElement as HTMLElement)
        // If the click happens outside of the main menu or the language menu
        if (!(mainNav as HTMLElement).contains(currentTargetSource)) {
          // Close the main menu toggle
          const mainMenuToggle = document.getElementById('main-menu-toggle');
          (mainMenuToggle as HTMLButtonElement).setAttribute('aria-expanded', 'false');

          // Close all other menu levels except the current one
          const allButtons = document.getElementsByClassName('menu-button');
          if (allButtons instanceof HTMLCollection) {
            Array.from(allButtons).forEach((element: Element) => {
              if (element !== (currentTarget as HTMLElement)) {
                element.setAttribute('aria-expanded', 'false')
              }
            });
          }
        }
        if (!(langNav as HTMLElement).contains(currentTargetSource)) {
          const langMenuToggle = document.getElementById('language-menu-button');
          (langMenuToggle as HTMLButtonElement).setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('keyup', e => {
      keyHandler(e);
    } );
    events.on('routeChangeStart', closeMenus);
    return () => {
      window.removeEventListener('keyup', e => {
        keyHandler(e);
      } );
      events.off('routeChangeStart', closeMenus);
    };
  }, [])

  const { t } = useTranslation('common')

  return (
    <ApolloProvider client={client}>
      <div className={`${rockSalt.className} ${averageSans.className} ${lato.className} ${rockSalt.variable} ${averageSans.variable} ${lato.variable}`}>
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
      </div>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
