import { GetStaticPaths } from 'next';
import { GetStaticPathsContext } from 'next';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UseDarkMode } from '../components/UseDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '../components/Toggler';
import Header from '../components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import { useTranslation } from 'next-i18next';
import Glossary from '@/components/Glossary';
import { MainMenuData, MenuData } from '@/interfaces/menuInterfaces';
import { glossaryData } from '@/interfaces/glossaryInterfaces';
import SearchBlock from '@/components/SearchBlock';

export default function ArticlePage({ result, menu, infoMenu, glossary, menuList }: {
  result: {
    pages: {
      data: [{
        attributes: {
          title: string,
          slug: string,
          metaDescription: string,
          locale: string,
          content: string,
          pageUrl: string,
          sourceMaterial: string,
          localizations: {
            data: [{
              attributes: {
                pageUrl: string
              }
            }]
          }
        }
      }]
    }
  },
  menu: MainMenuData,
  infoMenu: MenuData,
  glossary: glossaryData,
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

  const page = result.pages.data[0].attributes;

  const [theme, themeToggler] = UseDarkMode();

  const engUrl = (page.locale == 'en') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;
  const fiUrl = (page.locale == 'fi') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;

  const { t } = useTranslation('common');
  const sourceHeading = t('box-source');
  const siteName = t('site-name');

  return (
    <>
      <header id="page-top" className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
        dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header">
        <SkipLink skipId="skip" skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <div className="flex flex-wrap justify-end gap-1">
          <SearchBlock locale={page.locale} />
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>
      <MainImage />
      <Breadcrumb currentTitle={page.title} currentSlug={page.slug} menuList={menuList.data.menuTitleList.data.attributes.titleList.menuItems} />
      <main className="mb-8 md:mb-12">
        <Head>
          <title>{page.title} | Sanna Mäkinen - {siteName}</title>
          <meta name="description" content={page.metaDescription} />
          <meta
            property="og:description"
            content={page.metaDescription}
          />
          <meta property="og:title" content={page.title} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content={page.locale} />
          <meta property="og:site_name" content="I would if I could" />
          <meta property="og:image" content="/some-share.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="alternate" hrefLang="fi" href={`https://a11y.sanna.ninja/fi/${fiUrl}`} />
          <link rel="alternate" hrefLang="en" href={`https://a11y.sanna.ninja/${engUrl}`} />
        </Head>
        <div className="max-w-[1564px] mx-auto md:px-8-px">
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{ page.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} className="text-xl bodytext"></div>
            { (page.slug === "glossary" || page.slug === 'sanasto') ?
            <>
              <Glossary data={glossary.data} />
            </>
            : null }
            { page.sourceMaterial ?
            <div className="relative text-xl bodytext mt-12 p-8-px lg:mt-20 txt-base border-solid border-4 bg-lt-code-bg border-lt-code-border dark:bg-dk-code-bg dark:border-dk-code-border">
              <h2 className="mt-0 mb-6">{sourceHeading}</h2>
              <div className="" dangerouslySetInnerHTML={{ __html: page.sourceMaterial }}></div>
            </div>
            : ''}
          </div>
        </div>
      </main>
      <Footer data={infoMenu.data} />
    </>
  );
}

type AccItem = {
  params: {
    slug: string[]
  };
  locale: string;
};

type PageItem = {
  attributes: {
    pageUrl: string,
    locale: string
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  // array of locales provided in context object in getStaticPaths
  const paths = (
    await Promise.all(
      (locales as string[]).map(async (locale: string) => {
        // map through locales
        const { data } = await client.query({
          query: gql`
          query GetAllPages($locale: I18NLocaleCode, $publicationState: PublicationState ) {
            pages(locale: $locale, publicationState: $publicationState) {
              data {
                id
                attributes {
                  title
                  slug
                  locale
                  pageUrl
                }
              }
            }
          }
          `, // fetch list of pages per locale
          variables: {
            locale,
            publicationState: 'LIVE',
          },
        });
        return {
          pages: data.pages,
          locale,
        };
      })
    )
  ).reduce((acc: AccItem[], item) => {
    item.pages.data.map((page: PageItem) => {

        // reduce through the array of returned objects
        const slugArray = page.attributes.pageUrl.split('/').filter((p: string) => p);
        const hasInfo = slugArray.includes('info');

        if (!hasInfo) {
          const accItem : AccItem = {
            params: {
              slug: slugArray,
            },
            locale: page.attributes.locale,
          }

          acc.push(accItem);
        }

        return page;
    });
    return acc;
  }, []);

  return {
      paths,
      fallback: 'blocking',
  };
};

export async function getStaticProps({ locale, params }: {
  locale: string,
  params: {
    slug: []
  }
}) {
  const slug = params.slug.at(-1);

  const result = await client.query({
    query: gql`
      query PagesWithSlug($slug: String, $locale: I18NLocaleCode) {
        pages(filters: { slug: { eq: $slug } }, locale: $locale ) {
          data {
            attributes {
              title
              slug
              content
              locale
              metaDescription
              pageUrl
              sourceMaterial
              localizations {
                data {
                  attributes {
                    pageUrl
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug, locale }
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

  const glossaryItems = await client.query({
    query: gql`
    query GlossaryItems($locale: I18NLocaleCode) {
      glossaryTerms(locale: $locale, publicationState: LIVE, sort: "termName:asc", pagination: {pageSize: 100}) {
        data {
          attributes {
            termName
            termDescription
          }
        }
      }
    }
    `,
    variables: { locale }
  });

  const glossary = (slug == 'glossary' || slug == 'sanasto') ? glossaryItems : null;

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

  if (!result.data.pages.data[0]) {
    return {
      notFound: true,
      revalidate: 1000,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      result: result.data,
      menu,
      infoMenu,
      glossary,
      menuList
    }
  };
}
