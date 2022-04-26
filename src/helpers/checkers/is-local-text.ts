import { LocalText } from 'types';

export function isLocalText(input: any): input is LocalText {
  if (!input || typeof input !== 'object') return false;
  return input.en !== undefined && input.ru !== undefined;
}
