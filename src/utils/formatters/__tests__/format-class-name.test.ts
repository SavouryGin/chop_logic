import formatClass from '../format-class-name';

describe('Test formatClass function:', () => {
  it('returns a string for input [string]', () => {
    const result = formatClass(['test']);
    expect(result).toBe('test');
  });

  it('return an empty string for input [undefined]', () => {
    expect(formatClass([undefined])).toBe('');
    expect(formatClass([null])).toBe('');
    expect(formatClass([null, undefined])).toBe('');
  });

  it('return a joined string for input [string, string, ...]', () => {
    expect(formatClass(['1', '2'])).toBe('1 2');
    expect(formatClass(['A', 'B', 'C'])).toBe('A B C');
  });

  it('returns a joined string for input [string, undefined]', () => {
    expect(formatClass(['1', undefined])).toBe('1');
    expect(formatClass(['A', undefined, 'C'])).toBe('A C');
    expect(formatClass(['A', undefined, null, 'B', undefined])).toBe('A B');
  });

  it('works with the ClassNameProp type', () => {
    expect(formatClass([{ test1: true }])).toBe('test1');
    expect(formatClass([{ test1: false }])).toBe('');
    expect(formatClass([{ test1: true, test2: false, test3: true }])).toBe('test1 test3');
    expect(formatClass([{ test1: true, test2: false, test3: !!undefined, test4: true }])).toBe('test1 test4');
  });

  it('works with a mixed input', () => {
    expect(formatClass([{ test1: true }, 'test2', undefined])).toBe('test1 test2');
    expect(formatClass(['test1', { test2: false }, 'test3', undefined])).toBe('test1 test3');
    expect(formatClass(['test1', { test2: false, test3: true }, null, 'test4'])).toBe('test1 test3 test4');
  });

  it('trims the input strings', () => {
    expect(formatClass(['1  ', '  2'])).toBe('1 2');
    expect(formatClass([' A \n', '\nB', '   C'])).toBe('A B C');
    expect(formatClass([{ 'test1   ': true }])).toBe('test1');
    expect(formatClass([{ '\n test1  \n': true }])).toBe('test1');
  });
});
