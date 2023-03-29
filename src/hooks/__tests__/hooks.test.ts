import { renderHook } from '@testing-library/react';
import { useImplicationCreationPreview, usePropositionalFormulaPreview } from 'hooks/propositions';
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

  it('usePropositionalFormulaPreview() should return isMounted value', () => {
    const { result } = renderHook(() => usePropositionalFormulaPreview('p'));

    expect(result.current).toEqual([{ input: 'P', position: 0, representation: 'P', type: 'variable' }]);
  });

  it('useImplicationCreationPreview() should return isMounted value', () => {
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
});
