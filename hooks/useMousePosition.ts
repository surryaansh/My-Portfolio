import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook to track the mouse position and link hover state.
 * @param containerRef - Optional ref to a container element for which to calculate the relative mouse position.
 * @returns An object containing the absolute cursor position, relative position, and a boolean for link hover state.
 */
export const useMousePosition = (containerRef?: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [relativePosition, setRelativePosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      
      const target = event.target as HTMLElement;
      setIsHoveringLink(!!target.closest('a, button'));

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setRelativePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return { position, relativePosition, isHoveringLink };
};
