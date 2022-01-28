import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { SettingsFlags } from './interfaces';

const getSettingsFlags = (state: RootState): SettingsFlags => state.settings.flags;

const getIsNavigationOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isNavigationOpen);
const getIsSidebarOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSidebarOpen);
const getIsDarkMode = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isDarkMode);
const getIsFullScreen = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isFullScreen);
const getIsSettingOpened = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSettingOpen);
const getIsSoundsEnabled = createSelector(getSettingsFlags, (data: SettingsFlags): boolean => data.isSoundsEnabled);

export const settingsSelectors = {
  getSettingsFlags,
  getIsNavigationOpened,
  getIsSidebarOpened,
  getIsDarkMode,
  getIsFullScreen,
  getIsSettingOpened,
  getIsSoundsEnabled,
};
