import React, { useState } from 'react';
import Monitor from './Monitor';
import Keyboard from './Keyboard';
import Mouse from './Mouse';
import { useAudio } from '../../context/AudioContext';

interface ComputerProps {
  isPoweredOn: boolean;
  onPowerToggle: () => void;
}

const Computer: React.FC<ComputerProps> = ({ isPoweredOn, onPowerToggle }) => {
  const { playSound } = useAudio();
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    playSound('keyPress');
    setTimeout(() => setPressedKey(null), 100);
  };

  const handlePowerClick = () => {
    onPowerToggle();
    playSound(isPoweredOn ? 'click' : 'startup');
  };

  const handleMouseClick = () => {
    playSound('click');
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Computer desk */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-950 to-indigo-900 border-t border-indigo-800"></div>
      
      <div className="relative flex flex-col items-center">
        <Monitor isPoweredOn={isPoweredOn} onPowerClick={handlePowerClick} />
        <div className="mt-6 flex flex-col items-center">
          <Keyboard onKeyPress={handleKeyPress} pressedKey={pressedKey} />
          <div className="mt-4">
            <Mouse onClick={handleMouseClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;