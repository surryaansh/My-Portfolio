import React from 'react';

/**
 * Provides a handler for smooth scrolling to anchor links with a custom offset.
 * This is used to prevent the fixed header from covering the section title.
 */
export const useSmoothScroll = () => {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);

    if (!targetId) return;

    // The 'about' link should always scroll to the very top of the page.
    if (targetId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const header = document.querySelector('header');
      // Calculate offset to account for header height plus some visual padding.
      const headerOffset = (header?.offsetHeight || 80) + 20; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { handleScroll };
};
