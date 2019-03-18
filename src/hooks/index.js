import React from 'react';

export function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export function useFocusOnTrigger(ref, trigger) {
  React.useEffect(() => {
    if (trigger && ref.current) {
      ref.current.focus();
    }
  }, [trigger]);
}

export function useKeyPress(key, handler) {
  React.useEffect(() => {
    const listener = event => {
      if (key === event.key) {
        handler();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);
}

export function useAppendChild(parent, child) {
  React.useEffect(() => {
    parent.appendChild(child.current);
    return () => parent.removeChild(child.current);
  }, []);
}

export function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}
