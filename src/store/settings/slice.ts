import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type language = 'ru' | 'en';

interface SettingsInitialState {
  isMenuOpen: boolean;
  language: language;
}

const initialState: SettingsInitialState = {
  isMenuOpen: false,
  language: 'en',
};

export const counterSlice = createSlice({
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
