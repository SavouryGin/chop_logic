import { Language } from 'types';

export interface SettingsInitialState {
  language: Language;
  flags: SettingsFlags;
}

export interface SettingsFlags {
  isNavigationOpen: boolean;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isFullScreen: boolean;
  isSettingOpen: boolean;
  isSoundsEnabled: boolean;
  isMenuAnimationActive: boolean;
  isSidebarAnimationActive: boolean;
  isModalWindowClosingAnimationActive: boolean;
}

export type SettingsFlag = keyof SettingsFlags;
