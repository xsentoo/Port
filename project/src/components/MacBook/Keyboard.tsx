import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';

interface KeyboardProps {
  isPoweredOn: boolean;
  onKeyPress: (key: string) => void;
  onPowerToggle: () => void; // ✅ Ajouté
}

const Keyboard: React.FC<KeyboardProps> = ({ isPoweredOn, onKeyPress, onPowerToggle }) => {
  const { playSound } = useAudio();
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const keyRows = [
    ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'DELETE'],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    ['FN', 'CTRL', 'ALT', 'CMD', 'SPACE', 'CMD', 'ALT', 'CTRL']
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPoweredOn) return;

      let key = e.key.toUpperCase();
      if (e.key === 'Enter') key = 'ENTER';
      if (e.key === 'Backspace') key = 'DELETE';
      if (e.key === ' ') key = 'SPACE';

      setPressedKey(key);
      onKeyPress(key);
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPoweredOn, onKeyPress]);

  const handleVirtualKeyPress = (key: string) => {
    if (!isPoweredOn) return;

    setPressedKey(key);
    onKeyPress(key);
    setTimeout(() => setPressedKey(null), 100);
  };

  return (
    <div className="p-4 space-y-1">
      {/* ✅ Bouton Power en haut */}
      <div className="flex justify-center mb-2">
        <button
          onClick={onPowerToggle}
          className="w-24 h-8 bg-red-600 hover:bg-red-500 text-white text-[10px] rounded font-bold transition-all"
        >
          POWER
        </button>
      </div>

      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            let width = 'w-8';
            if (key === 'SPACE') width = 'w-32';
            else if (['SHIFT', 'CAPS', 'TAB', 'DELETE', 'ENTER'].includes(key)) width = 'w-16';
            else if (['FN', 'CTRL', 'ALT', 'CMD'].includes(key)) width = 'w-12';

            return (
              <button
                key={key}
                onClick={() => handleVirtualKeyPress(key)}
                className={`
                  ${width}
                  h-8
                  bg-zinc-900
                  rounded
                  text-zinc-400
                  text-[8px]
                  font-mono
                  flex
                  items-center
                  justify-center
                  transition-all
                  ${isPoweredOn ? 'hover:bg-zinc-800 hover:text-zinc-300' : 'cursor-not-allowed'}
                  ${pressedKey === key ? 'bg-zinc-700 transform translate-y-[1px]' : ''}
                `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
