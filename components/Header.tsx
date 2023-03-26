import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { HiMenu, HiChevronDown, HiX } from "react-icons/hi";

const Header = ({data}: any) => {
  const { asPath } = useRouter();

  const { t } = useTranslation('common')
  const ariaLabel = t('main-menu-aria');
  const menuButton = t('menu-button');

  const menuToggleClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle aria-expanded
    const current = event.currentTarget;
    const currentExpanded = current.getAttribute('aria-expanded');
    (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');
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

  return (
      <div className="text-center pt-2 pb-8 lg:py-4 clear-both lg:clear:none">
        <div>
          <span className="block text-2xl font-title text-black dark:text-white dark:text-shadow-text">Sanna Mäkinen <span className="text-blue-tory dark:text-lt-perfume">-</span> I would if I could</span>
          <span className="block text-lg mt-2 font-title leading-none text-blue-tory dark:text-lt-perfume dark:text-shadow-text">a guide to web accessibility</span>
        </div>
        <nav id="main-menu-nav" aria-labelledby="main-menu-label">
          <h2 id="main-menu-label" className="sr-only" key="first-heading">{ariaLabel}</h2>
          <button id="main-menu-toggle" className="menu-toggle flex gap-2 mt-6 mx-auto text-black border-y-4 border-transparent dark:text-white md:hidden md:invisible
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 	focus:outline-black dark:focus:outline-white"
            aria-expanded="false" aria-controls="main-menu" aria-haspopup="true" onClick={menuToggleClickHandler}>
            <HiMenu className="menu-open h-8 w-8" aria-hidden="true" />
            <HiX className="menu-close h-8 w-8" aria-hidden="true" />
            <span className="sr-only">{menuButton}</span>
          </button>
          <ul id="main-menu" className="text-left md:visible md:flex md:flex-wrap md:justify-center mt-4 p-0 mb-0" key="first-ul">
            {data && data.renderNavigation.map((menuItem: any, index: number) => {
              const ariaCurrentPath = (asPath.includes(menuItem.path) && menuItem.path !== '/') ? true : undefined;

              return (
                <Fragment key={`fragment-${index}`}>
                  {menuItem.type == 'WRAPPER' &&
                    // We know the first level items are only wrappers
                    <li key={`menuItem-${index}`} className="m-2 relative">
                      <button id={`button-${index}`} key={`button-${index}`} aria-current={ariaCurrentPath} aria-expanded="false" aria-controls={`menu-button-${index}`} aria-haspopup="true" onClick={buttonClickHandler}
                        className={`menu-button flex items-center text-left gap-2 text-black dark:text-white text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`}>
                        {menuItem.title}
                        <HiChevronDown className="menu-button--icon h-6 w-6" />
                      </button>
                      {menuItem.items &&
                        <ul id={`menu-button-${index}`} key={`menu-button-${index}`} className="menu-button-ul ml-2 md:absolute md:mt-2 md:z-20 md:w-[200%] md:left:0 md:right:0 md:p-4 md:border-2 md:border-solid md:border-black md:dark:border-white md:bg-lt-code-bg md:dark:bg-dk-code-bg">
                          {menuItem.items && menuItem.items.map((subMenuItem: any, subIndex: string) => {
                            const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                            const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;

                            return(
                              <Fragment key={`fragment-sub-${index}`}>
                                {subMenuItem.type == 'WRAPPER'
                                // The second level items will be either wrappers or links
                                ? <li key={`subMenuItem-${subIndex}`}>
                                    <h3 key={`subMenuItem-heading-${subIndex}`}
                                      className={`text-xl p-1 dark:text-shadow-text mt-0 text-black dark:text-white ${subMenuItem.iconClass}`}>
                                      {subMenuItem.title}
                                    </h3>
                                    <ul key={`subMenuItem-menu-${subIndex}`}>
                                      {subMenuItem.items && subMenuItem.items.map((lowerSubMenuItem: any, lowerSubIndex: string) => {
                                          const activeClassLower = (asPath === lowerSubMenuItem.path) ? 'active-link': 'non-active-link';
                                          const ariaCurrentPageLower = (asPath === lowerSubMenuItem.path && lowerSubMenuItem.path !== '/') ? 'page' : undefined;
                                          // The third level items are only links
                                          return(
                                            <li key={`lowerSubMenuItem-${lowerSubIndex}`}>
                                              <Link href={lowerSubMenuItem.path} aria-current={ariaCurrentPageLower} key={`lowerSubMenuItem-link-${lowerSubIndex}`}
                                                className={`text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white ${activeClassLower}`}
                                              >
                                                {lowerSubMenuItem.title}
                                              </Link>
                                            </li>
                                          )
                                      })}
                                    </ul>
                                  </li>
                                : <li key={`subMenuItem-link-wrapper-${subIndex}`}>
                                    <Link href={subMenuItem.path} aria-current={ariaCurrentPage} key={`subMenuItem-link-${subIndex}`}
                                      className={`text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white ${activeClass}`}
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
