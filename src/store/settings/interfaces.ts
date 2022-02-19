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
  isAnimationActive: boolean;
}

export type Language = 'ru' | 'en';

export type SettingsFlag = keyof SettingsFlags;
