import { AppDispatch, RootState } from 'types';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHover = <T>(): [MutableRefObject<T>, boolean] => {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);

  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  useEffect(() => {
    const node: any = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, value];
};

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
