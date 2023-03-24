import { GetStaticPaths } from 'next';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDarkMode } from '@/components/useDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '@/components/Toggler';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import HumanSitemap from '@/components/HumanSitemap';
import { useTranslation } from 'next-i18next';


export default function InfoPage({ result, menu, infoMenu }: any) {
  const page = result.pages.data[0].attributes;

  const [theme, themeToggler] = useDarkMode();

  const { t } = useTranslation('common');
  const mainMenuName = t('name-main-menu');
  const infoMenuName = t('name-info-menu');

  const engUrl = (page.locale == 'en') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;
  const fiUrl = (page.locale == 'fi') ? page.pageUrl : page.localizations.data[0].attributes.pageUrl;

  return (
    <>
      <header className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
        dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header">
        <SkipLink skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <div className="flex flex-wrap justify-end gap-2">
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>
      <MainImage />
      <main>
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
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto col-span-2 md:col-span-1 md:m-0 md:py-6 md:px-8-px lg:max-w-4xl">
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
      <Footer menuData={infoMenu.data} />
    </>
  );
}

// TODO what is the type of the locales?
export const getStaticPaths: GetStaticPaths = async ({ locales }: any) => {
  // array of locales provided in context object in getStaticPaths
  const paths = (
    await Promise.all(
      locales.map(async (locale: string) => {
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
  ).reduce((acc, item) => {
    item.pages.data.map((page: any) => {
        acc.push({
          params: {
            slug: page.attributes.slug,
          },
          locale: page.attributes.locale,
        });
        return page;
    });
    return acc;
  }, []);

  return {
      paths,
      fallback: false,
  };
};

export async function getStaticProps({ locale, params }: any) {
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
              pageUrl
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

  const mainMenu = await client.query({
    query: gql`
      query Menu($locale: I18NLocaleCode) {
        renderNavigation(navigationIdOrSlug: "main-navigation", type: TREE, locale: $locale) {
          id
          title
          type
          path
          items {
            title
            type
            path
            items {
              title
              type
              path
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
          items {
            title
            type
            path
            items {
              title
              type
              path
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
      infoMenu: infoMenu
    },
    revalidate: 60
  };
}