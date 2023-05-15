import { Language } from 'types';

export interface SettingsInitialState {
  language: Language;
  flags: SettingsFlags;
}

export interface SettingsFlags {
  isNavigationOpen: boolean;
  isDarkMode: boolean;
  isFullScreen: boolean;
  isSettingOpen: boolean;
  isSoundsEnabled: boolean;
}

export type SettingsFlag = keyof SettingsFlags;
