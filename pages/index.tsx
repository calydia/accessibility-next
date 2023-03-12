import Head from 'next/head';
import Image from 'next/image';

import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import dayjs from 'dayjs';

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


    </main>
  )
}
