import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import React from 'react';
import { FaSitemap, FaGlasses } from 'react-icons/fa';
import {
  HiQuestionMarkCircle,
  HiUserGroup,
  HiDocumentText,
  HiScale,
  HiBookOpen,
  HiAcademicCap,
  HiDocumentSearch,
  HiShieldCheck,
  HiDocumentAdd,
  HiFlag,
  HiTemplate,
  HiCode,
  HiColorSwatch,
  HiCursorClick,
  HiPuzzle,
  HiTerminal,
  HiSpeakerphone,
  HiDocumentDuplicate,
  HiClipboardList,
  HiUser,
  HiCloud } from 'react-icons/hi';

const MenuIcon = (iconClass: {iconClass: string, iconPosition: string}): JSX.Element => {
  // Main menu icons
  if (iconClass.iconClass == 'icon--question') {
    return (
      <>
        <HiQuestionMarkCircle className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--user-group') {
    return (
      <>
        <HiUserGroup className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--document-text') {
    return (
      <>
        <HiDocumentText className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--scale') {
    return (
      <>
        <HiScale className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--book-open') {
    return (
      <>
        <HiBookOpen className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--academic-cap') {
    return (
      <>
        <HiAcademicCap className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--document-search') {
    return (
      <>
        <HiDocumentSearch className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--shield-check') {
    return (
      <>
        <HiShieldCheck className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--document-add') {
    return (
      <>
        <HiDocumentAdd className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--flag') {
    return (
      <>
        <HiFlag className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--template') {
    return (
      <>
        <HiTemplate className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--code') {
    return (
      <>
        <HiCode className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--document-duplicate') {
    return (
      <>
        <HiDocumentDuplicate className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--glasses') {
    return (
      <>
        <FaGlasses className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--color-swatch') {
    return (
      <>
        <HiColorSwatch className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--cursor-click') {
    return (
      <>
        <HiCursorClick className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--puzzle') {
    return (
      <>
        <HiPuzzle className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--terminal') {
    return (
      <>
        <HiTerminal className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--speakerphone') {
    return (
      <>
        <HiSpeakerphone className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }
  if (iconClass.iconClass == 'icon--cloud') {
    return (
      <>
        <HiCloud className={`icon--${iconClass.iconPosition} menu-icon`} aria-hidden="true" />
      </>
    );
  }

  // Footer icons
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
