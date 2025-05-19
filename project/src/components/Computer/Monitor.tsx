import React, { useState, useEffect } from 'react';
import { Power } from 'lucide-react';
import BootSequence from '../OS/BootSequence';
import Desktop from '../OS/Desktop';

interface MonitorProps {
  isPoweredOn: boolean;
  onPowerClick: () => void;
}

const Monitor: React.FC<MonitorProps> = ({ isPoweredOn, onPowerClick }) => {
  const [bootPhase, setBootPhase] = useState<number>(0);
  const [showDesktop, setShowDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (isPoweredOn) {
      const bootTimer = setTimeout(() => {
        setBootPhase(1);
        
        const secondPhaseTimer = setTimeout(() => {
          setBootPhase(2);
          
          const thirdPhaseTimer = setTimeout(() => {
            setBootPhase(3);
            
            const desktopTimer = setTimeout(() => {
              setShowDesktop(true);
            }, 1500);
            
            return () => clearTimeout(desktopTimer);
          }, 2000);
          
          return () => clearTimeout(thirdPhaseTimer);
        }, 2000);
        
        return () => clearTimeout(secondPhaseTimer);
      }, 1000);
      
      return () => clearTimeout(bootTimer);
    } else {
      setBootPhase(0);
      setShowDesktop(false);
    }
  }, [isPoweredOn]);

  return (
    <div className="relative">
      {/* Monitor frame */}
      <div className="relative w-[700px] max-w-[95vw] h-[500px] max-h-[50vh] bg-gray-800 rounded-lg border-2 border-gray-700 p-4 overflow-hidden">
        {/* Screen bezel */}
        <div className="absolute inset-4 bg-black rounded">
          {/* Screen content */}
          <div className={`absolute inset-0 rounded overflow-hidden ${isPoweredOn ? 'bg-black' : 'bg-gray-950'}`}>
            {isPoweredOn && (
              <>
                {!showDesktop && <BootSequence phase={bootPhase} />}
                {showDesktop && <Desktop />}
                
                {/* CRT Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-scanlines opacity-10"></div>
                  
                  {/* Screen glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
                  
                  {/* Flicker animation */}
                  <div className="absolute inset-0 bg-white opacity-0 animate-flicker"></div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Monitor details */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-700 rounded-sm flex items-center justify-center">
          <div className="text-[8px] text-gray-400 font-mono">RETROVISION</div>
        </div>
        
        {/* Power button */}
        <button 
          onClick={onPowerClick}
          className={`absolute bottom-2 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isPoweredOn ? 'bg-green-500 text-green-900' : 'bg-gray-700 text-gray-500'}`}
        >
          <Power size={12} />
        </button>
      </div>
      
      {/* Monitor stand */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-28 h-10">
        <div className="w-28 h-4 bg-gray-800 rounded-b-lg"></div>
        <div className="w-36 h-6 bg-gray-700 rounded-sm mx-auto"></div>
      </div>
    </div>
  );
};

export default Monitor;