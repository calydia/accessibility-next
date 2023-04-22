import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { MainMenuItem, MainMenuSitemapData } from '@/interfaces/menuInterfaces';

const HumanSitemap = ({ data, keyPrefix }: {
  data: MainMenuSitemapData,
  keyPrefix: string
}) => {

  const { asPath } = useRouter();

  return (
    <div>
      <ul key={`${keyPrefix}-parent`} className="ml-8 list-disc">
        {data && data.renderNavigation.map((menuItem: MainMenuItem, index: number) => {
          const ariaCurrentPageTop = (asPath === menuItem.path) ? 'page' : undefined;
          const activeClassTop = (asPath === menuItem.path) ? 'active-link': 'non-active-link';

          return (
            <Fragment key={`${keyPrefix}-Fragment-${index}`}>
              {menuItem.type == 'WRAPPER'
                ?
                // We know the first level items are only wrappers
                <li key={`${keyPrefix}-menuItem-${index}`} className="my-2">
                  <h3 key={`${keyPrefix}-button-${index}`}
                    className="mt-2 first-letter:capitalize">
                    {menuItem.title}
                  </h3>
                  {menuItem.items &&
                    <ul key={`${keyPrefix}-menu-button-${index}`} className="ml-4 list-disc">
                      {menuItem.items && menuItem.items.map((subMenuItem: MainMenuItem, subIndex: number) => {
                        const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                        const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;

                        return(
                          <Fragment key={`${keyPrefix}-Fragment-sub-${subIndex}`}>
                            {subMenuItem.type == 'WRAPPER'
                            // The second level items will be either wrappers or links
                            ? <li key={`${keyPrefix}-subMenuItem-${subIndex}`} className="my-2">
                                <h4 key={`${keyPrefix}-subMenuItem-heading-${subIndex}`}
                                  className="mt-2 first-letter:capitalize">
                                  {subMenuItem.title}
                                </h4>
                                <ul key={`${keyPrefix}-subMenuItem-menu-${subIndex}`} className="ml-4 list-disc">
                                  {subMenuItem.items && subMenuItem.items.map((lowerSubMenuItem: MainMenuItem, lowerSubIndex: number) => {
                                      const activeClassLower = (asPath === lowerSubMenuItem.path) ? 'active-link': 'non-active-link';
                                      const ariaCurrentPageLower = (asPath === lowerSubMenuItem.path && lowerSubMenuItem.path !== '/') ? 'page' : undefined;
                                      // The third level items are only links
                                      return(
                                        <li key={`${keyPrefix}-lowerSubMenuItem-${lowerSubIndex}`} className="my-2">
                                          <Link href={lowerSubMenuItem.path} aria-current={ariaCurrentPageLower} key={`${keyPrefix}-lowerSubMenuItem-link-${lowerSubIndex}`}
                                            className={`${activeClassLower} first-letter:capitalize`}
                                          >
                                            {lowerSubMenuItem.title}
                                          </Link>
                                        </li>
                                      )
                                  })}
                                </ul>
                              </li>
                            : <li key={`${keyPrefix}-subMenuItem-link-wrapper-${subIndex}`} className="my-2">
                                <Link href={subMenuItem.path} aria-current={ariaCurrentPage} key={`${keyPrefix}-subMenuItem-link-${subIndex}`}
                                  className={`${activeClass} first-letter:capitalize`}
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
                <li key={`${keyPrefix}-menu-top-level-list-${index}`} className="my-2">
                  <Link href={menuItem.path} aria-current={ariaCurrentPageTop} key={`${keyPrefix}-top-level-link-${index}`}
                    className={`${activeClassTop} first-letter:capitalize`}
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
