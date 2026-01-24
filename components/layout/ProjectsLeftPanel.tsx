
import React from 'react';
import { PROJECTS } from '../../constants/projects.ts';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll.ts';

interface ProjectsLeftPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

export const ProjectsLeftPanel: React.FC<ProjectsLeftPanelProps> = ({ isDarkMode, selectedProject, setSelectedProject }) => {
  const { scrollerRef, eventHandlers } = useHorizontalDragScroll();
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Duplicate for infinite loop (Mobile Only)
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <div className={`w-full flex flex-col pb-4 lg:pb-0 lg:pr-0 lg:h-full relative ${isDarkMode ? 'border-b-[#efeeee] lg:border-b-0' : 'border-b-black lg:border-b-0'}`}>
      
      {/* Header - Shared Position, different text alignment if needed */}
      <div className={`flex justify-between text-[10px] py-2 lg:pr-6 ${grayTextClasses}`}>
        <span>02 WORK</span>
        <span>/02</span>
      </div>
      
      {/* 
        MOBILE VERSION: Horizontal Ticker 
        Visible only on screens smaller than 'lg'
      */}
      <div
        ref={scrollerRef}
        className="block lg:hidden overflow-x-auto no-scrollbar cursor-none select-none py-4"
        role="region"
        aria-label="Project selection carousel"
        {...eventHandlers}
      >
        <div className="flex w-max items-center gap-12 px-4" role="list">
          {duplicatedProjects.map((project, index) => {
            const isActive = project === selectedProject;
            return (
              <button
                key={`mob-${project}-${index}`}
                onClick={() => setSelectedProject(project)}
                className={`transition-all duration-300 ease-in-out whitespace-nowrap
                  ${isActive
                    ? 'text-4xl font-black tracking-tighter text-[#FF4500] no-cursor-invert scale-105'
                    : 'text-3xl font-light tracking-tight opacity-50 hover:opacity-100 hover:scale-105'
                  }`
                }
                aria-pressed={isActive}
              >
                {project}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        DESKTOP VERSION: Vertical List 
        Visible only on 'lg' and up
      */}
      <div className="hidden lg:flex flex-col justify-center flex-1 gap-6 pl-0">
        {PROJECTS.map((project) => {
           const isActive = project === selectedProject;
           return (
             <button
                key={`desk-${project}`}
                onClick={() => setSelectedProject(project)}
                className={`text-left transition-all duration-300 ease-in-out
                  ${isActive 
                    ? 'text-5xl xl:text-6xl font-black tracking-tighter text-[#FF4500] translate-x-4' 
                    : 'text-4xl xl:text-5xl font-light tracking-tight opacity-40 hover:opacity-100 hover:translate-x-2'
                  }`
                }
             >
               {project}
             </button>
           );
        })}
      </div>
    </div>
  );
};
