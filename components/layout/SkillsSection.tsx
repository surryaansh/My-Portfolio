
import React, { useState, useRef, useEffect } from 'react';
import { ReactSkillIcon } from '../icons/skills/ReactSkillIcon.tsx';
import { NodeSkillIcon } from '../icons/skills/NodeSkillIcon.tsx';
import { ExpressSkillIcon } from '../icons/skills/ExpressSkillIcon.tsx';
import { MongoSkillIcon } from '../icons/skills/MongoSkillIcon.tsx';
import { EthereumSkillIcon } from '../icons/skills/EthereumSkillIcon.tsx';
import { SoliditySkillIcon } from '../icons/skills/SoliditySkillIcon.tsx';
import { MetamaskSkillIcon } from '../icons/skills/MetamaskSkillIcon.tsx';
import { PolygonSkillIcon } from '../icons/skills/PolygonSkillIcon.tsx';
import { TypescriptSkillIcon } from '../icons/skills/TypescriptSkillIcon.tsx';
import { PythonSkillIcon } from '../icons/skills/PythonSkillIcon.tsx';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

const skills = [
  { component: ReactSkillIcon },
  { component: NodeSkillIcon, transform: 'transform -translate-y-1.5' },
  { component: ExpressSkillIcon, transform: 'transform translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: MongoSkillIcon, transform: 'transform -translate-y-px', size: 'w-28 h-28 md:w-[8.5rem] md:h-[8.5rem]' },
  { component: EthereumSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 h-40 md:w-[10.5rem] md:h-[10.5rem]' },
  { component: SoliditySkillIcon, transform: 'transform -translate-y-px' },
  { component: MetamaskSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: PolygonSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 md:w-[10rem]' },
  { component: TypescriptSkillIcon, transform: 'transform -translate-y-px', size: 'w-40 h-40 md:w-[11rem] md:h-[11rem]' },
  { component: PythonSkillIcon },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const iconClasses = "w-24 h-24 md:w-[7.5rem] md:h-[7.5rem]";
  
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;
    const scrollSpeed = 1.35; // Approx 2% faster than original 40s duration

    const autoScroll = () => {
      if (!isDragging && scroller) {
        scroller.scrollLeft += scrollSpeed;
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
    scrollerRef.current.style.cursor = 'grabbing';
    scrollerRef.current.style.userSelect = 'none';
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
      scrollerRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast factor
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-1 ${grayTextClasses}`}>
        <span>04 SKILLS</span>
        <span>/04</span>
      </div>
      <div
        ref={scrollerRef}
        className="overflow-x-auto no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'grab' }}
      >
        <div className="flex w-max">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="px-5 sm:px-7 md:px-10 flex-shrink-0 flex items-center justify-center">
              <skill.component className={`${skill.size || iconClasses} ${skill.transform || ''}`} />
            </div>
          ))}
        </div>
      </div>
      <div className={`border-t ${borderClasses}`} />
    </section>
  );
};