export type Language = 'ru' | 'en';

export type LocalText = { [key in Language]: string };

export type ClassNames = {
  [key in string]: boolean;
};

export type ClassNameProp = string | ClassNames;

export type ComponentProps = {
  className?: ClassNameProp;
  id?: string;
};
