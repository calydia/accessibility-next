import Head from 'next/head';
import Image from 'next/image';

import { gql } from '@apollo/client';
import { client } from '../lib/apollo';

export default function Glossary({listing}: any) {
  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <meta property="og:url" content="https://a11y.sanna.ninja/" />
        <meta property="og:image" content="../images/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        This will be the glossary page
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray">Glossary intro content</div>

    </main>
  )
}

export async function getStaticProps() {
  const listing = await client.query({
    query: gql`
      query GetA11yArticles {
        articles(limit: 3, category: 21) {
          items {
            title
            slug
            date
            listingImage
            category
          }
        }
      }
    `
  });

  return {
    props: {
      listing: listing.data.articles
    },
    revalidate: 60
  };
}
