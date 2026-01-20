import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  /**
   * Base classes for the images themselves.
   * Removed absolute positioning and layout here as they are now handled by the wrapper.
   * Hover scale remains here but without any inherited transition-delay.
   */
  const imageBaseClasses = `w-full h-full object-cover border-[0.5px] border-black transition-all duration-300 ease-out hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      <div className="flex-1 relative w-full h-full overflow-hidden">
        {PROJECTS_DATA.map((project) => {
          const isSelected = project.name === selectedProject;
          const { layout } = project;

          /**
           * Generates animation classes for the wrapper div.
           * Staggered delays are applied here so they only affect the entry transition.
           */
          const getAnimClasses = (index: number) => {
            const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
            
            if (isSelected) {
              return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
            } else {
              return `opacity-0 translate-y-20 duration-300 ease-in delay-[0ms] pointer-events-none`;
            }
          };

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'}`}
            >
              {/* Image 1 Wrapper */}
              {layout.img1 && project.images[0] && (
                <div className={`absolute ${layout.img1} ${getAnimClasses(0)} transition-all`}>
                  <img
                    src={project.images[0]}
                    alt={`${project.name} preview 1`}
                    className={imageBaseClasses}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Image 2 Wrapper */}
              {layout.img2 && project.images[1] && (
                <div className={`absolute ${layout.img2} ${getAnimClasses(1)} transition-all`}>
                  <img
                    src={project.images[1]}
                    alt={`${project.name} preview 2`}
                    className={imageBaseClasses}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Image 3 Wrapper */}
              {layout.img3 && project.images[2] && (
                <div className={`absolute ${layout.img3} ${getAnimClasses(2)} transition-all`}>
                  <img
                    src={project.images[2]}
                    alt={`${project.name} preview 3`}
                    className={imageBaseClasses}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Highlight Image Wrapper */}
              {layout.img4 && project.images.length > 0 && (
                <div className={`absolute ${layout.img4} ${getAnimClasses(3)} transition-all`}>
                  <img
                    src={project.images[project.images.length - 1]}
                    alt={`${project.name} main showcase`}
                    className={imageBaseClasses}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};