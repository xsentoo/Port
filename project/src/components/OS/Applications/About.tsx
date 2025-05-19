import React from 'react';
import { User, Mail, MapPin, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="font-mono text-sm">
      <h2 className="text-blue-400 text-lg mb-4 border-b border-blue-800 pb-2">About Me</h2>
      
      <div className="bg-gray-800/70 p-4 rounded border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Profile picture */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <div className="w-32 h-32 bg-gray-700 rounded-md border-2 border-blue-600 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                <User size={48} />
              </div>
            </div>
          </div>
          
          {/* Bio info */}
          <div className="flex-grow">
            <h3 className="text-blue-300 text-xl mb-2">Thayaparan Senthooran</h3>
            <p className="text-gray-300 mb-4">
              Full Stack Developer pursuing a Master's in IT Development, with expertise in both frontend and backend technologies.
              Currently seeking an internship opportunity starting September 2025.
            </p>
            
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400" />
                <span>senthooran.thayaparan.pro@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                <span>Noisy-le-Grand</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-400" />
                <span>Available for internship</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-blue-300 mb-2 border-b border-blue-900/50 pb-1">Experience</h4>
          <div className="space-y-3 mt-2">
            <div>
              <div className="text-yellow-200">Film by Janar</div>
              <div className="text-gray-400">Freelance | January 2025 - Present</div>
              <div className="text-gray-500 text-xs mt-1">
                Developed a platform for users to discover company creations, book appointments, and receive automated notifications.
                Built with React, Node.js (Express), and Firebase.
              </div>
            </div>
            <div>
              <div className="text-yellow-200">ÖPM</div>
              <div className="text-gray-400">Athis-Mons | January 2024 - March 2024</div>
              <div className="text-gray-500 text-xs mt-1">
                Designed and developed an e-commerce website using HTML, CSS, JavaScript and PHP.
                Created an intuitive user interface to enhance customer experience.
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-blue-300 mb-2 border-b border-blue-900/50 pb-1">Education</h4>
          <div className="space-y-3">
            <div>
              <div className="text-yellow-200">Master Dev Manager Full Stack</div>
              <div className="text-gray-400">EFREI | 2025 - 2027</div>
            </div>
            <div>
              <div className="text-yellow-200">Bachelor 3 Développement Informatique</div>
              <div className="text-gray-400">YNOV PARIS | 2024 - 2025</div>
            </div>
            <div>
              <div className="text-yellow-200">BTS SIO SLAM</div>
              <div className="text-gray-400">LYCÉE RENÉ DESCARTES | 2022 - 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;