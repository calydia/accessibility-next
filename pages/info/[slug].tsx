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
import HumanSitemap from '@/components/HumanSitemap';
import { useTranslation } from 'next-i18next';


export default function InfoPage({ result, menu, infoMenu, menuList }: {
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
          localizations: {
            data: [{
              attributes: {
                pageUrl: string,
                slug: string
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
  const page = result.pages.data[0].attributes;

  const [theme, themeToggler] = useDarkMode();

  const { t } = useTranslation('common');
  const mainMenuName = t('name-main-menu');
  const infoMenuName = t('name-info-menu');

  const engUrl = (page.locale == 'en') ? page.slug : page.localizations.data[0].attributes.slug;
  const fiUrl = (page.locale == 'fi') ? page.slug : page.localizations.data[0].attributes.slug;

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
            <div dangerouslySetInnerHTML={{ __html: page.content }} className="text-xl bodytext"></div>

            { (page.slug === "sitemap" || page.slug === 'sivukartta') ?
            <>
              <h2>{mainMenuName}</h2>
              <HumanSitemap data={menu.data} keyPrefix="sm-main" />
              <h2>{infoMenuName}</h2>
              <HumanSitemap data={infoMenu.data} keyPrefix="sm-info" />
            </>
            : null }

          </div>
        </div>
      </main>
      <Footer data={infoMenu.data} />
    </>
  );
}

type AccItem = {
  params: {
    slug: string
  };
  locale: string;
};

type PageItem = {
  attributes: {
    slug: string,
    locale: string,
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
      const accItem : AccItem = {
        params: {
          slug: page.attributes.slug,
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
  const slug = params.slug;

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
              slug
              localizations {
                data {
                  attributes {
                    slug
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

  const mainMenu = await client.query({
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
      menu: mainMenu,
      infoMenu,
      menuList
    },
    revalidate: 60
  };
}
