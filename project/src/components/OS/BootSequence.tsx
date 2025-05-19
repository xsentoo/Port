import React from 'react';

interface BootSequenceProps {
  phase: number;
}

const BootSequence: React.FC<BootSequenceProps> = ({ phase }) => {
  const renderBootContent = () => {
    switch (phase) {
      case 0:
        return null;
      case 1:
        return (
          <div className="p-4 font-mono text-green-500 text-sm animate-pulse">
            <p>BIOS Version 2.5</p>
            <p>Copyright (C) 1995-2025</p>
            <p className="mt-4">Memory Test: 640K OK</p>
            <p>Detecting Drives...</p>
          </div>
        );
      case 2:
        return (
          <div className="p-4 font-mono text-green-500 text-xs">
            <p>BIOS Version 2.5</p>
            <p>Copyright (C) 1995-2025</p>
            <p className="mt-4">Memory Test: 640K OK</p>
            <p>Detecting Drives... Done</p>
            <p>Hard Disk 0: 500MB</p>
            <p>Floppy Disk: 1.44MB</p>
            <p className="mt-4">Loading operating system...</p>
            <div className="mt-2 w-full flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-4 w-4 bg-green-500 ${i < 10 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-4 font-mono text-green-500 text-xs">
            <p>BIOS Version 2.5</p>
            <p>Copyright (C) 1995-2025</p>
            <p className="mt-4">Memory Test: 640K OK</p>
            <p>Detecting Drives... Done</p>
            <p>Hard Disk 0: 500MB</p>
            <p>Floppy Disk: 1.44MB</p>
            <p className="mt-4">Loading operating system... Done</p>
            <div className="mt-2 w-full flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-4 w-4 bg-green-500"
                ></div>
              ))}
            </div>
            <p className="mt-4 animate-pulse">PortfolioOS 1.0 Starting...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 flex items-start justify-start overflow-hidden bg-black">
      {renderBootContent()}
    </div>
  );
};

export default BootSequence;