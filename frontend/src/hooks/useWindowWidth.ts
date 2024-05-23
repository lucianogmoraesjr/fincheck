import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResizeWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResizeWidth);

    return () => window.removeEventListener('resize', handleWindowResizeWidth);
  }, []);

  return windowWidth;
}
