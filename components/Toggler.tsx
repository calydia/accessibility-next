import React from 'react'
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { useTranslation } from 'next-i18next';

interface Types {
  theme: string | (() => void),
  toggleTheme: any
}

const Toggle = ({theme, toggleTheme }: Types) => {
  const { t } = useTranslation('common');
  const darkLabel = t('theme-toggle-text-dark');
  const lightlabel = t('theme-toggle-text-light');

  return (
    <button onClick={()=>toggleTheme()} className="float-right lg:absolute lg:right-0 lg:top-0 py-2 px-3 lg:py-4 lg:px-6 text-black dark:text-white border-y-4 border-transparent
    hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
    focus:outline focus:outline-2 focus:outline-offset-4 lg:focus:outline-offset-8	focus:outline-black dark:focus:outline-white"
      aria-label={ (theme === "light") ? darkLabel : lightlabel}
      title={ (theme === "light") ? darkLabel : lightlabel}
    >
      { (theme === "light") ? <HiMoon className="h-8 w-8" aria-hidden="true" /> : <HiSun className="h-8 w-8" aria-hidden="true" />}
    </button>
  );
};

export default Toggle;
