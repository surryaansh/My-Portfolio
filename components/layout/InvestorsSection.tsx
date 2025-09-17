import React from 'react';

interface InvestorsSectionProps {
  isDarkMode: boolean;
}

export const InvestorsSection: React.FC<InvestorsSectionProps> = ({ isDarkMode }) => {
  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';

  return (
    <section className={`border-t ${borderClasses}`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>04 INVESTORS</span>
        <span>/04</span>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[25vh] py-12">
        {/* This area is intentionally left blank. Logos will be added later. */}
      </div>
      <div className={`border-t ${borderClasses}`} />
    </section>
  );
};