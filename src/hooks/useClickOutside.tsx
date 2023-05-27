import React, { useEffect } from "react";

const useClickOutside = (
  element: React.RefObject<HTMLElement>,
  handler: Function
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        !element.current ||
        element.current.contains(e.target as HTMLElement)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [element, handler]);
};

export default useClickOutside;
