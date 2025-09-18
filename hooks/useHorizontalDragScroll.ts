import { useRef, useEffect, useCallback } from 'react';

interface DragScrollOptions {
  /** The base speed for automatic scrolling when not dragging. Default is 1.02. */
  autoScrollSpeed?: number;
  /** The friction applied to the velocity after dragging (0 to 1). Default is 0.95. */
  friction?: number;
}

/**
 * Custom hook to enable horizontal drag-to-scroll and continuous auto-scrolling
 * for an element, creating an infinite carousel effect.
 * @param options - Configuration for scroll speed and friction.
 * @returns An object with a ref for the scrollable element and event handlers to spread onto it.
 */
export const useHorizontalDragScroll = (options: DragScrollOptions = {}) => {
  const { autoScrollSpeed = 1.02, friction = 0.95 } = options;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velocity = useRef(0);
  const lastMouseX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const virtualScrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    velocity.current = 0;
    startX.current = e.pageX;
    lastMouseX.current = e.pageX;
    scrollLeftStart.current = virtualScrollLeft.current;
    scrollerRef.current.style.cursor = 'grabbing';
    scrollerRef.current.style.userSelect = 'none';
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
      scrollerRef.current.style.removeProperty('user-select');
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const mouseX = e.pageX;
    
    const walk = mouseX - startX.current;
    virtualScrollLeft.current = scrollLeftStart.current - walk;
    
    // Update velocity for a smooth release animation
    velocity.current = lastMouseX.current - mouseX;
    lastMouseX.current = mouseX;
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const animate = () => {
      if (!scroller) return;

      if (!isDragging.current) {
        // Apply friction to velocity for a coasting effect after drag
        if (Math.abs(velocity.current) > 0.1) {
          virtualScrollLeft.current += velocity.current;
          velocity.current *= friction;
        } else {
          // If not coasting, apply the constant auto-scroll
          velocity.current = 0;
          virtualScrollLeft.current += autoScrollSpeed;
        }
      }
      
      // The content is duplicated, so we only need to scroll half the width
      // to create a seamless, infinite loop effect.
      const scrollableWidth = scroller.scrollWidth / 2;
      if (scrollableWidth > 0) {
        if (virtualScrollLeft.current >= scrollableWidth) {
          virtualScrollLeft.current -= scrollableWidth;
        } else if (virtualScrollLeft.current < 0) {
          virtualScrollLeft.current += scrollableWidth;
        }
      }
      
      scroller.scrollLeft = virtualScrollLeft.current;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [autoScrollSpeed, friction]);

  const eventHandlers = {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUpOrLeave,
    onMouseLeave: handleMouseUpOrLeave,
    onMouseMove: handleMouseMove,
  };

  return { scrollerRef, eventHandlers };
};
