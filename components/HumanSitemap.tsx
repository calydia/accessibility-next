import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const HumanSitemap = ({ data, keyPrefix }: any) => {

  const { asPath } = useRouter();

  return (
    <div>
      <ul key={`${keyPrefix}-parent`}>
        {data && data.renderNavigation.map((menuItem: any, index: number) => {
          const ariaCurrentPageTop = (asPath === menuItem.path) ? 'page' : undefined;
          const activeClassTop = (asPath === menuItem.path) ? 'active-link': 'non-active-link';

          return (
            <Fragment key={`${keyPrefix}-Fragment-${index}`}>
              {menuItem.type == 'WRAPPER'
                ?
                // We know the first level items are only wrappers
                <li key={`${keyPrefix}-menuItem-${index}`} className="m-2 relative">
                  <h3 key={`${keyPrefix}-button-${index}`}
                    className="text-black dark:text-white text-xl p-1 dark:text-shadow-text">
                    {menuItem.title}
                  </h3>
                  {menuItem.items &&
                    <ul key={`${keyPrefix}-menu-button-${index}`} >
                      {menuItem.items && menuItem.items.map((subMenuItem: any, subIndex: string) => {
                        const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                        const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;

                        return(
                          <Fragment key={`${keyPrefix}-Fragment-sub-${subIndex}`}>
                            {subMenuItem.type == 'WRAPPER'
                            // The second level items will be either wrappers or links
                            ? <li key={`${keyPrefix}-subMenuItem-${subIndex}`}>
                                <h4 key={`${keyPrefix}-subMenuItem-heading-${subIndex}`}
                                  className="text-xl p-1 dark:text-shadow-text mt-0 text-black dark:text-white">
                                  {subMenuItem.title}
                                </h4>
                                <ul key={`${keyPrefix}-subMenuItem-menu-${subIndex}`}>
                                  {subMenuItem.items && subMenuItem.items.map((lowerSubMenuItem: any, lowerSubIndex: string) => {
                                      const activeClassLower = (asPath === lowerSubMenuItem.path) ? 'active-link': 'non-active-link';
                                      const ariaCurrentPageLower = (asPath === lowerSubMenuItem.path && lowerSubMenuItem.path !== '/') ? 'page' : undefined;
                                      // The third level items are only links
                                      return(
                                        <li key={`${keyPrefix}-lowerSubMenuItem-${lowerSubIndex}`}>
                                          <Link href={lowerSubMenuItem.path} aria-current={ariaCurrentPageLower} key={`${keyPrefix}-lowerSubMenuItem-link-${lowerSubIndex}`}
                                            className={`text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white ${activeClassLower}`}
                                          >
                                            {lowerSubMenuItem.title}
                                          </Link>
                                        </li>
                                      )
                                  })}
                                </ul>
                              </li>
                            : <li key={`${keyPrefix}-subMenuItem-link-wrapper-${subIndex}`}>
                                <Link href={subMenuItem.path} aria-current={ariaCurrentPage} key={`${keyPrefix}-subMenuItem-link-${subIndex}`}
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
              :
              <Fragment key={`${keyPrefix}-Fragment-top-${index}`}>
                <li key={`${keyPrefix}-menu-top-level-list-${index}`}>
                  <Link href={menuItem.path} aria-current={ariaCurrentPageTop} key={`${keyPrefix}-top-level-link-${index}`}
                    className={`text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white ${activeClassTop}`}
                  >
                    {menuItem.title}
                  </Link>
                </li>
              </Fragment>
            }
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default HumanSitemap;
