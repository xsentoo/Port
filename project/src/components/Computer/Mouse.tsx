import React, { useState } from 'react';

interface MouseProps {
  onClick: () => void;
}

const Mouse: React.FC<MouseProps> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div 
      className={`
        relative 
        w-16 
        h-24 
        bg-gray-800 
        rounded-t-full 
        rounded-b-xl 
        border-2 
        border-gray-700
        cursor-pointer
        transition-all
        hover:bg-gray-700
        ${isClicked ? 'translate-y-[2px]' : ''}
      `}
      onClick={handleClick}
    >
      {/* Mouse buttons */}
      <div className="absolute top-5 left-0 right-0 flex justify-center gap-1">
        <div className={`w-7 h-8 bg-gray-700 rounded-t-md border border-gray-600 ${isClicked ? 'bg-gray-600' : ''}`}></div>
        <div className="w-7 h-8 bg-gray-700 rounded-t-md border border-gray-600"></div>
      </div>
      
      {/* Scroll wheel */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-4 bg-gray-600 rounded-full"></div>
      
      {/* Mouse cable */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-700"></div>
    </div>
  );
};

export default Mouse;