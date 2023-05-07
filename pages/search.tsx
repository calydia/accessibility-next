import { GetStaticPropsContext } from 'next';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDarkMode } from '../components/useDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '../components/Toggler';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import { useTranslation } from 'next-i18next';
import { MeiliSearch } from "meilisearch";
import { FormEvent, useState } from 'react';
import { SearchResults } from '@/interfaces/searchInterfaces';

const searchClient = new MeiliSearch({
  host: "http://localhost:7700", apiKey: "e304830a043781414cd895e6c14f66e309c873c744c3b9c619e591d767602170"
});

import { MainMenuData, MenuData } from '@/interfaces/menuInterfaces';


export default function SearchPage({ result, menu, infoMenu }: {
  result: {
    searchPage: {
      data: {
        attributes: {
          title: string,
          slug: string,
          metaDescription: string,
          locale: string,
          content: string
        }
      }
    }
  },
  menu: MainMenuData,
  infoMenu: MenuData,
  menuList: {
    data: {
      menuTitleList: {
        data: {
          attributes: {
            titleList: {
              menuItems: [{
                menuPath: string,
                menuTitle: string
              }]
            }
          }
        }
      }
    }

  }
}) {

  const page = result.searchPage.data.attributes;

  const engUrl = '/search';
  const fiUrl = '/fi/search';

  const [theme, themeToggler] = useDarkMode();

  const { t } = useTranslation('common');
  const searchPageTitle = t('search-title');
  const siteName = t('site-name');
  const searchLabel = t('search-label');
  const searchButton = t('search-button');

  // TODO: On this page we should take in possible search word from the global search component

  // TODO: After search: update search word to page title, breadcrumb and heading

  const [searchWords, setSearchWords] = useState("");
  const [searchDemoResult, setSearchDemoResult] = useState<any>();
  const [searchPageResult, setSearchPageResult] = useState<any>();

  const GetSearchResults = async (searchWords: string) => {
    try {
      const pageResults = await searchClient.index('page').search(searchWords, {
        limit: 25,
        attributesToRetrieve: [
          'title',
          'locale',
          'pageUrl',
          'metaDescription'
        ]
      });
      setSearchPageResult(pageResults.hits);

      const demoResults = await searchClient.index('demo-page').search(searchWords, {
        limit: 25,
        attributesToRetrieve: [
          'title',
          'locale',
          'pageUrl',
          'metaDescription'
        ]
      });
      setSearchDemoResult(demoResults.hits);
    }
    catch (e) {
      console.error(e);
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchWords(event.currentTarget.value);
  }

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();

    GetSearchResults(searchWords);
  }

  return (
    <>
      <header className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
        dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header">
        <SkipLink skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <div className="flex flex-wrap justify-end gap-1">
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>

      <MainImage />
      <main>
        <Head>
          <title>{page.title} | Sanna Mäkinen - {siteName}</title>
          <meta property="og:title" content={searchPageTitle} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content={page.locale} />
          <meta property="og:site_name" content="I would if I could" />
          <meta property="og:image" content="/some-share.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="alternate" hrefLang="fi" href={`https://a11y.sanna.ninja/${fiUrl}`} />
          <link rel="alternate" hrefLang="en" href={`https://a11y.sanna.ninja/${engUrl}`} />
        </Head>
        <div className="max-w-[1564px] mx-auto md:px-8-px">
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{page.title}</h1>
          </div>

          <div className="flex flex-wrap grow max-w-[1564px] w-full mx-auto justify-center md:justify-end px-2 py-6 md:py-4">
            <form id="site-search" onSubmit={formSubmit} role="search" className="flex flex-wrap items-center w-full md:gap-6 flex-col md:flex-row md:justify-end">
              <label htmlFor="search-input" className="text-black dark:text-white" >{searchLabel}</label>
              <input id="search-input" type="text" className="w-full max-w-sm" onChange={handleChange} />
              <button type="submit" className="button item--transition max-md:mt-4">{searchButton}</button>
            </form>
          </div>

          { (searchPageResult || searchDemoResult) ?
            <>
              <h2>Search results for {searchWords}</h2>
              <div>Results: {searchPageResult.totalHits}</div>
            </>
          : null }

          { (searchPageResult) ?
          <>
            <h3>Pages</h3>
            <ul>
              {searchPageResult.map((result: SearchResults, index: number) => {
                const resultPrefix = (result.locale == 'en') ? '/' : '/fi/';
                return (
                    <li key={`result-${index}`} className="my-4
                    ">
                      <a lang={result.locale} href={`${resultPrefix}${result.pageUrl}`}>{result.title}</a>
                      <span lang={result.locale} className="block">{result.metaDescription}</span>
                    </li>
                );
              })}
            </ul>
          </>
        : null }

        { (searchDemoResult) ?
          <>
            <h3>Demos</h3>
            <ul>
              {searchDemoResult.map((demoResult: SearchResults, index: number) => {
                const demoResultPrefix = (demoResult.locale == 'en') ? '/' : '/fi/';
                return (
                    <li key={`result-demo-${index}`} className="my-4
                    ">
                      <a lang={demoResult.locale} href={`${demoResultPrefix}${demoResult.pageUrl}`}>{demoResult.title}</a>
                      <span lang={demoResult.locale} className="block">{demoResult.metaDescription}</span>
                    </li>
                );
              })}
            </ul>
          </>
        : null }

        </div>
      </main>
      <Footer data={infoMenu.data} />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  const result = await client.query({
    query: gql`
      query searchPage($locale: I18NLocaleCode) {
        searchPage(locale: $locale) {
          data {
            attributes {
              title
            }
          }
        }
      }
    `,
    variables: { locale }
  });

  const menu = await client.query({
    query: gql`
      query Menu($locale: I18NLocaleCode) {
        renderNavigation(navigationIdOrSlug: "main-navigation", type: TREE, locale: $locale) {
          id
          title
          type
          path
          iconClass
          items {
            title
            type
            path
            iconClass
            items {
              title
              type
              path
              iconClass
            }
          }
        }
      }
    `,
    variables: { locale }
  });

  const infoMenu = await client.query({
    query: gql`
      query Menu($locale: I18NLocaleCode) {
        renderNavigation(navigationIdOrSlug: "info", type: TREE, locale: $locale) {
          id
          title
          type
          path
          iconClass
          items {
            title
            type
            path
            iconClass
            items {
              title
              type
              path
              iconClass
            }
          }
        }
      }
    `,
    variables: { locale }
  });

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      result: result.data,
      menu,
      infoMenu
    },
    revalidate: 60
  };
}
