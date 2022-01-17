import formatClassName from '../format-class-name';

describe('Test formatClassName function:', () => {
  it('returns a string for input: [string]', () => {
    const result = formatClassName(['test']);
    expect(result).toBe('test');
  });

  it('return a joined string for input: [string, string, ...]', () => {
    expect(formatClassName(['1', '2'])).toBe('1 2');
    expect(formatClassName(['A', 'B', 'C'])).toBe('A B C');
  });
});
