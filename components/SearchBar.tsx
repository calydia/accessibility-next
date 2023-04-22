import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const SearchBar = () => {

  const { t } = useTranslation('common')
  const searchLabel = t('search-label');
  const searchButton = t('search-button');

  const [searchWords, setSearchWords] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchWords(event.currentTarget.value);
  }

  return (
    <div className="flex flex-wrap grow max-w-[1564px] w-full mx-auto justify-center md:justify-end px-2 py-6 md:py-4">
      <form id="site-search" role="search" className="flex flex-wrap items-center w-full md:gap-6 flex-col md:flex-row md:justify-end">
        <label htmlFor="search-input" className="text-black dark:text-white" >{searchLabel}</label>
        <input id="search-input" type="text" className="w-full max-w-sm" onChange={handleChange} />
        <button type="submit" className="button item--transition max-md:mt-4">{searchButton}</button>
      </form>
    </div>
  );
};

export default SearchBar;
