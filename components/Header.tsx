import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { HiMenu, HiChevronDown, HiX, HiPlus, HiMinus } from "react-icons/hi";
import MenuIcon from './MenuIcon';
import { MainMenuData, MainMenuItem } from '@/interfaces/menuInterfaces';

const Header = ({data}: MainMenuData) => {
  const { asPath } = useRouter();

  const { t } = useTranslation('common')
  const ariaLabel = t('main-menu-aria');
  const menuButton = t('menu-button');
  const nextLevel = t('menu-button-next-level');
  const siteName = t('site-name');
  const siteSlogan = t('site-slogan');

  const menuToggleClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle aria-expanded
    const current = event.currentTarget;
    const currentExpanded = current.getAttribute('aria-expanded');
    (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');

    // Set mobile menu lower level toggles to expanded false.
    const allLowerButtons = document.getElementsByClassName('mobile-menu-toggle');
    if (allLowerButtons instanceof HTMLCollection) {
      Array.from(allLowerButtons).forEach((element: Element) => {
        element.setAttribute('aria-expanded', 'false')
      });
    }
  }

  const buttonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle aria-expanded
    const current = event.currentTarget;
    const currentExpanded = current.getAttribute('aria-expanded');
    (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');

    // Close all other menu levels except the current one
    const allButtons = document.getElementsByClassName('menu-button');
    if (allButtons instanceof HTMLCollection) {
      Array.from(allButtons).forEach((element: Element) => {
        if (element !== current) {
          element.setAttribute('aria-expanded', 'false')
        }
      });
    }
  }

  const buttonLowerToggleHandler = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle aria-expanded
    const current = event.currentTarget;
    const currentExpanded = current.getAttribute('aria-expanded');
    (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');
  }

  return (
      <div className="text-center pb-8 clear-both lg:clear:none">
        <div>
          <Link href="/" className="inline-block border-y-4 border-transparent p-4
            hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
            focus:outline focus:outline-2 focus:outline-offset-4 	focus:outline-black dark:focus:outline-white">
            <span className="block text-2xl font-title text-black dark:text-white dark:text-shadow-text">Sanna Mäkinen <span className="text-blue-tory dark:text-lt-perfume">-</span> {siteName}</span>
            <span className="block text-lg mt-2 font-title leading-none text-blue-tory dark:text-lt-perfume dark:text-shadow-text">{siteSlogan}</span>
          </Link>
        </div>
        <nav id="main-menu-nav" aria-labelledby="main-menu-label" className="text-black dark:text-white">
          <span id="main-menu-label" className="sr-only" key="first-heading">{ariaLabel}</span>
          <button id="main-menu-toggle" className="menu-toggle flex items-center gap-2 mt-2 mx-auto text-black border-y-4 border-transparent dark:text-white lg:hidden lg:invisible
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 	focus:outline-black dark:focus:outline-white"
            aria-expanded="false" aria-controls="main-menu" aria-haspopup="true" onClick={menuToggleClickHandler}>
            <HiMenu className="menu-open h-11 w-11" aria-hidden="true" />
            <HiX className="menu-close h-11 w-11" aria-hidden="true" />
            <span>{menuButton}</span>
          </button>
          <ul id="main-menu" key="first-ul" className="text-left mx-auto lg:visible lg:flex lg:flex-wrap lg:justify-center mt-4 p-0 mb-0
            max-lg:absolute max-lg:z-20 lg:w-[80%] max-lg:mx-auto max-lg:left-0 max-lg:right-0 max-lg:p-4 max-lg:border-2 max-lg:border-solid max-lg:border-black max-lg:dark:border-white max-lg:bg-lt-code-bg max-lg:dark:bg-dk-code-bg"
          >
            {data && data.renderNavigation.map((menuItem: MainMenuItem, index: number) => {
              const ariaCurrentPath = (asPath.includes(menuItem.path) && menuItem.path !== '/') ? true : undefined;

              return (
                <Fragment key={`fragment-${index}`}>
                  {menuItem.type == 'WRAPPER' &&
                    // We know the first level items are only wrappers
                    <li key={`menuItem-${index}`} className="m-2 static">
                      <button id={`button-${index}`} key={`button-${index}`} aria-current={ariaCurrentPath} aria-expanded="false" aria-controls={`menu-button-${index}`} aria-haspopup="true" onClick={buttonClickHandler}
                        className={`menu-button flex items-center text-left gap-2 text-black dark:text-white text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`}>
                        {menuItem.title}
                        <HiChevronDown className="menu-button--icon h-6 w-6" />
                      </button>
                      {menuItem.items &&
                        <ul id={`menu-button-${index}`} key={`menu-button-${index}`}
                          className="menu-button-ul ml-2 lg:absolute lg:mt-2 lg:z-20 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-8 lg:w-[80%] lg:max-w-screen-menu lg:mx-auto lg:left-0 lg:right-0 lg:p-4 lg:border-2 lg:border-solid lg:border-black lg:dark:border-white lg:bg-lt-code-bg lg:dark:bg-dk-code-bg">
                          {menuItem.items && menuItem.items.map((subMenuItem: MainMenuItem, subIndex: number) => {
                            const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                            const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;
                            const titleModified = subMenuItem.title.replace(/\s+/g, '-').toLowerCase();
                            return(
                              <Fragment key={`fragment-sub-${subIndex}`}>
                                {subMenuItem.type == 'WRAPPER'
                                // The second level items will be either wrappers or links
                                ? <li key={`subMenuItem-${subIndex}`} className="relative">
                                    <span key={`subMenuItem-heading-${subIndex}`} id={`subMenuItem-heading-${subIndex}-${subMenuItem.title.toLowerCase().replaceAll(' ', '-')}`}
                                      className={`sub-header flex gap-2 items-center text-xl p-1 mt-0 text-black dark:text-white ${subMenuItem.iconClass} max-lg:mt-3 max-lg:mb-2`}>
                                      <MenuIcon iconClass={subMenuItem.iconClass} iconPosition="header" />
                                      <span className="main-menu-heading first-letter:capitalize">{subMenuItem.title}</span>
                                    </span>
                                    <button aria-expanded="true" className="mobile-menu-toggle absolute right-0 top-0 h-6 w-6 flex items-center justify-center md:top-1" aria-controls={`menu-button-lower-${subIndex}-${titleModified}`} onClick={buttonLowerToggleHandler}>
                                      <HiPlus className="h-6 w-6 icon--plus md:h-4 md:w-4" />
                                      <HiMinus className="h-6 w-6 icon--minus md:h-4 md:w-4" />
                                      <span className="sr-only">{nextLevel}</span>
                                    </button>
                                    <ul id={`menu-button-lower-${subIndex}-${titleModified}`} key={`subMenuItem-menu-${subIndex}`} aria-labelledby={`subMenuItem-heading-${subIndex}-${subMenuItem.title.toLowerCase().replaceAll(' ', '-')}`}
                                      className="ml-3 menu-lower-level">
                                      {subMenuItem.items && subMenuItem.items.map((lowerSubMenuItem: MainMenuItem, lowerSubIndex: number) => {
                                          const activeClassLower = (asPath === lowerSubMenuItem.path) ? 'active-link': 'non-active-link';
                                          const ariaCurrentPageLower = (asPath === lowerSubMenuItem.path && lowerSubMenuItem.path !== '/') ? 'page' : undefined;
                                          // The third level items are only links
                                          return(
                                            <li key={`lowerSubMenuItem-${lowerSubIndex}`} className="my-3">
                                              <Link href={lowerSubMenuItem.path} aria-current={ariaCurrentPageLower} key={`lowerSubMenuItem-link-${lowerSubIndex}`}
                                                className={`text-lg p-1 block main-menu-link first-letter:capitalize ${activeClassLower}`}
                                              >
                                                {lowerSubMenuItem.title}
                                              </Link>
                                            </li>
                                          )
                                      })}
                                    </ul>
                                  </li>
                                : <li key={`subMenuItem-link-wrapper-${subIndex}`} className="my-3">
                                    <Link href={subMenuItem.path} aria-current={ariaCurrentPage} key={`subMenuItem-link-${subIndex}`}
                                      className={`text-lg p-1 block main-menu-link first-letter:capitalize ${activeClass}`}
                                    >
                                      {subMenuItem.title}
                                    </Link>
                                  </li>
                                }
                              </Fragment>
                            )
                          })}
                        </ul>
                      }
                    </li>
                  }
                </Fragment>
              );
            })}
          </ul>
        </nav>
      </div>
  );
}

export default Header;
