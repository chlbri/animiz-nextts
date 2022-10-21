import { useCallback, useEffect, useRef } from 'react';

const useClickOutsideHandler = <T>(handler: () => T) => {
  const ref = useRef<HTMLElement>();

  const handleClickOutside = useCallback(
    (event: Event) => {
      const check = !ref.current?.contains(event.target as Node);
      check && handler();
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutsideHandler;
