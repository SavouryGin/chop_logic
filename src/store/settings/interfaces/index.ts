import { Language } from 'types';

export interface SettingsInitialState {
  language: Language;
  flags: SettingsFlags;
}

export interface SettingsFlags {
  isNavigationOpened: boolean;
  isDarkMode: boolean;
  isFullScreen: boolean;
  isSettingsOpened: boolean;
  isSoundsEnabled: boolean;
}

export type SettingsFlag = keyof SettingsFlags;
