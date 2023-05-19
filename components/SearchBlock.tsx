import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { HiSearch } from "react-icons/hi";

interface SearchTypes {
  locale: string
}


const SearchBlock = ({ locale }: SearchTypes) => {
  const { t } = useTranslation('common')
  const searchLabel = t('search-block-label');

  const searchUrlEn = '/search';
  const searchUrlFi = '/haku';

  const searchUrl = (locale == 'en') ? searchUrlEn : searchUrlFi;

  const { asPath } = useRouter();
  return (
    <div id="search-link" className="text-black dark:text-white px-3 relative">

    <Link href={searchUrl} locale={locale} className="inline-block py-2 px-1 text-black dark:text-white border-y-4 border-transparent
    hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
    focus:outline focus:outline-2 focus:outline-offset-4 	focus:outline-black dark:focus:outline-white">
      <HiSearch className="h-8 w-8" aria-hidden="true" />
      <span className="sr-only">{searchLabel}</span>
    </Link>
    </div>
  );
};

export default SearchBlock;
