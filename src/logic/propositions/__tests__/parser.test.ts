import parser from '../parser';

describe('Propositions parser tests', () => {
  it('getCharsArray() method returns a correct array', () => {
    expect(parser.getCharsArray('abc')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('a b c')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('   a  bc  ')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('')).toEqual([]);
    expect(parser.getCharsArray('1')).toEqual(['1']);
  });
});
