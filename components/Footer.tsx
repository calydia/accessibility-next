import MenuIcon from './MenuIcon';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Footer = ({data}: any) => {
  const { asPath } = useRouter();

  const { t } = useTranslation('common')
  const blogLink = t('ext-blog');
  const footerMenuAria = t('footer-menu-aria')

  return (
    <footer className="mt-12 p-4-px lg:p-12-px border-t-8 border-solid border-blue-tory bg-lt-blue-light dark:bg-dk-purple">
      <div className="md:flex md:justify-between max-w-[1500px] mx-auto">
        <nav aria-label={footerMenuAria}>
          <ul>
          {data && data.renderNavigation.map((menuItem: any, index: number) => {
            const ariaCurrentPage = (asPath === menuItem.path) ? 'page' : undefined;
            const activeClass = (asPath === menuItem.path) ? 'active-link': 'non-active-link';

            return (
              <li key={`info-menu-list-${index}`} className="flex gap-4 items-center my-4">
                <MenuIcon iconClass={menuItem.iconClass} iconPosition="footer" />
                <Link href={menuItem.path} aria-current={ariaCurrentPage} key={`info-menu-${index}`}
                  className={`${activeClass}`}
                >
                  {menuItem.title}
                </Link>
              </li>
            );
          })}
          </ul>
        </nav>
        <div className="flex items-center">
          <span className="logo-dark mr-2.5">
            <Image
              src="/sm-logo-darkblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
          <span className="logo-light mr-4">
            <Image
              src="/sm-logo-lightblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
          <a
            href="https://blog.sanna.ninja"
            rel="noopener noreferrer"
          >
            {blogLink}
          </a>
        </div>
      </div>
      <Script src="/skip-content.js"></Script>
    </footer>
  );
};

export default Footer;
