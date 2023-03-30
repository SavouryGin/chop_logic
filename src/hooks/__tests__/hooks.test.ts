import { renderHook } from '@testing-library/react';
import { useImplicationCreationPreview, useImplicationDistributionPreview, usePropositionalFormulaPreview } from 'hooks/propositions';
import { useMount } from 'hooks/common';

describe('Common hooks tests:', () => {
  it('useMount() should return isMounted value', () => {
    const { result } = renderHook(() => useMount(true, 300));

    expect(result.current).toBeTruthy();
  });

  it('useMount() should return isMounted value', () => {
    const { result } = renderHook(() => useMount(false, 300));

    expect(result.current).toBeFalsy();
  });

  it('usePropositionalFormulaPreview() should return the PropositionalExpression', () => {
    const { result } = renderHook(() => usePropositionalFormulaPreview('p'));

    expect(result.current).toEqual([{ input: 'P', position: 0, representation: 'P', type: 'variable' }]);
  });

  it('useImplicationCreationPreview() should return the PropositionalExpression', () => {
    const { result } = renderHook(() => useImplicationCreationPreview('p', 'r'));

    expect(result.current).toEqual([
      { input: 'P', position: 0, representation: 'P', type: 'variable' },
      { input: '=>', position: 1, representation: '⇒', type: 'operator' },
      { input: '(', position: 2, representation: '(', type: 'parentheses' },
      { input: 'R', position: 3, representation: 'R', type: 'variable' },
      { input: '=>', position: 4, representation: '⇒', type: 'operator' },
      { input: 'P', position: 5, representation: 'P', type: 'variable' },
      { input: ')', position: 6, representation: ')', type: 'parentheses' },
    ]);
  });

  it('useImplicationDistributionPreview() should return the PropositionalExpression', () => {
    const { result } = renderHook(() => useImplicationDistributionPreview('p', 'q', 'r'));

    expect(result.current).toEqual([
      { input: '(', representation: '(', type: 'parentheses', position: 0 },
      { input: 'P', representation: 'P', type: 'variable', position: 1 },
      { input: '=>', representation: '⇒', type: 'operator', position: 2 },
      { input: '(', representation: '(', type: 'parentheses', position: 3 },
      { input: 'Q', representation: 'Q', type: 'variable', position: 4 },
      { input: '=>', representation: '⇒', type: 'operator', position: 5 },
      { input: 'R', representation: 'R', type: 'variable', position: 6 },
      { input: ')', representation: ')', type: 'parentheses', position: 7 },
      { input: ')', representation: ')', type: 'parentheses', position: 8 },
      { input: '=>', representation: '⇒', type: 'operator', position: 9 },
      { input: '(', representation: '(', type: 'parentheses', position: 10 },
      { input: '(', representation: '(', type: 'parentheses', position: 11 },
      { input: 'P', representation: 'P', type: 'variable', position: 12 },
      { input: '=>', representation: '⇒', type: 'operator', position: 13 },
      { input: 'Q', representation: 'Q', type: 'variable', position: 14 },
      { input: ')', representation: ')', type: 'parentheses', position: 15 },
      { input: '=>', representation: '⇒', type: 'operator', position: 16 },
      { input: '(', representation: '(', type: 'parentheses', position: 17 },
      { input: 'P', representation: 'P', type: 'variable', position: 18 },
      { input: '=>', representation: '⇒', type: 'operator', position: 19 },
      { input: 'R', representation: 'R', type: 'variable', position: 20 },
      { input: ')', representation: ')', type: 'parentheses', position: 21 },
      { input: ')', representation: ')', type: 'parentheses', position: 22 },
    ]);
  });
});
