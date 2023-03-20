import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Header = ({data}: any) => {

  const { asPath } = useRouter();

  const { t } = useTranslation('common')
  const ariaLabel = t('main-menu-aria');

  const buttonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle aria-expanded
    const current = event.currentTarget;
    const currentExpanded = current.getAttribute('aria-expanded');
    (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');

    //TODO Close all other menu items when the button is clicked by setting aria-expanded for the buttons to false


  }

  return (
      <div className="text-center pt-2 pb-8 lg:py-4 clear-both lg:clear:none">
        <div>
          <span className="block text-2xl lg:text-3xl font-title text-black dark:text-white dark:text-shadow-text">Sanna Mäkinen - I would if I could</span>
          <span className="block text-lg mt-2 font-title leading-none text-black dark:text-white dark:text-shadow-text">a guide to web accessibility</span>
        </div>
        <nav aria-labelledby="main-menu-label">
          <h2 id="main-menu-label" className="sr-only" key="first-heading">{ariaLabel}</h2>
          <ul className="flex flex-wrap justify-center mt-4 p-0 mb-0" key="first-ul">
            {data && data.renderNavigation.map((menuItem: any, index: number) => {
              const ariaCurrentPath = (asPath.includes(menuItem.path) && menuItem.path !== '/') ? true : undefined;

              return (
                <>
                  {menuItem.type == 'WRAPPER' &&
                    // We know the first level items are only wrappers
                    <li key={`menuItem-${index}`} className="m-2">
                      <button id={`button-${index}`} key={`button-${index}`} aria-current={ariaCurrentPath} aria-expanded="false" aria-controls={`menu-button-${index}`} aria-haspopup="true" onClick={buttonClickHandler}
                        className={`menu-button text-black dark:text-white text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white`}>
                      {menuItem.title}
                      </button>
                      {menuItem.items &&
                        <ul id={`menu-button-${index}`} key={`menu-button-${index}`}>
                          {menuItem.items && menuItem.items.map((subMenuItem: any, subIndex: string) => {
                            const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                            const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;

                            return(
                              <>
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
                              </>
                            )
                          })}
                        </ul>
                      }
                    </li>
                  }
                </>
              );
            })}
          </ul>
        </nav>
      </div>
  );
}

export default Header;
