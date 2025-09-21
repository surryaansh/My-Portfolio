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

  const imageBaseClasses = `absolute object-cover border ${isDarkMode ? 'border-neutral-800' : 'border-black'} transition-transform duration-300 hover:scale-[1.02]`;

  return (
    <div className="w-full lg:col-span-2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>03 WORK</span>
        <span>/03</span>
      </div>
      
      {/* 
        This container is now `flex-1` and `relative`, serving as the canvas for the collage.
        It will fill all available vertical space in its flex-column parent.
        Padding has been removed from this container to allow images to align to the edges.
      */}
      <div key={project.name} className="flex-1 relative w-full h-full animate-fade-in">
        
        {/* Image 4 (Tall, Top Right) */}
        <img
          src={project.images[3]}
          alt={`${project.name} screenshot 4`}
          className={`${imageBaseClasses} w-[35%] h-[90%] top-0 right-0 object-top`}
          style={{ zIndex: 30 }}
          aria-hidden="true"
        />

        {/* Image 2 (Vertical, Top Center) */}
        <img
          src={project.images[1]}
          alt={`${project.name} screenshot 2`}
          className={`${imageBaseClasses} w-[40%] h-auto max-h-[55%] top-[5%] left-[25%]`}
          style={{ zIndex: 20 }}
          aria-hidden="true"
        />

        {/* Image 3 (Horizontal, Middle Right) */}
        <img
          src={project.images[2]}
          alt={`${project.name} screenshot 3`}
          className={`${imageBaseClasses} w-[45%] h-auto max-h-[50%] top-[40%] left-[50%]`}
          style={{ zIndex: 40 }}
          aria-hidden="true"
        />
        
        {/* Image 1 (Horizontal, Bottom Left) */}
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot 1`}
          className={`${imageBaseClasses} w-[55%] h-auto max-h-[50%] bottom-0 left-0`}
          style={{ zIndex: 10 }}
          aria-hidden="true"
        />

      </div>
    </div>
  );
}
