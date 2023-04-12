import dayjs from 'dayjs';
import Image from 'next/image';

interface BlogType {
  data: [{ title: string, path: string, created: string, image?: string }]
}

const BlogHighlights = ({data}: BlogType) => {

  return (
    <section aria-labelledby="a11y-blog-heading" className="w-full bg-slate-300 mt-12 pt-12 pb-12 md:pb-20 px-4 dark:bg-slate-900">
      <h2 id="a11y-blog-heading" className="block text-center font-bold mb-8 mt-0 text-3xl md:text-4xl text-lt-gray dark:text-white
      ">My newest blog posts on accessibility</h2>
      <div className="max-w-7xl mx-auto">
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8" role="list">

          {data.map((node, index: number) => {
                return (
                  <li key={`list-item${index}`} className="grid items-stretch p-2 border-solid border-4 gradient-border-light bg-lt-blue-light text-lt-gray
                  dark:gradient-border-dark dark:bg-dk-purple dark:text-white
                  ">
                    <a key={index} href={`https://blog.sanna.ninja/accessibility${node.path}`} className="post-link border-2 border-transparent focus:outline focus:outline-4 focus:outline-offset-15	focus:outline-black dark:focus:outline-white hover:border-lt-purple dark:hover:border-dk-blue-light">
                      { node.image &&
                        <Image
                          src={`https://drupal.ampere.corrupted.pw/${node.image}`}
                          alt=""
                          width={1025}
                          height={600}
                        />
                      }
                      <div className="self-center text-center">
                        <span id={`blog-title${index}`} className="post-title block text-lg font-bold md:text-2xl py-4 px-2
                        after:bg-black after:h-0.5 after:block after:w-10 after:mt-4 after:mb-0 after:mx-auto after:content-['']
                        dark:after:bg-white">
                          {node.title}
                        </span>
                        <span className="sr-only">on</span>
                        <span className="block text-base md:text-xl pb-4">
                          {dayjs(node.created)
                            .format(`MMMM DD, YYYY`)}
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
  );
}

export default BlogHighlights;
