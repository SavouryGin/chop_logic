import { Browser } from 'enums';
import { detectBrowser } from '../detect-browser';

describe('Test detectBrowser function:', () => {
  it('Unknown browser', () => {
    expect(detectBrowser('')).toBe(Browser.Unknown);
  });

  it('Opera browser', () => {
    expect(detectBrowser('something Opera')).toBe(Browser.Opera);
    expect(detectBrowser('Opera something')).toBe(Browser.Opera);
  });

  it('Chrome browser', () => {
    expect(detectBrowser('something Chrome')).toBe(Browser.Chrome);
    expect(detectBrowser('Chrome something')).toBe(Browser.Chrome);
  });

  it('Safari browser', () => {
    expect(detectBrowser('something Safari')).toBe(Browser.Safari);
    expect(detectBrowser('Safari something')).toBe(Browser.Safari);
  });

  it('Firefox browser', () => {
    expect(detectBrowser('something Firefox')).toBe(Browser.Firefox);
    expect(detectBrowser('Firefox something')).toBe(Browser.Firefox);
  });
});
