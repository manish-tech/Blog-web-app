import { useEffect } from "react";

export default function useOutsideClick(operation, ref) {
  useEffect(() => {
    function handleClick(e) { 
      if (ref.current && !ref.current.contains(e.target)) {
        operation(e);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}
