import { LocalText } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLocalText(input: any): input is LocalText {
  if (!input || typeof input !== 'object') return false;
  return input.en !== undefined && input.ru !== undefined;
}
