
import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook to track the mouse position (viewport and document relative) and link hover state.
 * @param containerRef - Optional ref to a container element for which to calculate the relative mouse position.
 * @returns An object containing absolute viewport cursor position, document-relative position, and hover state.
 */
export const useMousePosition = (containerRef?: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [docPosition, setDocPosition] = useState({ x: -100, y: -100 });
  const [relativePosition, setRelativePosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Viewport relative (stays the same regardless of scroll)
      setPosition({ x: event.clientX, y: event.clientY });
      
      // Document relative (changes with scroll)
      setDocPosition({ x: event.pageX, y: event.pageY });
      
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

  return { position, docPosition, relativePosition, isHoveringLink };
};
