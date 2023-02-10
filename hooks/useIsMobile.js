import React, { useEffect, useState } from 'react';

const breakpoint = 560;

export default function useIsMobile() {
  const [state, setState] = useState(false);

  useEffect(() => {

    //check the window width right on mount to see if it's already in mobile -- navigated to the page using a mobile viewport
    setState(window.innerWidth < breakpoint)
    function handleWidth() {
      setState(window.innerWidth < breakpoint);
    }

    window.addEventListener('resize', handleWidth)

    //clean up the event listener on un-mount and between re-renders
    return () => window.removeEventListener('resize', handleWidth);
  }, [setState]);

  return state;
}

