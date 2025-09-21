import React, { useRef, useEffect, useState, useCallback } from 'react';

interface BrushRevealCanvasProps {
  imageUrl: string;
  brushUrl: string;
  isDarkMode: boolean;
}

const BrushRevealCanvas: React.FC<BrushRevealCanvasProps> = ({
  imageUrl,
  brushUrl,
  isDarkMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>();
  const brushRef = useRef<HTMLImageElement>();
  const [isReady, setIsReady] = useState(false);

  // 1. Load images and update readiness state when both are loaded.
  useEffect(() => {
    const img = new Image();
    const brush = new Image();

    const imagePromise = new Promise<void>(resolve => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to not block forever
    });
    const brushPromise = new Promise<void>(resolve => {
      brush.onload = () => resolve();
      brush.onerror = () => resolve();
    });

    img.src = imageUrl;
    brush.src = brushUrl;

    Promise.all([imagePromise, brushPromise]).then(() => {
      if (img.complete && img.naturalHeight !== 0 && brush.complete && brush.naturalHeight !== 0) {
        imageRef.current = img;
        brushRef.current = brush;
        setIsReady(true);
      }
    });
  }, [imageUrl, brushUrl]);

  // 2. Setup canvas and handle resizing robustly with ResizeObserver.
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;
    
    if (!ctx || !image) return;

    let animationFrameId: number;

    const redrawCanvas = (width: number, height: number) => {
        // Set canvas physical dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the image to fit the canvas
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(image, 0, 0, width, height);

        // Draw the overlay
        ctx.fillStyle = isDarkMode ? '#000000' : '#efeeee';
        ctx.fillRect(0, 0, width, height);
    }

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        redrawCanvas(width, height);
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Initial draw
    const initialRect = canvas.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
        redrawCanvas(initialRect.width, initialRect.height);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, isDarkMode]);

  // 3. Handle drawing on pointer move.
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const brush = brushRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !brush || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const brushSize = Math.max(brush.width, brush.height) * 1.5;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(brush, x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  }, [isReady]);

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      style={{
        width: '100%',
        height: '100%',
        display: 'block', // To avoid extra space under canvas
        touchAction: 'none',
        cursor: 'none',
        visibility: isReady ? 'visible' : 'hidden', // Hide until ready
      }}
    />
  );
};

export default BrushRevealCanvas;
