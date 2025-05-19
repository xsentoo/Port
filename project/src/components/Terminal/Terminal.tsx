import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ExternalLink, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface TerminalProps {
  batteryLevel: number;
  setBatteryLevel: (level: number) => void;
  isCharging: boolean;
}

type Section = 'welcome' | 'portfolio' | 'contact' | 'skills' | 'education' | 'experience' | 'projects';

const Terminal: React.FC<TerminalProps> = ({ batteryLevel, setBatteryLevel, isCharging }) => {
  const { playSound } = useAudio();
  const [currentSection, setCurrentSection] = useState<Section>('welcome');
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typeText = useCallback((text: string, speed = 50) => {
    setIsTyping(true);
    let i = 0;
    setTypedText('');
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(typing);
  }, []);

  useEffect(() => {
    if (currentSection === 'welcome') {
      typeText('Welcome to A-013\nInitializing system...');
      const timer = setTimeout(() => {
        setCurrentSection('portfolio');
        playSound('startup');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, playSound, typeText]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCharging) {
        setBatteryLevel(prev => Math.max(0, prev - 1));
      } else {
        setBatteryLevel(prev => Math.min(100, prev + 2));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCharging, setBatteryLevel]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const sections: Section[] = ['portfolio', 'contact', 'skills', 'education', 'experience', 'projects'];
    const currentIndex = sections.indexOf(currentSection);
    
    let nextIndex;
    if (direction === 'prev') {
      nextIndex = currentIndex <= 0 ? sections.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex >= sections.length - 1 ? 0 : currentIndex + 1;
    }

    setShowContent(false);
    setTimeout(() => {
      setCurrentSection(sections[nextIndex]);
      setShowContent(true);
      playSound('click');
    }, 300);
  };

  const ProjectCard = ({ title, period, team, description, tech, github }: any) => (
    <div className="border border-green-500/30 rounded-lg p-4 hover:border-green-500/60 transition-all duration-300">
      <h3 className="text-yellow-500 text-lg">{title}</h3>
      <p className="text-gray-400">{period} | {team}</p>
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
        {description.map((desc: string, i: number) => (
          <li key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>{desc}</li>
        ))}
      </ul>
      <div className="mt-2">
        <span className="text-yellow-500/70">Technologies:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {tech.map((t: string, i: number) => (
            <span 
              key={i}
              className="px-2 py-1 bg-green-500/10 rounded text-green-400 text-xs animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {github && (
        <a 
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Github size={14} />
          View on GitHub
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'welcome':
        return (
          <div className="text-center">
            <pre className="whitespace-pre-wrap">{typedText}</pre>
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-4">
            <h2 className="text-xl text-center mb-6 animate-fadeIn">Portfolio Navigation</h2>
            <div className="space-y-2">
              {['Contact', 'Skills', 'Education', 'Experience', 'Projects'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentSection(item.toLowerCase() as Section);
                    playSound('click');
                  }}
                  className="w-full p-2 border border-green-500 rounded hover:bg-green-500/20 transition-all text-left animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  &gt; {item}
                </button>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 animate-fadeIn">Contact Information</h2>
            <div className="space-y-3">
              {[
                { icon: <Mail size={16} />, text: 'senthooran.thayaparan.pro@gmail.com' },
                { icon: <Phone size={16} />, text: '07 82 18 26 57' },
                { icon: <MapPin size={16} />, text: 'Noisy-le-Grand' },
                { 
                  icon: <Github size={16} />, 
                  text: 'github.com/xsentoo',
                  link: 'https://github.com/xsentoo'
                },
                { 
                  icon: <Linkedin size={16} />, 
                  text: 'senthooran-thayaparan',
                  link: 'https://linkedin.com/in/senthooran-thayaparan'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-yellow-500">{item.icon}</span>
                  {item.link ? (
                    <a href={item.link} className="text-green-400 hover:underline">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 animate-fadeIn">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Languages', skills: ['Java', 'PHP', 'C#', 'Python', 'JavaScript', 'HTML', 'CSS'] },
                { title: 'Frontend', skills: ['HTML', 'CSS', 'React', 'Angular'] },
                { title: 'Backend', skills: ['Node.js', 'Java', 'PHP', 'C#', 'Python', 'Express', 'API REST'] },
                { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'NoSQL'] },
                { title: 'Tools', skills: ['Linux', 'Git', 'Docker', 'Microsoft Azure'] },
                { title: 'Methods', skills: ['Agile', 'Code Review', 'Documentation'] },
                { title: 'Soft Skills', skills: ['Autonomy', 'Problem Solving', 'Team Work'] }
              ].map((category, index) => (
                <div 
                  key={category.title}
                  className="border border-green-500/30 rounded p-3 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-yellow-500 mb-2">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-green-500/10 rounded text-green-400 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 animate-fadeIn">Education</h2>
            <div className="space-y-4">
              {[
                {
                  school: 'Master Dev Manager Full Stack, EFREI',
                  period: '2025 - 2027'
                },
                {
                  school: 'Bachelor 3 Développement Informatique, YNOV PARIS',
                  period: '2024 - 2025'
                },
                {
                  school: 'BTS SIO SLAM, LYCÉE RENÉ DESCARTES',
                  period: '2022 - 2024',
                  location: 'Champs Sur Marne'
                }
              ].map((edu, index) => (
                <div 
                  key={index}
                  className="border border-green-500/30 p-4 rounded animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-yellow-500">{edu.school}</h3>
                  <p className="text-gray-400">{edu.period}</p>
                  {edu.location && <p className="text-gray-400">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 animate-fadeIn">Work Experience</h2>
            <div className="space-y-6">
              {[
                {
                  company: 'Film by Janar',
                  position: 'Freelance',
                  period: 'January 2025 - Present',
                  details: [
                    'Development of a platform for users to discover company creations',
                    'Implementation of automated notification system for reservations',
                    'Technologies: HTML, CSS, JavaScript (React), Node.js (Express), Firebase'
                  ]
                },
                {
                  company: 'ÖPM',
                  position: 'Athis-Mons',
                  period: 'January 2024 - March 2024',
                  details: [
                    'Design and development of an e-commerce website',
                    'Technologies: HTML, CSS, JavaScript and PHP',
                    'Created user-friendly interface to enhance customer experience',
                    'Development of key features like shopping cart and course list download'
                  ]
                }
              ].map((exp, index) => (
                <div 
                  key={index}
                  className="border border-green-500/30 p-4 rounded animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-yellow-500">{exp.company}</h3>
                  <p className="text-gray-400">{exp.position} | {exp.period}</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            <h2 className="text-xl mb-4 animate-fadeIn">Projects</h2>
            <div className="space-y-6">
              <ProjectCard
                title="FitnessAnim"
                period="October 2024 - 2025"
                team="Team of 4"
                description={[
                  'Gamified mobile app for fitness training',
                  'Performance tracking system with personalized challenges'
                ]}
                tech={['React Native', 'Node.js', 'Express.js', 'Android Studio']}
                github="https://github.com/xsentoo/fitnessanim"
              />
              <ProjectCard
                title="VOTE MY MUSIC"
                period="2024 - 2025"
                team="Personal Project"
                description={[
                  'Platform for users to vote on favorite music',
                  'Feature to add and receive feedback on songs'
                ]}
                tech={['C#', 'Figma']}
                github="https://github.com/xsentoo/vote-my-music"
              />
              <ProjectCard
                title="WEELSONG6"
                period="August 2024 - 2026"
                team="Team of 3"
                description={[
                  'Web platform for Route 66 enthusiasts',
                  'Budget calculator and social network features',
                  'Interactive map showing points of interest'
                ]}
                tech={['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'OpenWeatherMap']}
                github="https://github.com/xsentoo/weelsong6"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (batteryLevel === 0) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 animate-pulse">
        BATTERY DEPLETED - PLEASE CONNECT CHARGER
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black text-green-500 p-6 font-mono text-sm">
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-auto custom-scrollbar">
          <div className={`transition-all duration-300 ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            {renderContent()}
          </div>
        </div>

        {currentSection !== 'welcome' && (
          <div className="mt-4 flex items-center justify-between border-t border-green-500/20 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-32 h-4 bg-black border border-green-500 rounded-sm overflow-hidden">
                <div 
                  className={`h-full transition-all duration-200 ${
                    isCharging ? 'animate-pulse bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <span className="text-xs">
                {batteryLevel}% {isCharging && '⚡'}
              </span>
            </div>

            {currentSection !== 'portfolio' && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleNavigation('prev')}
                  className="w-8 h-8 border border-green-500 rounded flex items-center justify-center hover:bg-green-500/20 transition-colors"
                >
                  <ChevronDown className="rotate-180" size={16} />
                </button>
                <button 
                  onClick={() => handleNavigation('next')}
                  className="w-8 h-8 border border-green-500 rounded flex items-center justify-center hover:bg-green-500/20 transition-colors"
                >
                  <ChevronDown size={16} />
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('portfolio');
                    playSound('click');
                  }}
                  className="px-4 py-1 border border-green-500 rounded hover:bg-green-500/20 transition-colors ml-2"
                >
                  Back to Menu
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-50"></div>
    </div>
  );
};

export default Terminal;