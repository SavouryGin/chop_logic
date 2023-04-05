import { Language, RootState } from 'types';
import { SettingsFlags } from '../interfaces';
import { createSelector } from '@reduxjs/toolkit';

const flags = (state: RootState): SettingsFlags => state.settings.flags;
const language = (state: RootState): Language => state.settings.language;

const isNavigationOpened = createSelector(flags, (data: SettingsFlags): boolean => data.isNavigationOpen);
const isSidebarOpened = createSelector(flags, (data: SettingsFlags): boolean => data.isSidebarOpen);
const isDarkMode = createSelector(flags, (data: SettingsFlags): boolean => data.isDarkMode);
const isFullScreen = createSelector(flags, (data: SettingsFlags): boolean => data.isFullScreen);
const isSettingOpened = createSelector(flags, (data: SettingsFlags): boolean => data.isSettingOpen);
const isSoundsEnabled = createSelector(flags, (data: SettingsFlags): boolean => data.isSoundsEnabled);

export const settingsSelectors = {
  flags,
  language,
  isNavigationOpened,
  isSidebarOpened,
  isDarkMode,
  isFullScreen,
  isSettingOpened,
  isSoundsEnabled,
};
