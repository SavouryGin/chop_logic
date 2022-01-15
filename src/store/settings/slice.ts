import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type language = 'ru' | 'en';

export interface SettingsInitialState {
  isNavigationOpen: boolean;
  language: language;
}

export const initialState: SettingsInitialState = {
  isNavigationOpen: false,
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: () => {
      return initialState;
    },

    toggleNavigation: (state) => {
      state.isNavigationOpen = !state.isNavigationOpen;
    },

    setLanguage: (state, action: PayloadAction<language>) => {
      state.language = action.payload;
    },
  },
});

export const settingsActions = { ...settingsSlice.actions };
