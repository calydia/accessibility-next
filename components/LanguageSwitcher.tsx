import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

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

  // TODO Active class + aria-current = page

  return (
    <div className="p-4-px pb-0 text-lt-gray dark:text-white md:px-8-px">
      <button aria-label={ ariaLabel } aria-expanded="false" aria-controls="lang-switcher" onClick={ buttonClickHandler } className="lang-switcher flex gap-2">
        <Image
          src="/sm-logo-darkblue.png"
          alt=""
          width={35}
          height={27}
          aria-hidden="true"
        />
        { ariaLanguage }
      </button>
      <ul id="lang-switcher" className="p-2">
        <li>
          <Link href={ englishURL } locale="en">
            In English
          </Link>
        </li>
        <li>
          <Link href={ finnishURL } locale="fi">
            Suomeksi
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
