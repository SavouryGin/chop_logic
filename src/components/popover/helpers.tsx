import { PopoverPosition, Rect } from 'components/popover';
import { useCallback, useEffect, useRef } from 'react';

export const getPopoverCoords = (triggerRect: Rect, popoverRect: Rect, position: PopoverPosition) => {
  switch (position) {
    case 'bottom-center':
    default: {
      // TODO: cover all positions
      let top = triggerRect.top + triggerRect.height + 10;
      const left = Math.max(triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2, 10);

      // failover to top if there is not enough space
      if (top + popoverRect.height > window.innerHeight - 10) {
        top = triggerRect.top - 10 - popoverRect.height;
      }

      return {
        top,
        left,
      };
    }
  }
};

// TODO: better focusable query

// some hooks
export const useFocusTrapping = () => {
  const focusableQuery = ':is(input, button, [tab-index]';
  // @ts-ignore TODO: fix the typings
  const refTrigger = useRef<HTMLElement>(document.activeElement);
  const ref = useRef<HTMLElement>(null);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const popover = ref.current;
    if (popover == null) {
      return;
    }
    const focusables = [...popover.querySelectorAll(focusableQuery)];

    switch (e.key) {
      case 'Tab': {
        // check if it is the last focusable
        const lastFocusable = focusables[focusables.length - 1];
        if (document.activeElement === lastFocusable) {
          // @ts-ignore, TODO: fix typing
          focusables[0]?.focus();

          e.preventDefault();
        }
      }
    }
  }, []);

  useEffect(() => {
    const popover = ref.current;
    if (popover == null) {
      return;
    }

    const focusables = [...popover.querySelectorAll(focusableQuery)];
    // 1. focus the first focusable
    // @ts-ignore, TODO: fix typing
    focusables[0]?.focus();
    console.log('mount popover focusing', focusables[0]);

    // 2. attach keyboard event listener to trap the focus
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);

      // 3. refocus the trigger after dismissing
      // but only if the current activeElement is body
      // since this happens after popover is gone
      // TODO: am I right about this?
      const trigger = refTrigger.current;
      const currentActiveElement = document.activeElement;
      if (currentActiveElement == document.body) {
        trigger?.focus();
      }
    };
  }, []);

  return ref;
};

export const mergeRef = (...refs: any[]) => {
  return (el: any) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el);
      } else {
        ref.current = el;
      }
    });
  };
};

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (element == null) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      if (!element.contains(e.target as any)) {
        console.log('clicked outside');
        callback();
      }
    };

    // delay it to avoid treating trigger click as click outside
    window.setTimeout(() => document.addEventListener('click', onClick), 0);

    return () => {
      window.setTimeout(() => document.removeEventListener('click', onClick), 0);
    };
  }, []);

  return ref;
};
