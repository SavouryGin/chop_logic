import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language, SettingsFlag, SettingsInitialState } from './interfaces';

export const settingsInitialState: SettingsInitialState = {
  language: 'en',
  flags: {
    isNavigationOpen: false,
    isSidebarOpen: false,
    isDarkMode: false,
    isFullScreen: false,
    isSettingOpen: false,
    isSoundsEnabled: false,
    isMenuAnimationActive: false,
    isSidebarAnimationActive: false,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers: {
    resetSettings: () => {
      return settingsInitialState;
    },

    toggleFlag: (state, action: PayloadAction<SettingsFlag>) => {
      const currentFlagValue = state.flags[action.payload];
      state.flags[action.payload] = !currentFlagValue;
    },

    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },

    setFullScreenFlag: (state, action: PayloadAction<boolean>) => {
      state.flags.isFullScreen = action.payload;
    },

    setUpFlag: (state, action: PayloadAction<{ flag: SettingsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },
  },
});

export const settingsActions = { ...settingsSlice.actions };
