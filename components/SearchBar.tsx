import { useTranslation } from 'next-i18next';

const SearchBar = () => {

  const { t } = useTranslation('common')
  const searchLabel = t('search-label');
  const searchButton = t('search-button');

  return (
    <div className="flex flex-wrap max-w-[1564px] mx-auto justify-center md:justify-end px-2 py-6 md:py-4">
      <form id="site-search" role="search" className="flex flex-wrap md:gap-6 flex-col md:flex-row items-center">
        <label htmlFor="search-input" className="text-black dark:text-white" >{searchLabel}</label>
        <input id="search-input" type="text" />
        <button type="submit" className="button max-md:mt-4">{searchButton}</button>
      </form>
    </div>
  );
};

export default SearchBar;
