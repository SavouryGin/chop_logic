import { ComponentProps } from './general';

export type TabListProps = ComponentProps & {
  tabs: TabItem[];
  defaultTabId?: string;
  mode?: 'vertical' | 'horizontal';
};

export type TabItem = {
  tabContent: React.ReactElement;
  tabTitle: string;
  tabId: string;
};

export type TabProps = {
  title: string;
  content: React.ReactElement;
  tabId: string;
  isActive: boolean;
  onSelect: (value: React.SetStateAction<string>) => void;
};

export type TabTitleProps = {
  title: string;
  tabId: string;
  onSelect: (value: React.SetStateAction<string>) => void;
};

export type TabContentProps = {
  content: React.ReactElement | undefined;
  tabId: string;
};
