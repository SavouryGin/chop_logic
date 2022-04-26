import { Browser } from 'enums/browser';

export function detectBrowser(userAgent: string): Browser {
  if (userAgent.indexOf('Opera') != -1) {
    return Browser.Opera;
  } else if (userAgent.indexOf('Chrome') != -1) {
    return Browser.Chrome;
  } else if (userAgent.indexOf('Safari') != -1) {
    return Browser.Safari;
  } else if (userAgent.indexOf('Firefox') != -1) {
    return Browser.Firefox;
  } else {
    return Browser.Unknown;
  }
}
