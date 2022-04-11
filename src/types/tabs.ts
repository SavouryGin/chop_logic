import { ComponentProps } from './general';

export type TabItem = {
  tabKey: number;
  tabContent: React.ReactElement;
  defaultTab?: number;
};

export type TabListProps = ComponentProps & {
  tabs: TabItem[];
};

export type TabProps = {
  label?: string;
  content: React.ReactElement;
  isDisabled?: boolean;
  key: number;
};
