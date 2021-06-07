import { useCallback, useRef } from "react";

export default function useDebounce(expensiveFunction, limit) {
  const once = useRef(false);
  const betterFunction = useRef(() => {});

  const find = useCallback(() => {
    let id;
    once.current = true;
    return function betterFunction() {
      let context = this;
      let args = arguments;
      clearTimeout(id);
      id = setTimeout(() => {
        expensiveFunction.apply(context, args);
      }, limit);
    };
  }, []);

  if (!once.current) {
    betterFunction.current = find();
    return betterFunction.current;
  } else {
    return betterFunction.current;
  }
}
