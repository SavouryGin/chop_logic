import { ComponentProps } from './general';

export type TabItem = {
  tabContent: React.ReactElement;
  tabTitle: string;
  tabId?: string;
  defaultTab?: number;
};

export type TabListProps = ComponentProps & {
  tabs: TabItem[];
};

export type TabProps = {
  title: string;
  content: React.ReactElement;
  tabId: string;
};
