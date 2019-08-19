const MOBILE_BREAKPOINT = 560

export const isMobile = () => {
  const width = (typeof window !== 'undefined') ? window.innerWidth : 1200
  return width < MOBILE_BREAKPOINT
}
