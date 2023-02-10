const MOBILE_BREAKPOINT = 560

/**
 * **To be deprecated, do not use.**
 *
 * Use `useIsMobile` hook in `hooks` directory, instead
 */
export const isMobile = () => {
  const width = (typeof window !== 'undefined') ? window.innerWidth : 1200
  return width < MOBILE_BREAKPOINT
  return true;
}