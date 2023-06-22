import React from 'react';
import { Icon, Page } from 'enums';
import { LocalText } from './general';

export type RoutesMapItem = {
  id: Page;
  url: string;
  element: React.FC;
  title: LocalText;
  key: string;
  icon: Icon;
  parentPageId: Page;
};

export type PathDictionary = {
  [key in Page]: string;
};
