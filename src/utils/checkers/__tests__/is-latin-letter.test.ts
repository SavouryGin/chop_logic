import { isLatinLetter } from '../is-latin-letter';

describe('Test isLatinLetter function:', () => {
  it('negative cases', () => {
    expect(isLatinLetter('')).toBeFalsy();
    expect(isLatinLetter('hello')).toBeFalsy();
    expect(isLatinLetter('а')).toBeFalsy();
    expect(isLatinLetter('о')).toBeFalsy();
    expect(isLatinLetter('1')).toBeFalsy();
    expect(isLatinLetter('#')).toBeFalsy();
  });

  it('positive cases', () => {
    expect(isLatinLetter('a')).toBeTruthy();
    expect(isLatinLetter('S')).toBeTruthy();
    expect(isLatinLetter('o')).toBeTruthy();
  });
});
