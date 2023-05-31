import {useState, useEffect, useRef} from 'react';

type UsePreviousValue<T> = (value: T) => T | undefined;

const usePreviousValue: UsePreviousValue<any> = value => {
  // @ts-ignore
  const [prevValue, setPrevValue] = useState<T | undefined>(undefined);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setPrevValue(value);
    } else {
      isFirstRender.current = false;
    }
  }, [value]);

  return prevValue;
};

export default usePreviousValue;
