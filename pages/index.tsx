import Head from 'next/head';
import Image from 'next/image';

import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import dayjs from 'dayjs';

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home({listing}: any) {
  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <meta property="og:url" content="https://a11y.sanna.ninja/" />
        <meta property="og:image" content="../some-share.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </Head>
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        Sivulle otsikko
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray">Sivulle sisältöä</div>

        <section aria-label="Newest accessibility posts from my blog" className="mt-12 md:p-4-px lg:p-8-px md:border-4 gradient-border-light dark:gradient-border-dark">
        <h2 className="block md:text-center font-bold mb-8 mt-0 text-3xl md:text-4xl text-lt-gray dark:text-white
        ">My newest posts on accessibility</h2>
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8" role="list">
            {listing.items.map((node: any, index: number) => {
                  return (
                    <li key={`list-item${index}`} className="grid items-stretch p-2 border-solid border-4 gradient-border-light bg-lt-blue-light text-lt-gray
                    dark:gradient-border-dark dark:bg-dk-purple dark:text-white
                    ">
                      <a key={index} href={`https://blog.sanna.ninja/${node.category.toLowerCase()}${node.slug}`} className="post-link border-2 border-transparent focus:outline focus:outline-4 focus:outline-offset-15	focus:outline-black dark:focus:outline-white hover:border-lt-purple dark:hover:border-dk-blue-light">
                        <Image
                          src={node.listingImage}
                          alt=""
                          width={690}
                          height={404}
                        />
                        <div className="self-center text-center">
                          <span id={`blog-title${index}`} className="post-title block text-lg font-bold md:text-2xl py-4 px-2
                          after:bg-black after:h-0.5 after:block after:w-10 after:mt-4 after:mb-0 after:mx-auto after:content-['']
                          dark:after:bg-white">
                            {node.title}
                          </span>
                          <span className="sr-only">on</span>
                          <span className="block text-base md:text-xl pb-4">
                            {dayjs(node.date)
                              .format(`MMMM DD, YYYY`)}{' '}
                            <span aria-hidden="true">|</span> <span className="sr-only">in category</span> {node.category}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                }
              )
            }
          </ul>
        </div>
      </section>
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
