import Image from 'next/image';
import Script from 'next/script'

const Footer = () => {
  return (
    <footer className="mt-12 p-4-px lg:p-12-px border-t-8 border-solid border-blue-tory bg-lt-blue-light dark:bg-dk-purple">
      <div className="md:flex md:justify-between max-w-[1500px] mx-auto">
        <a
          href="https://sanna.ninja"
          className="flex align-center font-bold p-2 m-1 border-y-4 border-transparent text-lt-blue-dark lg:text-xl text-lt-blue-darkest dark:text-dk-blue-light
          hover:text-lt-purple hover:dark:text-dk-blue-light hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-8	focus:outline-black dark:focus:outline-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="logo-dark mr-2.5">
            <Image
              src="/sm-logo-darkblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
          <span className="logo-light mr-2.5">
            <Image
              src="/sm-logo-lightblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
          My portfolio
        </a>
        <div className="links">
          <a
            href="https://blog.sanna.ninja"
            className="flex align-center text-lt-blue-dark lg:text-xl font-bold border-y-4 border-transparent p-2 m-1 text-lt-blue-darkest dark:text-dk-blue-light
            hover:text-lt-purple hover:dark:text-dk-blue-light hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
            focus:outline focus:outline-2 focus:outline-offset-8	focus:outline-black dark:focus:outline-white"
            target="_blank"
            rel="noopener noreferrer"
          >
          <span className="logo-dark mr-2.5">
            <Image
              src="/sm-logo-darkblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
          <span className="logo-light mr-2.5">
            <Image
              src="/sm-logo-lightblue.png"
              alt=""
              width={35}
              height={27}
              aria-hidden="true"
            />
          </span>
            <span className="ml-2.5">My blog</span>
          </a>
        </div>
      </div>
      <Script src="/skip-content.js"></Script>
    </footer>
  );
};

export default Footer;
