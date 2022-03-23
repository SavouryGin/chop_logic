import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Language, SettingsFlags } from './interfaces';

const getSettingsFlags = (state: RootState): SettingsFlags => state.settings.flags;
const getLanguage = (state: RootState): Language => state.settings.language;

const getIsNavigationOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isNavigationOpen);
const getIsSidebarOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSidebarOpen);
const getIsDarkMode = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isDarkMode);
const getIsFullScreen = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isFullScreen);
const getIsSettingOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSettingOpen);
const getIsSoundsEnabled = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSoundsEnabled);
const getIsMenuAnimationActive = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isMenuAnimationActive);
const getIsSidebarAnimationActive = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSidebarAnimationActive);
const getIsModalWindowClosingAnimationActive = createSelector(
  getSettingsFlags,
  (data: SettingsFlags): boolean => data.isModalWindowClosingAnimationActive,
);

export const settingsSelectors = {
  getSettingsFlags,
  getLanguage,
  getIsNavigationOpened,
  getIsSidebarOpened,
  getIsDarkMode,
  getIsFullScreen,
  getIsSettingOpened,
  getIsSoundsEnabled,
  getIsMenuAnimationActive,
  getIsSidebarAnimationActive,
  getIsModalWindowClosingAnimationActive,
};
