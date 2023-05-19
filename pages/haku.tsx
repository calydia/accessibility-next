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
import { FormEvent, ReactNode, useState } from 'react';
import { SearchResults } from '@/interfaces/searchInterfaces';
import Breadcrumb from '@/components/Breadcrumb';
import Script from 'next/script'

const searchClient = new MeiliSearch({
  host: "http://localhost:7700", apiKey: "e304830a043781414cd895e6c14f66e309c873c744c3b9c619e591d767602170"
});

import { MainMenuData, MenuData } from '@/interfaces/menuInterfaces';


export default function SearchPage({ result, menu, infoMenu, menuList }: {
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

  const engUrl = 'search';
  const fiUrl = 'haku';

  const [theme, themeToggler] = useDarkMode();

  const { t } = useTranslation('common');
  const searchPageTitle = t('search-title');
  const siteName = t('site-name');
  const searchLabel = t('search-label');
  const searchButton = t('search-button');
  const searchLangLabelEn = t('search-lang-label-en');
  const searchLangLabelFi = t('search-lang-label-fi');
  const searchMainHeading = t('search-main-heading');
  const searchDescription = t('search-description');
  const searchResultPageLabel = t('search-result-pages');
  const searchResultDemoLabel = t('search-result-demos');
  const searchResultLabel = t('search-result');
  const searchDemoLink = t('search-demo-link');

  const [searchWords, setSearchWords] = useState("");
  const [searchDemoResult, setSearchDemoResult] = useState<any>();
  const [searchPageResult, setSearchPageResult] = useState<any>();
  const [searchPageResultNumber, setSearchPageResultNumber] = useState<ReactNode>();
  const [searchDemoResultNumber, setDemoPageResultNumber] = useState<ReactNode>();


  const GetSearchResults = async (searchWords: string) => {
    try {
      const pageResults = await searchClient.index('page').search(searchWords, {
        limit: 100,
        attributesToRetrieve: [
          'title',
          'locale',
          'pageUrl',
          'metaDescription'
        ]
      });
      setSearchPageResult(pageResults.hits);
      setSearchPageResultNumber(pageResults.estimatedTotalHits);

      const demoResults = await searchClient.index('demo-page').search(searchWords, {
        limit: 100,
        attributesToRetrieve: [
          'title',
          'locale',
          'pageUrl',
          'metaDescription'
        ]
      });
      setSearchDemoResult(demoResults.hits);
      setDemoPageResultNumber(demoResults.estimatedTotalHits);
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
        <SkipLink skipId="skip" skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <SkipLink skipId="skip-search" skipTarget="search-input" skipTextVariable="skip-link-search-text" />
        <div className="flex flex-wrap justify-end gap-1">
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>

      <MainImage />
      <Breadcrumb currentTitle={page.title} currentSlug={page.slug} menuList={menuList.data.menuTitleList.data.attributes.titleList.menuItems} />
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

            <form id="site-search" onSubmit={formSubmit} role="search" className="mt-8 flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row">
              <label htmlFor="search-input" className="text-black dark:text-white w-full">{searchLabel}</label>
              <input id="search-input" type="text" className="w-full md:max-w-sm" onChange={handleChange} />
              <span className="sr-only">After you submit the search, </span>
              <button type="submit" className="button item--transition max-md:my-4">{searchButton}</button>
            </form>
          </div>

          <div className="text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            { (searchPageResult || searchDemoResult) ?
              <div className="border-t-4 gradient-border-light dark:gradient-border-dark pt-4">
                <h2>{searchMainHeading} {searchWords}</h2>
                <p>{searchDescription}</p>
                <p>
                  <a href="#search-result-demos">{searchDemoLink}</a>
                </p>
              </div>
            : null }

            { (searchPageResult) ?
            <>
              <h3 id="search-result-pages">{searchResultPageLabel} {searchPageResultNumber} {searchResultLabel}</h3>
              <ul>
                {searchPageResult.map((result: SearchResults, index: number) => {
                  const resultPrefix = (result.locale == 'en') ? '/' : '/fi/';
                  const languageLabel = (result.locale == 'en') ? searchLangLabelEn : searchLangLabelFi;
                  return (
                      <li key={`result-${index}`} className="my-2 py-6 flex flex-col border-t-2
                      ">
                        <span className="w-full self-end text-sm">{languageLabel}</span>
                        <a className="my-2 text-xl" lang={result.locale} href={`${resultPrefix}${result.pageUrl}`}>
                          <h4 className="mt-0">{result.title}</h4>
                        </a>
                        <span lang={result.locale} className="block text-lg">{result.metaDescription}</span>
                      </li>
                  );
                })}
              </ul>
            </>
          : null }

          { (searchDemoResult) ?
            <>
              <h3 id="search-result-demos">{searchResultDemoLabel} {searchDemoResultNumber} {searchResultLabel}</h3>
              <ul>
                {searchDemoResult.map((demoResult: SearchResults, index: number) => {
                  const demoResultPrefix = (demoResult.locale == 'en') ? '/' : '/fi/';
                  const languageLabel = (demoResult.locale == 'en') ? searchLangLabelEn : searchLangLabelFi;
                  return (
                      <li key={`result-demo-${index}`} className="my-2 py-6 flex flex-col border-t-2
                      ">
                        <span className="w-full self-end text-sm">{languageLabel}</span>
                        <a className="my-2 text-xl" lang={demoResult.locale} href={`${demoResultPrefix}${demoResult.pageUrl}`}>
                          <h4 className="mt-0">{demoResult.title}</h4>
                        </a>
                        <span lang={demoResult.locale} className="block text-lg">{demoResult.metaDescription}</span>
                      </li>
                  );
                })}
              </ul>
            </>
          : null }
          </div>
        </div>
      </main>
      <Footer data={infoMenu.data} />
      <Script src="/skip-content-search.js"></Script>
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

  const menuList = await client.query({
    query: gql`
      query menuTitleList($locale: I18NLocaleCode) {
        menuTitleList(locale: $locale) {
          data {
            attributes {
              titleList
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
      infoMenu,
      menuList
    }
  };
}
