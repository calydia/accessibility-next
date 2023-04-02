import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface BreadcrumbTypes {
  currentTitle: string,
  currentSlug: string
}

const Breadcrumb = ({currentTitle, currentSlug}: BreadcrumbTypes) => {
  const { t } = useTranslation('common')
  const ariaLabel = t('breadcrumb-aria');

  const { asPath } = useRouter();

  const pathArray = (asPath !== '/') ? asPath.split('/') : null;

  return (
    <nav aria-label={ariaLabel} className="col-span-2 w-full max-w-4xl mx-auto p-4-px md:px-8-px text-lt-gray dark:text-white">
      <ul className="block list-none m-0 p-0">
        {pathArray && pathArray.map((menuItem: string, index: number) => {
          if (menuItem.length < 2) {
            return (
              <li className="inline">
              <Link href="/" aria-current={!pathArray ? 'page' : false} className="underline underline-offset-4 decoration-2 text-lt-blue-dark dark:text-dk-blue-light selection:hover:text-lt-purple hover:decoration-4 dark:hover:text-wheat focus:text-lt-purple dark:focus:text-wheat focus:outline-2 focus:outline-offset-8 focus:no-underline focus:outline-lt-purple dark:focus:outline-wheat">
                {t('home-link')}
              </Link>
            </li>
            );
          }

          let menuTitle:string = '';
          const menuUpperList = ['wcag', 'wai-aria', 'atag', 'aria'];

          if (menuItem == currentSlug) {
            menuTitle = currentTitle;
          } else if (menuUpperList.includes(menuItem)) {
            menuTitle = menuItem.toUpperCase();
          } else {
            const menuTitleName = menuItem.replaceAll('-', ' ');
            menuTitle = menuTitleName.charAt(0).toUpperCase() + menuTitleName.slice(1);
          }

          console.log(menuTitle);
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
