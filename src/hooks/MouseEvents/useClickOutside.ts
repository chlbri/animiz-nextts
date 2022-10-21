import { useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = () => {
  const [isOutside, setIsOutside] = useState(true);
  const ref = useRef<HTMLElement>();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const current = ref.current;
      const outside = !current || !current.contains(event.target as Node);
      setIsOutside(outside);
    },
    [setIsOutside]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return {
    ref,
    isOutside,
  } as const;
};

export default useClickOutside;
