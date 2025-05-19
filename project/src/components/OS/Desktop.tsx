import React, { useState } from 'react';
import { Folder, User, Wrench, Phone, Volume2, VolumeX } from 'lucide-react';
import Window from './Window';
import Projects from './Applications/Projects';
import About from './Applications/About';
import Skills from './Applications/Skills';
import Contact from './Applications/Contact';
import { useAudio } from '../../context/AudioContext';

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  zIndex: number;
}

const Desktop: React.FC = () => {
  const { playSound, isMuted, toggleMute } = useAudio();
  const [highestZIndex, setHighestZIndex] = useState<number>(10);
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'projects',
      title: 'Projects',
      content: <Projects />,
      isOpen: false,
      zIndex: 10
    },
    {
      id: 'about',
      title: 'About Me',
      content: <About />,
      isOpen: false,
      zIndex: 10
    },
    {
      id: 'skills',
      title: 'Skills',
      content: <Skills />,
      isOpen: false,
      zIndex: 10
    },
    {
      id: 'contact',
      title: 'Contact',
      content: <Contact />,
      isOpen: false,
      zIndex: 10
    }
  ]);

  const handleIconClick = (windowId: string) => {
    playSound('click');
    
    setWindows(prev => {
      return prev.map(window => {
        if (window.id === windowId) {
          const newZIndex = highestZIndex + 1;
          setHighestZIndex(newZIndex);
          
          if (!window.isOpen) {
            playSound('windowOpen');
          }
          
          return {
            ...window,
            isOpen: true,
            zIndex: newZIndex
          };
        }
        return window;
      });
    });
  };

  const handleWindowFocus = (windowId: string) => {
    setWindows(prev => {
      return prev.map(window => {
        if (window.id === windowId) {
          const newZIndex = highestZIndex + 1;
          setHighestZIndex(newZIndex);
          return {
            ...window,
            zIndex: newZIndex
          };
        }
        return window;
      });
    });
  };

  const handleWindowClose = (windowId: string) => {
    playSound('windowClose');
    setWindows(prev => {
      return prev.map(window => {
        if (window.id === windowId) {
          return {
            ...window,
            isOpen: false
          };
        }
        return window;
      });
    });
  };

  const handleSoundToggle = () => {
    toggleMute();
    playSound('click');
  };

  return (
    <div className="absolute inset-0 bg-teal-900 overflow-hidden">
      {/* Desktop background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-blue-900">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '8px 8px'
        }}></div>
      </div>
      
      {/* Desktop icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6">
        <DesktopIcon 
          icon={<Folder size={24} />} 
          label="Projects" 
          color="text-yellow-200" 
          onClick={() => handleIconClick('projects')} 
        />
        <DesktopIcon 
          icon={<User size={24} />} 
          label="About Me" 
          color="text-blue-200" 
          onClick={() => handleIconClick('about')} 
        />
        <DesktopIcon 
          icon={<Wrench size={24} />} 
          label="Skills" 
          color="text-green-200" 
          onClick={() => handleIconClick('skills')} 
        />
        <DesktopIcon 
          icon={<Phone size={24} />} 
          label="Contact" 
          color="text-red-200" 
          onClick={() => handleIconClick('contact')} 
        />
      </div>
      
      {/* Windows */}
      {windows.map(window => (
        window.isOpen && (
          <Window 
            key={window.id}
            title={window.title}
            onClose={() => handleWindowClose(window.id)}
            onFocus={() => handleWindowFocus(window.id)}
            zIndex={window.zIndex}
          >
            {window.content}
          </Window>
        )
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800 border-t border-gray-700 flex items-center px-4 justify-between">
        <div className="text-white font-mono text-sm">PortfolioOS 1.0</div>
        
        {/* Audio control */}
        <button 
          onClick={handleSoundToggle}
          className="text-white hover:bg-gray-700 p-2 rounded-md"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
};

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, color, onClick }) => {
  return (
    <button 
      className="flex flex-col items-center w-20 group focus:outline-none"
      onClick={onClick}
    >
      <div className={`w-12 h-12 ${color} flex items-center justify-center bg-gray-800/60 rounded p-2 group-hover:bg-gray-700/80 group-active:bg-gray-600/80 transition-colors`}>
        {icon}
      </div>
      <div className="mt-1 text-white text-xs font-bold bg-gray-900/80 px-2 py-1 rounded text-center w-full group-hover:bg-gray-800">
        {label}
      </div>
    </button>
  );
};

export default Desktop;