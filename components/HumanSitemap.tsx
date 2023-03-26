import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const HumanSitemap = ({ data, keyPrefix }: any) => {

  const { asPath } = useRouter();

  return (
    <div>
      <ul key={`${keyPrefix}-parent`} className="ml-8 list-disc">
        {data && data.renderNavigation.map((menuItem: any, index: number) => {
          const ariaCurrentPageTop = (asPath === menuItem.path) ? 'page' : undefined;
          const activeClassTop = (asPath === menuItem.path) ? 'active-link': 'non-active-link';

          return (
            <Fragment key={`${keyPrefix}-Fragment-${index}`}>
              {menuItem.type == 'WRAPPER'
                ?
                // We know the first level items are only wrappers
                <li key={`${keyPrefix}-menuItem-${index}`} className="my-2">
                  <h3 key={`${keyPrefix}-button-${index}`}
                    className="mt-2">
                    {menuItem.title}
                  </h3>
                  {menuItem.items &&
                    <ul key={`${keyPrefix}-menu-button-${index}`} className="ml-4 list-disc">
                      {menuItem.items && menuItem.items.map((subMenuItem: any, subIndex: string) => {
                        const activeClass = (asPath === subMenuItem.path) ? 'active-link': 'non-active-link';
                        const ariaCurrentPage = (asPath === subMenuItem.path) ? 'page' : undefined;

                        return(
                          <Fragment key={`${keyPrefix}-Fragment-sub-${subIndex}`}>
                            {subMenuItem.type == 'WRAPPER'
                            // The second level items will be either wrappers or links
                            ? <li key={`${keyPrefix}-subMenuItem-${subIndex}`} className="my-2">
                                <h4 key={`${keyPrefix}-subMenuItem-heading-${subIndex}`}
                                  className="mt-2">
                                  {subMenuItem.title}
                                </h4>
                                <ul key={`${keyPrefix}-subMenuItem-menu-${subIndex}`} className="ml-4 list-disc">
                                  {subMenuItem.items && subMenuItem.items.map((lowerSubMenuItem: any, lowerSubIndex: string) => {
                                      const activeClassLower = (asPath === lowerSubMenuItem.path) ? 'active-link': 'non-active-link';
                                      const ariaCurrentPageLower = (asPath === lowerSubMenuItem.path && lowerSubMenuItem.path !== '/') ? 'page' : undefined;
                                      // The third level items are only links
                                      return(
                                        <li key={`${keyPrefix}-lowerSubMenuItem-${lowerSubIndex}`}>
                                          <Link href={lowerSubMenuItem.path} aria-current={ariaCurrentPageLower} key={`${keyPrefix}-lowerSubMenuItem-link-${lowerSubIndex}`}
                                            className={`${activeClassLower}`}
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
                                  className={`${activeClass}`}
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
                    className={`${activeClassTop}`}
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
