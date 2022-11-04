import { CommonProps, LocalText } from './general';
import { Icon, Page } from 'enums';

export type AppLinkProps = CommonProps & {
  path: string;
  text?: string;
  icon?: Icon;
  isNavigation?: boolean;
};

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
