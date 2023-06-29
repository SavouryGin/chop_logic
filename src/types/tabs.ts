import React from 'react';
import { LocalText } from './general';

export type TabItem = {
  tabContent: React.ReactElement;
  tabTitle: LocalText;
  tabId: string;
};

export type TabProps = {
  title: LocalText;
  tabId: string;
  isActive: boolean;
  onSelect: (value: React.SetStateAction<string>) => void;
};

export type TabContentProps = {
  content: React.ReactElement | undefined;
  tabId: string;
};
