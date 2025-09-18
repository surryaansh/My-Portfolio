import React, { useRef, useState, useEffect } from 'react';

interface InteractiveFaceIconProps {
  cursorPosition: { x: number; y: number };
}

export const InteractiveFaceIcon: React.FC<InteractiveFaceIconProps> = ({ cursorPosition }) => {
  const faceRef = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState({ 
    face: { x: 0, y: 0 },
    leftEye: { x: 0, y: 0 }
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const calculateCenters = () => {
      if (faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        const scaleX = faceRect.width / 250;
        const scaleY = faceRect.height / 120;
        
        setCenters({
          face: { x: faceRect.left + faceRect.width / 2, y: faceRect.top + faceRect.height / 2 },
          leftEye: { x: faceRect.left + 70 * scaleX, y: faceRect.top + 70 * scaleY },
        });
      }
    };

    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(calculateCenters, 100);
    };

    calculateCenters();
    window.addEventListener('resize', handleResize);
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getPupilTransform = () => {
    const eyeCenter = centers.leftEye;
    if (!eyeCenter.x || !eyeCenter.y) return { dx: 0, dy: 0 };
    const dx = cursorPosition.x - eyeCenter.x;
    const dy = cursorPosition.y - eyeCenter.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(10, Math.sqrt(dx * dx + dy * dy) * 0.05);
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
    };
  };

  const getEyebrowTransform = () => {
      const faceCenter = centers.face;
      if (!faceCenter.x || !faceCenter.y) return { angle: 0, dy: 0 };
      
      const dx = cursorPosition.x - faceCenter.x;
      const dy = cursorPosition.y - faceCenter.y;
      
      const verticalOffset = -(dy / (window.innerHeight / 2)) * 4;
      const horizontalRotation = (dx / (window.innerWidth / 2)) * 8;
      
      return { angle: Math.max(-10, Math.min(15, horizontalRotation)), dy: Math.max(-4, Math.min(4, verticalOffset)) };
  }

  const getWinkTransform = () => {
    const faceCenter = centers.face;
    if (!faceCenter.x || !faceCenter.y) return { angle: 0 };
    
    const dy = cursorPosition.y - faceCenter.y;
    const rotation = (dy / (window.innerHeight / 2)) * 10;
    
    return { angle: Math.max(-12, Math.min(12, -rotation)) };
  }

  const pupilTransform = getPupilTransform();
  const eyebrowTransform = getEyebrowTransform();
  const winkTransform = getWinkTransform();

  return (
    <svg ref={faceRef} width="250" height="120" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-[#efeeee]">
      <style>{`
        g { transition: transform 0.1s linear; }
      `}</style>
      
      {/* Eyebrow */}
      <g transform={`translate(0, ${eyebrowTransform.dy}) rotate(${eyebrowTransform.angle} 60 25)`}>
        <path d="M45.6 44.1C57 36 72 34.7 85.2 40.9C86.6 41.5 87.7 42.5 89 43.3C84.2 48.2 78.6 52 72.3 54.5C60.8 59.1 48.3 57.8 37.7 51.5C36.9 50.8 39.9 48.2 45.6 44.1Z" fill="currentColor"/>
      </g>

      {/* Left Eye */}
      <path d="M103.5 69.9C114.3 86.8 105.7 104.2 85.5 107.5C60.2 111.4 34.5 95.8 32.5 73.9C30.5 52.1 47.7 37.1 66.8 36.5C86 35.8 92.7 53.1 103.5 69.9Z" stroke="currentColor" strokeWidth="2.5"/>
      <g transform={`translate(${pupilTransform.dx}, ${pupilTransform.dy})`}>
        <circle cx="70" cy="74" r="14" fill="currentColor"/>
      </g>
      
      {/* Right Eye */}
      <path d="M208.5 75.9C209.6 93.3 192.9 109.3 173.9 108.7C154.9 108.1 138.8 89.9 140.6 72.9C142.4 55.9 161.2 42.2 180.2 43.3C199.2 44.4 207.4 58.5 208.5 75.9Z" stroke="currentColor" strokeWidth="2.5"/>
      <g transform={`rotate(${winkTransform.angle} 182 80)`}>
          <circle cx="182" cy="80" r="14" fill="currentColor"/>
          <rect x="182" y="66" width="50" height="28" rx="14" fill="currentColor"/>
      </g>

      {/* Mouth */}
      <path d="M117.8 92.5a12.8 12.8 0 0 1 5.6 2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
};
