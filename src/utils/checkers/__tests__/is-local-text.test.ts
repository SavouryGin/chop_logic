import { isLocalText } from '../is-local-text';

describe('Test isLocalText function:', () => {
  it('negative cases', () => {
    expect(isLocalText(null)).toBeFalsy();
    expect(isLocalText(undefined)).toBeFalsy();
    expect(isLocalText(true)).toBeFalsy();
    expect(isLocalText({})).toBeFalsy();
    expect(isLocalText({ a: 1, b: 2 })).toBeFalsy();
    expect(isLocalText({ en: 'hello' })).toBeFalsy();
  });

  it('positive cases', () => {
    expect(isLocalText({ en: 'hello', ru: 'привет' })).toBeTruthy();
    expect(isLocalText({ ru: '', en: '' })).toBeTruthy();
    expect(isLocalText({ ru: '', en: '', de: '' })).toBeTruthy();
  });
});
