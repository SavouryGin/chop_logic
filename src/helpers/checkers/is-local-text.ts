import { LocalText } from 'types';

export function isLocalText(input: any): input is LocalText {
  return input.en !== undefined && input.ru !== undefined;
}
