import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface SkipTypes {
  skipTarget: string,
  skipTextVariable: string
}

const SkipLink = ({skipTarget, skipTextVariable}: SkipTypes) => {
  const { t } = useTranslation('common');
  const skipText = t(skipTextVariable);

  return (
  <Link href={`#${skipTarget}`} id="skip" className="sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8 text-xl focus:p-4 text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white dark:text-shadow-text">
    {skipText}
  </Link>
  );
};

export default SkipLink;
