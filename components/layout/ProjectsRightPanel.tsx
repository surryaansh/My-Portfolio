import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  
  // Base classes for the images. Transitions are now controlled dynamically per-state.
  const imageBaseClasses = `absolute object-cover border-[0.5px] border-black transition-all hover:scale-[1.02]`;

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
           * Generates animation classes for each image based on its index and selection state.
           * Entering: Staggered entrance, longer duration for smoothness.
           * Exiting: Instant/fast exit with no delay to prevent overlapping with the new project.
           */
          const getAnimClasses = (index: number) => {
            const staggeredDelays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
            
            if (isSelected) {
              // Entrance animation: Slide up from translate-y-20 to translate-y-0
              return `opacity-100 translate-y-0 duration-700 ease-out ${staggeredDelays[index]}`;
            } else {
              // Exit animation: Quick fade and move down to clear space for the next project
              // delay-[0ms] is critical here to ensure it starts leaving immediately.
              return `opacity-0 translate-y-20 duration-300 ease-in delay-[0ms] pointer-events-none`;
            }
          };

          return (
            <div 
              key={project.name} 
              className={`absolute inset-0 w-full h-full ${isSelected ? 'z-10' : 'z-0'}`}
            >
              {/* Image 1 */}
              <img
                src={project.images[0]}
                alt={`${project.name} preview 1`}
                className={`${imageBaseClasses} ${layout.img1} ${getAnimClasses(0)}`}
                aria-hidden="true"
              />

              {/* Image 2 */}
              <img
                src={project.images[1]}
                alt={`${project.name} preview 2`}
                className={`${imageBaseClasses} ${layout.img2} ${getAnimClasses(1)}`}
                aria-hidden="true"
              />

              {/* Image 3 - Only rendered if available in the project data */}
              {project.images.length > 3 && layout.img3 ? (
                <img
                  src={project.images[2]}
                  alt={`${project.name} preview 3`}
                  className={`${imageBaseClasses} ${layout.img3} ${getAnimClasses(2)}`}
                  aria-hidden="true"
                />
              ) : null}

              {/* Highlight Image (The last/main image in the sequence) */}
              <img
                src={project.images.length > 3 ? project.images[3] : project.images[2]}
                alt={`${project.name} main showcase`}
                className={`${imageBaseClasses} ${layout.img4} ${getAnimClasses(3)}`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
