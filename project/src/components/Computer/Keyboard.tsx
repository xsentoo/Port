import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  pressedKey: string | null;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, pressedKey }) => {
  // Key rows configuration
  const keyRows = [
    ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BKSP'],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    ['CTRL', 'ALT', 'SPACE', 'ALT', 'CTRL']
  ];

  // Key width mapping
  const keyWidths: Record<string, string> = {
    'ESC': 'w-10',
    'TAB': 'w-12',
    'CAPS': 'w-14',
    'SHIFT': 'w-16',
    'CTRL': 'w-10',
    'ALT': 'w-10',
    'SPACE': 'w-40',
    'ENTER': 'w-14',
    'BKSP': 'w-14',
    '\\': 'w-10',
  };

  return (
    <div className="relative w-[650px] max-w-[90vw] h-[180px] bg-gray-800 rounded-lg border-2 border-gray-700 p-2">
      {/* Keyboard rows */}
      <div className="flex flex-col gap-1">
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key) => (
              <button
                key={key}
                className={`
                  ${keyWidths[key] || 'w-8'} 
                  h-8 
                  bg-gray-700 
                  rounded 
                  text-gray-300 
                  text-xs 
                  font-mono 
                  flex 
                  items-center 
                  justify-center 
                  shadow-md 
                  border 
                  border-gray-600
                  transition-all
                  hover:bg-gray-600
                  active:translate-y-[1px]
                  active:shadow-sm
                  ${pressedKey === key ? 'translate-y-[1px] shadow-sm bg-gray-600' : ''}
                `}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Keyboard LEDs */}
      <div className="absolute top-2 right-4 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
      </div>
    </div>
  );
};

export default Keyboard;