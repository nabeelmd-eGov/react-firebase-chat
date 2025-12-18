import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

const useScrollPersistence = () => {
  const getUrlKey = () => {
    // Use the current URL as the key
    return window.location.pathname;
  };

  const initialScrollPosition = () => {
    // Set the initial scroll position from storage
    const storedScrollPosition = localStorage.getItem(getUrlKey());
    return storedScrollPosition ? parseInt(storedScrollPosition, 10) : 0;
  };

  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition());

  useEffect(() => {
    console.log("document.visibilityState", document.visibilityState);
    const handleScroll = () => {
      const x = localStorage.getItem("starttime");
      const y = performance.now();
      console.log("MAMAMA", x, y, x-y);
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);
      localStorage.setItem(getUrlKey(), window.scrollY);
    };

    const handleBeforeUnload = () => {
      localStorage.setItem("starttime", performance.now());
      localStorage.setItem(getUrlKey(), window.scrollY);
    };

    // adding listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Retrieve the stored scroll position on component mount
    const storedScrollPosition = localStorage.getItem(getUrlKey());
    if (storedScrollPosition) {
      setScrollPosition(parseInt(storedScrollPosition, 10));
    }

    return () => {
      // unmounting listener
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPersistence;
