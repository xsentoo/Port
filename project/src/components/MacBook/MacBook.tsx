import React, { useState, useEffect } from 'react';
import Terminal from '../Terminal/Terminal';
import { Power, BatteryCharging, Lock, Loader2 } from 'lucide-react';
import Keyboard from './Keyboard';
import { useAudio } from '../../context/AudioContext';

const MacBook: React.FC = () => {
  const { playSound } = useAudio();
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handlePowerClick = () => {
    setIsPoweredOn(!isPoweredOn);
    if (!isPoweredOn) {
      setIsAuthenticated(false);
      setPassword('');
      setShowError(false);
      setLoadingProgress(0);
    }
    playSound(isPoweredOn ? 'click' : 'startup');
  };

  const handleChargerToggle = () => {
    setIsCharging(!isCharging);
    playSound('click');
  };

  const handleKeyPress = (key: string) => {
    if (!isPoweredOn || isAuthenticated) return;
    
    if (key === 'ENTER') {
      if (password === 'A013-2025') {
        setIsAuthenticated(true);
        setIsLoading(true);
        playSound('startup');
        setShowError(false);
      } else {
        setShowError(true);
        playSound('error');
        setTimeout(() => setPassword(''), 1000);
      }
    } else if (key === 'DELETE') {
      setPassword(prev => prev.slice(0, -1));
      playSound('keyPress');
    } else if (key.length === 1) {
      setPassword(prev => (prev + key).slice(0, 20));
      playSound('keyPress');
    }
  };

  // Loading sequence effect
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="relative w-full max-w-4xl">
      {/* Sticky Note */}
      <div className="absolute -top-32 right-0 w-40 h-40 bg-yellow-100 rotate-6 shadow-lg p-4 font-handwritten text-red-500">
        <div className="text-lg font-bold">Password:</div>
        <div className="mt-2">A013-2025</div>
      </div>

      {/* MacBook Body */}
      <div className="relative aspect-[16/10] bg-zinc-800 rounded-t-lg shadow-2xl overflow-hidden">
        {/* Screen Bezel */}
        <div className="absolute inset-2 bg-black rounded-md">
          {/* Camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-800">
              <div className="w-1 h-1 rounded-full bg-zinc-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Screen Content */}
          <div className={`absolute inset-0 transition-all duration-500 ${isPoweredOn ? 'opacity-100' : 'opacity-0'}`}>
            {isPoweredOn && !isAuthenticated ? (
              <div className="h-full flex flex-col items-center justify-center bg-black text-green-500 font-mono p-8">
                <Lock size={48} className="mb-4" />
                <div className="text-xl mb-4">Enter Password</div>
                <div className="w-48 h-10 bg-black border-2 border-green-500 rounded flex items-center px-3 mb-2">
                  {password}
                </div>
                {showError && (
                  <div className="text-red-500 text-sm mt-2">Incorrect password</div>
                )}
              </div>
            ) : isPoweredOn && isAuthenticated && isLoading ? (
              <div className="h-full flex flex-col items-center justify-center bg-black text-green-500 font-mono p-8">
                <Loader2 size={48} className="mb-4 animate-spin" />
                <div className="text-xl mb-4">Loading System</div>
                <div className="w-64 h-2 bg-green-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-200"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm mt-2">{loadingProgress}%</div>
              </div>
            ) : (
              <Terminal 
                batteryLevel={batteryLevel} 
                setBatteryLevel={setBatteryLevel} 
                isCharging={isCharging} 
              />
            )}
          </div>

          {/* Power Button */}
          <button 
            onClick={handlePowerClick}
            className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all
              ${isPoweredOn ? 'bg-green-500 text-green-900' : 'bg-zinc-700 text-zinc-500'}`}
          >
            <Power size={12} />
          </button>
        </div>
      </div>

      {/* MacBook Base with Keyboard */}
      <div className="relative bg-zinc-800 rounded-b-xl">
        <Keyboard isPoweredOn={isPoweredOn} onKeyPress={handleKeyPress} />
        
        {/* Charger */}
        <button
          onClick={handleChargerToggle}
          className={`absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isCharging ? 'bg-green-500 text-green-900' : 'bg-zinc-700 text-zinc-500'
          }`}
        >
          <BatteryCharging size={20} />
        </button>
      </div>
    </div>
  );
};

export default MacBook;