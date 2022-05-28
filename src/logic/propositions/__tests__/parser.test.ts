import parser from '../parser';

describe('Propositions parser tests', () => {
  it('getCharsArray() method returns a correct array', () => {
    expect(parser.getCharsArray('abc')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('a b c')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('   a  bc  ')).toEqual(['a', 'b', 'c']);
    expect(parser.getCharsArray('')).toEqual([]);
    expect(parser.getCharsArray('1')).toEqual(['1']);
  });

  it('joinLogicalSymbols() method returns a correct array', () => {
    expect(parser.joinLogicalSymbols(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    expect(parser.joinLogicalSymbols(['=', '>'])).toEqual(['=>']);
    expect(parser.joinLogicalSymbols(['<', '=', '>'])).toEqual(['<=>']);
    expect(parser.joinLogicalSymbols(['<', '=', '>', 'a', 'b'])).toEqual(['<=>', 'a', 'b']);
    expect(parser.joinLogicalSymbols(['a', '=', '>', 'c'])).toEqual(['a', '=>', 'c']);
    expect(parser.joinLogicalSymbols(['a', '&', 'c'])).toEqual(['a', '&', 'c']);
  });
});
