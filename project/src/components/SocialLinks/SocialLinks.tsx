import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4">
      <div className="relative w-24 h-32">
        <div className="absolute inset-0 bg-zinc-200 rounded-lg shadow-lg transform rotate-3 transition-transform hover:rotate-6">
          <a 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-zinc-800"
          >
            <Linkedin size={24} />
            <span className="text-xs">LINKEDIN</span>
          </a>
        </div>
      </div>
      
      <div className="relative w-24 h-32">
        <div className="absolute inset-0 bg-zinc-200 rounded-lg shadow-lg transform -rotate-3 transition-transform hover:-rotate-6">
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-zinc-800"
          >
            <Github size={24} />
            <span className="text-xs">GITHUB</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;