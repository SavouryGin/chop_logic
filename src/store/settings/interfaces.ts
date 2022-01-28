export interface SettingsInitialState {
  language: Language;
  flags: SettingsFlags;
}

export interface SettingsFlags {
  isNavigationOpen: boolean;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isFullScreen: boolean;
  isSettingPopupOpen: boolean;
  isSoundsEnabled: boolean;
}

export type Language = 'ru' | 'en';

export type SettingsFlag = keyof SettingsFlags;
