import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, onFocus, zIndex }) => {
  const { playSound } = useAudio();
  const [position, setPosition] = useState({ x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 });
  const [size, setSize] = useState({ width: 500, height: 350 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (e.button !== 0) return; // Only left mouse button
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    playSound('click');
  };

  const handleMaximize = () => {
    // Implement maximize functionality
    playSound('click');
  };

  return (
    <div 
      ref={windowRef}
      className={`absolute rounded overflow-hidden shadow-lg transition-all duration-300 ${isMinimized ? 'h-10 overflow-hidden' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        width: `${isMinimized ? 200 : size.width}px`, 
        height: `${isMinimized ? 32 : size.height}px`,
        zIndex,
        transform: isDragging ? 'scale(1.01)' : 'scale(1)'
      }}
      onClick={onFocus}
    >
      {/* Window title bar */}
      <div 
        className="h-8 bg-gray-800 text-white font-mono text-sm flex items-center justify-between px-2 cursor-move select-none border-b border-gray-700"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span className="truncate max-w-[300px]">{title}</span>
        </div>
        
        <div className="flex gap-1">
          <button 
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded-sm"
            onClick={handleMinimize}
          >
            <Minus size={14} />
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded-sm"
            onClick={handleMaximize}
          >
            <Square size={14} />
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center hover:bg-red-700 rounded-sm"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="bg-gray-900 text-gray-200 p-2 h-[calc(100%-2rem)] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;