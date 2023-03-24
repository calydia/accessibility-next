import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'
import { useRouter } from 'next/router';

const Footer = ({data}: any) => {
  const { asPath } = useRouter();

  return (
    <footer className="mt-12 p-4-px lg:p-12-px border-t-8 border-solid border-blue-tory bg-lt-blue-light dark:bg-dk-purple">
      <div className="md:flex md:justify-between max-w-[1500px] mx-auto">
        <nav aria-label="footer menu placeholder aria">
          <ul>
          {data && data.renderNavigation.map((menuItem: any, index: number) => {
            const ariaCurrentPage = (asPath === menuItem.path) ? 'page' : undefined;
            const activeClass = (asPath === menuItem.path) ? 'active-link': 'non-active-link';

            return (
              <li key={`info-menu-list-${index}`}>
                <Link href={menuItem.path} aria-current={ariaCurrentPage} key={`info-menu-${index}`}
                  className={`text-xl p-1 dark:text-shadow-text hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4 selection:focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white ${activeClass}`}
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
          <span className="logo-light mr-2.5">
            <Image
              src="/sm-logo-lightblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
        <nav aria-label="my other projects">
          <ul>
            <li key="footer-own-first">
              <a
              href="https://sanna.ninja"
              className="flex align-center font-bold p-2 m-1 border-y-4 border-transparent text-lt-blue-dark lg:text-xl text-lt-blue-darkest dark:text-dk-blue-light
              hover:text-lt-purple hover:dark:text-dk-blue-light hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
              focus:outline focus:outline-2 focus:outline-offset-8	focus:outline-black dark:focus:outline-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              My portfolio
            </a>
          </li>
            <li key="footer-own-second">
            <a
              href="https://blog.sanna.ninja"
              className="flex align-center text-lt-blue-dark lg:text-xl font-bold border-y-4 border-transparent p-2 m-1 text-lt-blue-darkest dark:text-dk-blue-light
              hover:text-lt-purple hover:dark:text-dk-blue-light hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
              focus:outline focus:outline-2 focus:outline-offset-8	focus:outline-black dark:focus:outline-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              My blog
            </a>
            </li>
          </ul>
        </nav>
        </div>
      </div>
      <Script src="/skip-content.js"></Script>
    </footer>
  );
};

export default Footer;
