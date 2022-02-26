import formatClassName from '../format-class-name';

describe('Test formatClassName function:', () => {
  it('returns a string for input [string]', () => {
    const result = formatClassName(['test']);
    expect(result).toBe('test');
  });

  it('return an empty string for input [undefined]', () => {
    expect(formatClassName([undefined])).toBe('');
    expect(formatClassName([null])).toBe('');
    expect(formatClassName([null, undefined])).toBe('');
  });

  it('return a joined string for input [string, string, ...]', () => {
    expect(formatClassName(['1', '2'])).toBe('1 2');
    expect(formatClassName(['A', 'B', 'C'])).toBe('A B C');
  });

  it('returns a joined string for input [string, undefined]', () => {
    expect(formatClassName(['1', undefined])).toBe('1');
    expect(formatClassName(['A', undefined, 'C'])).toBe('A C');
    expect(formatClassName(['A', undefined, null, 'B', undefined])).toBe('A B');
  });

  it('works with the ClassNameProp type', () => {
    expect(formatClassName([{ test1: true }])).toBe('test1');
    expect(formatClassName([{ test1: false }])).toBe('');
    expect(formatClassName([{ test1: true, test2: false, test3: true }])).toBe('test1 test3');
    expect(formatClassName([{ test1: true, test2: false, test3: !!undefined, test4: true }])).toBe('test1 test4');
  });

  it('works with a mixed input', () => {
    expect(formatClassName([{ test1: true }, 'test2', undefined])).toBe('test1 test2');
    expect(formatClassName(['test1', { test2: false }, 'test3', undefined])).toBe('test1 test3');
    expect(formatClassName(['test1', { test2: false, test3: true }, null, 'test4'])).toBe('test1 test3 test4');
  });

  it('trims the input strings', () => {
    expect(formatClassName(['1  ', '  2'])).toBe('1 2');
    expect(formatClassName([' A \n', '\nB', '   C'])).toBe('A B C');
    expect(formatClassName([{ 'test1   ': true }])).toBe('test1');
    expect(formatClassName([{ '\n test1  \n': true }])).toBe('test1');
  });
});
