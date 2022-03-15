import { Browser } from 'enums/browser';

export function detectBrowser(): Browser {
  if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1) {
    return Browser.Opera;
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    return Browser.Chrome;
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    return Browser.Safari;
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    return Browser.Firefox;
  } else {
    return Browser.Unknown;
  }
}
