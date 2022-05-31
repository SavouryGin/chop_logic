import { ClassNameProp, LocalText } from './general';
import { Icon, Page } from 'enums';

export type AppLinkProps = {
  path: string;
  text?: string;
  icon?: Icon;
  isNavigation?: boolean;
  className?: ClassNameProp;
};

export type RoutesMapItem = {
  id: Page;
  url: string;
  element: React.FC;
  title: LocalText;
  key: string;
  icon: Icon;
};

export type PathDictionary = {
  [key in Page]: string;
};
