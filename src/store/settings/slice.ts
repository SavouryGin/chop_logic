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
    isSoundsEnabled: true,
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
  },
});

export const settingsActions = { ...settingsSlice.actions };
