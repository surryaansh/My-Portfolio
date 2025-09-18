import React from 'react';

interface IconProps {
  className?: string;
}

export const PythonSkillIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 54 59"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <g fillRule="evenodd">
        <path d="M27.237 58.704c-5.82 0-11.31-2.38-15.29-6.26L10.33 50.9c-2.28-2.22-3.64-5.23-3.97-8.43-.33-3.23.08-6.48 1.07-9.52l4.42-11.16c.74-1.87 1.15-3.87 1.15-5.96 0-7.2-3.64-13.65-9.36-17.55C.7 15.65-1.12 12.8.2 9.07l.08-.24c3.4-9.35 13.1-15.12 23.3-13.06 10.3 2.08 17.65 10.6 17.65 21.2v18.47c0 7.22-5.9 13.07-13.12 13.07z"/>
        <path d="M26.76 0c5.83 0 11.32 2.38 15.3 6.26l1.62 1.55c2.28 2.22 3.64 5.23 3.97 8.43.33 3.23-.08 6.48-1.07 9.52l-4.42 11.16c-.74 1.87-1.15 3.87-1.15 5.96 0 7.2 3.64 13.65 9.36 17.55 2.98 2.22 5.1 5 6.25 8.23l.08.24c-3.4 9.35-13.1 15.12-23.3 13.06-10.3-2.08-17.65-10.6-17.65-21.2V13.1C13.63 5.88 19.53 0 26.76 0z"/>
        <g transform="translate(18 13)">
          <circle fill="#FFF" cx="4" cy="4" r="4"/>
        </g>
        <g transform="translate(32 42)">
          <circle fill="#FFF" cx="4" cy="4" r="4"/>
        </g>
      </g>
    </svg>
  );
};