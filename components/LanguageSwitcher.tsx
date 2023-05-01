import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { HiTranslate } from "react-icons/hi";

interface SwitcherTypes {
  englishURL: string,
  finnishURL: string
}

const buttonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
  // Toggle aria-expanded
  const current = event.currentTarget;
  const currentExpanded = current.getAttribute('aria-expanded');
  (currentExpanded == 'true') ? current.setAttribute('aria-expanded', 'false') : current.setAttribute('aria-expanded', 'true');
}

const LanguageSwitcher = ({ englishURL, finnishURL }: SwitcherTypes) => {
  const { t } = useTranslation('common')
  const ariaLabel = t('language-switcher-aria');
  const ariaLanguage = t('language-switcher-language');

  const { asPath } = useRouter();

  const compareURLEN = englishURL.replace(/\/$/, '');
  const compareURLFI = finnishURL.replace(/\/$/, '');

  const ariaCurrentPageEn = (asPath.includes(compareURLEN) && compareURLEN !== '/') ? 'page' : undefined;
  const ariaCurrentPageFi = (asPath.includes(compareURLFI) && compareURLFI !== '/') ? 'page' : undefined;

  return (
    <div id="language-switcher" className="lang-switcher text-black dark:text-white px-3 relative">
      <button id="language-menu-button" aria-label={ariaLabel} aria-expanded="false" aria-controls="lang-switcher" onClick={buttonClickHandler} className="lang-switcher flex gap-2 py-2 border-y-4 border-transparent items-center
      hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
      focus:outline focus:outline-2 focus:outline-offset-4	focus:outline-black dark:focus:outline-white">
        <HiTranslate className="h-8 w-8" aria-hidden="true" />
        {ariaLanguage}
      </button>
      <ul id="lang-switcher" className="p-4 right-0 mt-1 mr-1.5 absolute flex flex-col gap-4 border-solid border-2 border-black bg-lt-code-bg dark:border-white w-[200%] dark:bg-dk-code-bg">
        <li>
          <Link href={englishURL} locale="en" aria-current={ariaCurrentPageEn}>
            English (EN)
          </Link>
        </li>
        <li>
          <Link href={finnishURL} locale="fi" aria-current={ariaCurrentPageFi}>
            Suomi (FI)
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
