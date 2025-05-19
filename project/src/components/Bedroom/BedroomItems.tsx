import React from 'react';
import { Bed, BookOpen, Lamp } from 'lucide-react';

const BedroomItems: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Bed */}
      <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
        <div className="relative w-40 h-24 bg-indigo-800 rounded-t-lg border-2 border-indigo-700">
          <div className="absolute inset-0 flex items-center justify-center text-indigo-300 opacity-60">
            <Bed size={36} />
          </div>
          <div className="absolute top-0 left-0 right-0 h-6 bg-indigo-700 rounded-t-lg"></div>
          <div className="absolute -top-4 left-2 right-2 h-4 bg-indigo-600 rounded-t-lg"></div>
        </div>
      </div>
      
      {/* Bookshelf */}
      <div className="absolute top-10 left-6 lg:top-16 lg:left-12">
        <div className="relative w-16 h-40 bg-indigo-800 rounded-sm border border-indigo-700">
          <div className="absolute top-0 left-0 right-0 h-full flex flex-col">
            <div className="h-8 border-b border-indigo-700"></div>
            <div className="h-8 border-b border-indigo-700 flex items-center justify-center">
              <BookOpen size={12} className="text-indigo-300" />
            </div>
            <div className="h-8 border-b border-indigo-700"></div>
            <div className="h-8 border-b border-indigo-700 flex items-center justify-center">
              <BookOpen size={12} className="text-indigo-300" />
            </div>
            <div className="h-8"></div>
          </div>
        </div>
      </div>
      
      {/* Lamp */}
      <div className="absolute top-10 right-40 lg:top-12 lg:right-60">
        <div className="relative w-10 h-24">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-indigo-800 rounded-sm"></div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-2 bg-indigo-700 rounded-full"></div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-900 rounded-t-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/70 to-yellow-300/20 animate-pulse"></div>
          </div>
          <div className="absolute top-4 left-0 right-0 flex justify-center text-yellow-500/90">
            <Lamp size={16} className="animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </div>
      
      {/* Posters */}
      <div className="absolute top-16 left-40 lg:top-20 lg:left-60 w-20 h-24 bg-purple-800/50 rounded border border-purple-700 flex items-center justify-center">
        <div className="text-xs text-center text-purple-300">RETRO<br/>GAMING</div>
      </div>
      
      {/* Desk lamp effect - animated glow */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
    </div>
  );
};

export default BedroomItems;