import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

/**
 * A throttled hook that returns the window width
 * @returns {null|number}
 */
export default function useWindowWidth() {
  const [state, setState] = useState(null);

  useEffect(() => {
    //set window width right on mount
    setState(window.innerWidth)

    //throttle/rate limit the width handling function to every 16 milliseconds
    const handleWidth = throttle(() => setState(window.innerWidth), 1000 / 60)


    window.addEventListener('resize', handleWidth)

    //clean up the event listener on un-mount and between re-renders
    return () => window.removeEventListener('resize', handleWidth);
  }, [setState]);

  return state;
}

