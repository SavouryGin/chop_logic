import { renderHook } from '@testing-library/react';
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
});
