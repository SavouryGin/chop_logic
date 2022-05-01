import { store } from 'store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Language = 'ru' | 'en';

export type LocalText = { [key in Language]: string };

export type TextContainer = { [key in string]: LocalText };

export type ClassNames = {
  [key in string]: boolean;
};

export type ClassNameProp = string | ClassNames;

export type ComponentProps = {
  className?: ClassNameProp;
  id?: string;
};
