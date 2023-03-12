import { gql } from '@apollo/client';
import { client } from '../../../lib/apollo';
import Head from 'next/head';
import Breadcrumb from '../../../components/Breadcrumb';

export default function ArticlePage({ result }: any) {
  const page = result.pages.data[0].attributes;

  return (
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
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="I would if I could" />
        <meta property="og:image" content="../some-share.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="grid custom-grid max-w-[1564px] mx-auto md:px-8-px">
        <Breadcrumb current={page.title} extraLevel="true" extraLevelName={page.category} extraLevelPath={`/`} />
        <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto col-span-2 md:col-span-1 md:m-0 md:py-6 md:px-8-px lg:max-w-4xl">
          <h1 id="skip-target" className="text-3xl font-bold mt-4 mb-2 lg:text-4xl">{ page.title }</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content }} className="text-xl bodytext"></div>
        </div>
      </div>
    </main>
  );
}

// TODO what is the type of the locales?
export async function getStaticPaths({ locales }: any) {
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
                  mainCategory {
                    data {
                      attributes {
                        slug
                      }
                    }
                  }
                  secondaryCategory {
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
        // reduce through the array of returned objects

        // Get the category paths
        const main = page.attributes.mainCategory.data.attributes.slug;
        const secondary = page.attributes.secondaryCategory.data.attributes.slug;

        acc.push({
          params: {
            slug: page.attributes.slug,
            mainCategory: main,
            secondaryCategory: secondary
          },
          locale: page.locale,
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

export async function getStaticProps({ params }: any) {
  const slug = params.slug;
  const result = await client.query({
    query: gql`
      query PagesWithSlug($slug: String) {
        pages(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              title
              slug
              locale
            }
          }
        }
      }
    `,
    variables: { slug }
  });

  return {
    props: {
      result: result.data
    },
    revalidate: 60
  };
}
