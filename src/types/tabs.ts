import { ComponentProps } from './general';

export type TabItem = {
  tabContent: React.ReactElement;
  tabTitle: string;
  tabId: string;
};

export type TabListProps = ComponentProps & {
  tabs: TabItem[];
  defaultTabId?: string;
};

export type TabProps = {
  title: string;
  content: React.ReactElement;
  tabId: string;
  isActive: boolean;
  onSelect: (value: React.SetStateAction<string>) => void;
};
