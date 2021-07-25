import React from "react";
import { useRef } from "react";

export default function useWindowSize() {
  const isSSR = typeof window !== "undefined";
  const initial=useRef(window.innerWidth)
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? initial.current : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}