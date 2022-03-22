import { settingsInitialState } from 'store/settings/slice';
import { SelectEntity } from 'types';

export const languageOptions: SelectEntity[] = [
  { option: 'English', value: 'en' },
  { option: 'Russian', value: 'ru' },
];

export const settingsInitialValues = {
  isDarkMode: settingsInitialState.flags.isDarkMode,
  isFullScreen: settingsInitialState.flags.isFullScreen,
  isSoundsEnabled: settingsInitialState.flags.isSoundsEnabled,
  language: settingsInitialState.language,
};
