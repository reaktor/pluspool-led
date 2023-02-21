import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const breakpoint = 560;

/**
 * Throttled hook that listens to window width changes
 * and returns true if window width is below breakpoint: 560
 * @returns {boolean}
 */

export default function useIsMobile() {
  const [state, setState] = useState(false);

  useEffect(() => {

    //check the window width right on mount to see if it's already in mobile -- navigated to the page using a mobile viewport
    setState(window.innerWidth < breakpoint)

    //throttle/rate limit the width handling function to every 16 milliseconds
    const handleWidth = throttle(() => setState(window.innerWidth < breakpoint), 1000 / 60)

    window.addEventListener('resize', handleWidth)

    //clean up the event listener on un-mount and between re-renders
    return () => window.removeEventListener('resize', handleWidth);
  }, [setState]);

  return state;
}

