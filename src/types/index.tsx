export type ClassNames = {
  [key in string]: boolean;
};

export type ClassNameProp = string | ClassNames;

export type ComponentProps = {
  className?: ClassNameProp;
  id?: string;
};

export type SelectEntity = {
  option: string;
  value: string | number;
  [key: string]: string | number | object;
};
