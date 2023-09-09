import { GetStaticPropsContext } from 'next';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UseDarkMode } from '@/components/UseDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '@/components/Toggler';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import BlogHighlights from '@/components/BlogHighlights';
import { useTranslation } from 'next-i18next';
import { NodeArticle, MediaType } from '@/interfaces/jsonInterfaces';
import { MainMenuData, MenuData } from '@/interfaces/menuInterfaces';
import { BlogData } from '@/interfaces/blogInterfaces';
import SearchBlock from '@/components/SearchBlock';

export default function FrontPage({ result, menu, infoMenu, menuList, blogs }: {
  result: {
    frontPage: {
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

  },
  blogs: [{ title: string, path: string, created: string, image?: string }]
}) {

  const page = result.frontPage.data.attributes;

  const [theme, themeToggler] = UseDarkMode();

  const engUrl = '/';
  const fiUrl = '/fi';

  const { t } = useTranslation('common');
  const siteName = t('site-name');

  return (
    <>
      <header id="page-top" className="bg-gradient-to-r from-lt-perfume via-lt-blue-light to-lt-perfume
        dark:from-dk-purple-header dark:via-dk-blue-header dark:to-dk-purple-header">
        <SkipLink skipId="skip" skipTarget="skip-target" skipTextVariable="skip-link-text" />
        <div className="flex flex-wrap justify-end gap-1">
          <SearchBlock locale={page.locale} />
          <LanguageSwitcher englishURL={engUrl} finnishURL={fiUrl} locale={page.locale} />
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
        <Header data={menu.data} />
      </header>
      <MainImage />
      <Breadcrumb currentTitle={page.title} currentSlug={page.slug} menuList={menuList.data.menuTitleList.data.attributes.titleList.menuItems} />
      <main>
        <Head>
          <title>{page.title} | Sanna Mäkinen - {siteName}</title>
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
          <link rel="alternate" hrefLang="fi" href={`https://a11y.sanna.ninja/fi`} />
          <link rel="alternate" hrefLang="en" href={`https://a11y.sanna.ninja`} />
        </Head>
        <div className="max-w-[1564px] mx-auto md:px-8-px">
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{ page.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} className="text-xl bodytext"></div>
          </div>
        </div>
      </main>
      { (page.locale === "en" && blogs) ?
        <>
          <BlogHighlights data={blogs} />
        </>
        : null }
      <Footer data={infoMenu.data} />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  const result = await client.query({
    query: gql`
      query FrontPage($locale: I18NLocaleCode) {
        frontPage(locale: $locale) {
          data {
            attributes {
              title
              content
              metaDescription
              locale
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

    const drupalArticles = await fetch('https://drupal.ampere.corrupted.pw/blogs/node/article?sort=-created&page[limit]=3&filter[field_blog_category.id][value]=a4bd8146-d52f-471f-9c07-bff738f81a47&include=field_blog_listing_image.field_media_image&fields[file--file]=uri,url');
    const articles = await drupalArticles.json();
    const posts: { title: string, path: string, created: string, image?: string}[] = [];

    if (articles) {
      const includedFiles = articles.included.filter((item: MediaType) => item.type === 'file--file');
      const includedMedia = articles.included.filter((item: MediaType) => item.type === 'media--image');

      articles.data.map((item: NodeArticle) => {
        let fileURL;

          let mediaID = item.relationships.field_blog_listing_image.data.id;

          if (mediaID) {
            let listedMedia = includedMedia.find((mediaItem: MediaType ) => mediaItem.id == mediaID);

            if (listedMedia) {
              let fileID = listedMedia.relationships.field_media_image.data.id;
              let listingFile = includedFiles.find((fileItem: MediaType) => fileItem.id == fileID);
              fileURL = listingFile.attributes.uri.url;
            }
          }

          let file = (fileURL) ? fileURL : null;

          posts.push({
            'title': item.attributes.title,
            'path': item.attributes.path.alias,
            'created': item.attributes.created,
            'image': file
          });
      });
    }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      result: result.data,
      menu,
      infoMenu,
      menuList,
      blogs: posts
    }
  };
}
