import { renderHook } from '@testing-library/react';
import { useMount } from 'hooks/common';
import { usePropositionalFormulaPreview } from 'hooks/propositions';

describe('Common hooks tests:', () => {
  it('useMount() should return isMounted value', () => {
    const { result } = renderHook(() => useMount(true, 300));

    expect(result.current).toBeTruthy();
  });

  it('usePropositionalFormulaPreview() should return isMounted value', () => {
    const { result } = renderHook(() => usePropositionalFormulaPreview('p'));

    expect(result.current).toEqual([{ input: 'P', position: 0, representation: 'P', type: 'variable' }]);
  });
});
