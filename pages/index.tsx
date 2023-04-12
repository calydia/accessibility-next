import { GetStaticPaths } from 'next';
import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDarkMode } from '../components/useDarkMode';
import SkipLink from '@/components/SkipLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Toggle from '../components/Toggler';
import Header from '../components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import MainImage from '@/components/MainImage';
import BlogHighlights from '@/components/BlogHighlights';

export default function FrontPage({ result, menu, infoMenu, menuList, blogs }: any) {
  const page = result.frontPage.data.attributes;

  const [theme, themeToggler] = useDarkMode();

  const engUrl = '/';
  const fiUrl = '/fi';

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
      <SearchBar />
      <MainImage />
      <Breadcrumb currentTitle={page.title} currentSlug={page.slug} menuList={menuList.data.menuTitleList.data.attributes.titleList.menuItems} />
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
          <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
            <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{ page.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} className="text-xl bodytext"></div>
          </div>
        </div>
      </main>
      <BlogHighlights data={blogs} />
      <Footer data={infoMenu.data} />
    </>
  );
}

export async function getStaticProps({ locale }: any) {

  const result = await client.query({
    query: gql`
      query FrontPage($locale: I18NLocaleCode) {
        frontPage(locale: $locale) {
          data {
            attributes {
              title
              content
              metaDescription
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
      const includedFiles = articles.included.filter((item:any) => item.type === 'file--file');
      const includedMedia = articles.included.filter((item:any) => item.type === 'media--image');

      articles.data.map((item: any) => {
        let fileURL;

          let mediaID = item.relationships.field_blog_listing_image.data.id;

          if (mediaID) {
            let listedMedia = includedMedia.find((mediaItem: any) => mediaItem.id == mediaID);

            if (listedMedia) {
              let fileID = listedMedia.relationships.field_media_image.data.id;
              let listingFile = includedFiles.find((fileItem: any) => fileItem.id == fileID);
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
      ...(await serverSideTranslations(locale, ['common'])),
      result: result.data,
      menu,
      infoMenu,
      menuList,
      blogs: posts

    },
    revalidate: 60
  };
}
