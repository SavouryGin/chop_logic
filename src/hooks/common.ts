import { AppDispatch, RootState } from 'types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMount = (isOpened: boolean, delay = 200): boolean => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpened && !isMounted) {
      setMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        setMounted(false);
      }, delay);
    }
  }, [isOpened]);

  return isMounted;
};
