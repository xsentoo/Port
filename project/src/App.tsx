import React from 'react';
import MacBook from './components/MacBook/MacBook';
import SocialLinks from './components/SocialLinks/SocialLinks';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <div className="relative w-full h-screen overflow-hidden bg-zinc-100">
        {/* Background with subtle grain texture */}
        <div className="absolute inset-0 bg-noise opacity-50"></div>
        
        {/* Main content */}
        <div className="relative h-full flex flex-col items-start justify-between p-8 font-mono">
          {/* Header */}
          <div className="w-full">
            <h1 className="text-zinc-800 text-xl font-bold tracking-tight">[TON NOM]</h1>
            <p className="text-zinc-600 tracking-wide">FRONTEND DEVELOPER</p>
            
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
          
          {/* MacBook */}
          <div className="w-full flex justify-center items-center flex-grow">
            <MacBook />
          </div>
          
          {/* Footer */}
          <div className="w-full flex justify-end">
            <p className="text-xs text-zinc-500 tracking-widest">
              A-013 / V1.0.0
              <br />
              DEVELOPED IN 2025
            </p>
          </div>
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;