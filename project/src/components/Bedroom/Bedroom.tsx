import React from 'react';
import BedroomItems from './BedroomItems';

const Bedroom: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Bedroom background */}
      <div className="absolute inset-0 bg-indigo-950 opacity-90">
        {/* Room gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-900/70"></div>
        
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>
      
      {/* Rain effect on window */}
      <div className="absolute right-10 top-10 w-32 h-48 bg-blue-900/20 rounded-lg border border-gray-700 overflow-hidden">
        <div className="rain-drops"></div>
        <div className="absolute inset-0 bg-blue-500/5"></div>
      </div>
      
      <BedroomItems />
    </div>
  );
};

export default Bedroom;