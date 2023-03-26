import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import React from 'react';
import { FaSitemap } from 'react-icons/fa';
import { HiInformationCircle, HiClipboardList, HiUser } from 'react-icons/hi';

const MenuIcon = (iconClass: {iconClass: string, iconPosition: string}): JSX.Element => {
  if (iconClass.iconClass == 'icon--about') {
    return (
      <>
        <HiUser className={`icon--${iconClass.iconPosition} h-8 w-8`} aria-hidden="true" />
      </>
    );
  }
  else if (iconClass.iconClass == 'icon--sitemap') {
    return (
      <>
        <FaSitemap className={`icon--${iconClass.iconPosition} h-8 w-8`} aria-hidden="true" />
      </>
    );
  }
  else if (iconClass.iconClass == 'icon--statement') {
    return (
      <>
        <HiClipboardList className={`icon--${iconClass.iconPosition} h-8 w-8`} aria-hidden="true" />
      </>
    );
  }
  else {
    return <></>;
  }
};

export default MenuIcon;
