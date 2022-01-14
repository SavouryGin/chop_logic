import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type language = 'ru' | 'en';

export interface SettingsInitialState {
  isMenuOpen: boolean;
  language: language;
}

export const initialState: SettingsInitialState = {
  isMenuOpen: false,
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: () => {
      return initialState;
    },

    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },

    setLanguage: (state, action: PayloadAction<language>) => {
      state.language = action.payload;
    },
  },
});
