import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface BreadcrumbTypes {
  currentTitle: string,
  currentSlug: string,
  menuList: [{ menuPath: string, menuTitle: string }]
}

const Breadcrumb = ({currentTitle, currentSlug, menuList}: BreadcrumbTypes) => {
  const { t } = useTranslation('common')
  const ariaLabel = t('breadcrumb-aria');

  const { asPath } = useRouter();

  const pathArray = (asPath !== '/') ? asPath.split('/') : null;

  return (
    <nav aria-label={ariaLabel} className="breadcrumb w-full max-w-4xl mx-auto p-4-px md:px-8-px text-lt-gray dark:text-white">
      <ul className="block list-none m-0 p-0">
        {pathArray && pathArray.map((menuItem: string, index: number) => {
          if (menuItem.length < 2) {
            return (
              <li className="inline" key="breadcrumb-home">
              <Link href="/" aria-current={!pathArray ? 'page' : false} >
                {t('home-link')}
              </Link>
            </li>
            );
          }

          let menuTitle:string = '';

          for (let i in menuList) {
            if (menuList[i].menuPath == menuItem) {
              menuTitle = menuList[i].menuTitle;
              return (
                <li key={`breadcrumb-menulist-${menuList[i]}`} className="inline">
                  <span className="mx-2">/</span>
                  {menuTitle}
                </li>
              );
            }
          }

          if (menuItem == currentSlug) {
            menuTitle = currentTitle;
          } else {
            const menuTitleName = menuItem.replaceAll('-', ' ');
            menuTitle = menuTitleName.charAt(0).toUpperCase() + menuTitleName.slice(1);
          }

          return (
            <li key={`breadcrumb-${index}`} className="inline">
              <span className="mx-2">/</span>
              {menuTitle}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
