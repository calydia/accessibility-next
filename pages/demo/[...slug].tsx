import { GetStaticPaths } from 'next';
import { GetStaticPathsContext } from 'next';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDarkMode } from '@/components/useDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '@/components/Toggler';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import { useTranslation } from 'next-i18next';

export default function DemoPage({ result, menu, infoMenu, menuList }: {
  result: {
    demoPages: {
      data: [{
        attributes: {
          title: string,
          slug: string,
          metaDescription: string,
          locale: string,
          introduction: string,
          problematicExample: string,
          betterExample: string,
          finalComments: string,
          pageUrl: string,
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
  menu: {
    data: {

    }
  },
  infoMenu: {
    data: {
      id: string,
      type: string,
      path: string,
      iconClass: string
      items: {
        title: string,
        type: string,
        path: string,
        iconClass: string,
        items: {
          title: string,
          type: string,
          path: string,
          iconClass: string,
        }
      }
    }
  },
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
  const page = result.demoPages.data[0].attributes;

  const [theme, themeToggler] = useDarkMode();

  const { t } = useTranslation('common');
  const problematicHeading = t('demo-problematic-heading');
  const betterHeading = t('demo-better-heading');
  const finalHeading = t('demo-final-heading');

  const engUrl = (page.locale == 'en') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;
  const fiUrl = (page.locale == 'fi') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;

  return (
    <>
      <header id="page-top" className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
        dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header">
        <SkipLink skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <div className="flex flex-wrap justify-end gap-2">
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>
      <SearchBar />
      <MainImage />
      <Breadcrumb currentTitle={page.title} currentSlug={page.slug} menuList={menuList.data.menuTitleList.data.attributes.titleList.menuItems} />
      <main className="mb-8 md:mb-12">
        <Head>
          <title>{page.title} | Blog - Sanna Mäkinen</title>
          <meta name="Description" content={page.metaDescription} />
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
        </Head>
        <div className="max-w-[1564px] mx-auto md:px-8-px">
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{ page.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: page.introduction }} className="text-xl bodytext"></div>
            <div>
              <h2>{ problematicHeading }</h2>
              <div dangerouslySetInnerHTML={{ __html: page.problematicExample }} className="demo-wrapper text-xl bodytext example-section p-4-px lg:p-8-px border-t-4 gradient-border-light dark:gradient-border-dark"></div>
            </div>
            <div>
              <h2>{ betterHeading }</h2>
              <div dangerouslySetInnerHTML={{ __html: page.betterExample }} className="demo-wrapper text-xl bodytext example-section p-4-px lg:p-8-px border-t-4 gradient-border-light dark:gradient-border-dark"></div>
            </div>
            <div>
              <h2>{ finalHeading }</h2>
              <div dangerouslySetInnerHTML={{ __html: page.finalComments }} className="text-xl bodytext example-section p-4-px lg:p-8-px border-t-4 gradient-border-light dark:gradient-border-dark"></div>
            </div>
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
          query GetAllDemoPages($locale: I18NLocaleCode, $publicationState: PublicationState ) {
            demoPages(locale: $locale, publicationState: $publicationState) {
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
          pages: data.demoPages,
          locale,
        };
      })
    )
  ).reduce((acc: AccItem[], item) => {
    item.pages.data.map((page: PageItem) => {
      const slugArray = page.attributes.pageUrl.split('/').filter((p: string) => p);

        const accItem : AccItem = {
          params: {
            slug: slugArray,
          },
          locale: page.attributes.locale,
        }

        acc.push(accItem);
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
        demoPages(filters: { slug: { eq: $slug } }, locale: $locale ) {
          data {
            attributes {
              title
              slug
              locale
              introduction
              problematicExample
              betterExample
              finalComments
              metaDescription
              pageUrl
              localizations {
                data {
                  attributes {
                    slug
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
      ...(await serverSideTranslations(locale, ['common'])),
      result: result.data,
      menu,
      infoMenu,
      menuList
    },
    revalidate: 60
  };
}
