import { useEffect, useState } from "react";

const useDebounce = (value: any, delay = 300) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return val;
};

export default useDebounce;
