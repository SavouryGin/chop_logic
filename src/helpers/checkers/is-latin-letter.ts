import regularExpressions from 'helpers/regular-expressions';

export function isLatinLetter(input: string): boolean {
  if (input.length === 1 && regularExpressions.onlyLatinLetters.test(input)) {
    return true;
  }

  return false;
}
