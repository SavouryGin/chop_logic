import { AppDispatch, RootState } from 'types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const effectFn = useRef<() => void | (() => void)>(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState<number>(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!rendered.current) {
        return;
      }

      // otherwise this is not a dummy destroy, so call destroy func
      if (destroyFn.current) {
        destroyFn.current();
      }
    };
  }, []);
};

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
