import { Language, RootState } from 'types';
import { SettingsFlags } from '../interfaces';
import { createSelector } from '@reduxjs/toolkit';

const flags = (state: RootState): SettingsFlags => state.settings.flags;
const language = (state: RootState): Language => state.settings.language;

const isNavigationOpened = createSelector(flags, (data: SettingsFlags): boolean => data.isNavigationOpened);
const isDarkMode = createSelector(flags, (data: SettingsFlags): boolean => data.isDarkMode);
const isFullScreen = createSelector(flags, (data: SettingsFlags): boolean => data.isFullScreen);
const isSettingsOpened = createSelector(flags, (data: SettingsFlags): boolean => data.isSettingsOpened);
const isSoundsEnabled = createSelector(flags, (data: SettingsFlags): boolean => data.isSoundsEnabled);

export const settingsSelectors = {
  flags,
  language,
  isNavigationOpened,
  isDarkMode,
  isFullScreen,
  isSettingsOpened,
  isSoundsEnabled,
};
