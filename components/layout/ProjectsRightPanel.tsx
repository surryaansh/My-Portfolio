import React from 'react';
import { PROJECTS_DATA } from '../../constants/projects.ts';

interface ProjectsRightPanelProps {
  isDarkMode: boolean;
  selectedProject: string;
}

export const ProjectsRightPanel: React.FC<ProjectsRightPanelProps> = ({ isDarkMode, selectedProject }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  const project = PROJECTS_DATA.find(p => p.name === selectedProject);

  if (!project) {
    return (
      <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
        <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
          <span>03 WORK</span>
          <span>/03</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p>Project not found.</p>
        </div>
      </div>
    );
  }

  // Base classes for images: no rounded corners, thin black border, no shadow.
  const imageBaseClasses = `absolute object-cover border ${isDarkMode ? 'border-neutral-800' : 'border-black'} transition-transform duration-300 hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      <div key={project.name} className="flex-1 flex flex-col md:flex-row gap-8 py-8 animate-fade-in">
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-base leading-relaxed">{project.description}</p>
        </div>
        {/* New Collage Layout based on user's sketch */}
        <div className="w-full md:w-2/3 relative mt-8 md:mt-0" style={{ minHeight: '450px' }}>
          {/* Image 1 (Bottom-left) */}
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot 1`}
            className={`${imageBaseClasses} w-[60%] h-auto bottom-0 left-0`}
            style={{ zIndex: 10 }}
            aria-hidden="true"
          />
          {/* Image 2 (Middle-left, on top of #1) */}
           <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            className={`${imageBaseClasses} w-[45%] h-auto bottom-[20%] left-[10%]`}
            style={{ zIndex: 20 }}
            aria-hidden="true"
          />
          {/* Image 3 (Middle-right, on top of all) */}
          <img
            src={project.images[2]}
            alt={`${project.name} screenshot 3`}
            className={`${imageBaseClasses} w-[55%] h-auto top-[25%] left-[30%] hover:z-40`}
            style={{ zIndex: 30 }}
            aria-hidden="true"
          />
          {/* Image 4 (Tall, top-right) */}
          <img
            src={project.images[3]}
            alt={`${project.name} screenshot 4`}
            className={`${imageBaseClasses} w-[40%] h-[90%] top-0 right-0 object-top`}
            style={{ zIndex: 20 }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
