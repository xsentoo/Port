import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface TerminalProps {
  batteryLevel: number;
  setBatteryLevel: React.Dispatch<React.SetStateAction<number>>;
  isCharging: boolean;
}

type Section = 'welcome' | 'portfolio' | 'contact' | 'skills' | 'education' | 'experience' | 'projects';

const Terminal: React.FC<TerminalProps> = ({ batteryLevel, setBatteryLevel, isCharging }) => {
  const { playSound } = useAudio();
  const [currentSection, setCurrentSection] = useState<Section>('welcome');
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sectionColors: Record<Section, string> = {
    welcome: 'text-green-400',
    portfolio: 'text-yellow-400',
    contact: 'text-blue-400',
    skills: 'text-purple-400',
    education: 'text-pink-400',
    experience: 'text-red-400',
    projects: 'text-cyan-400',
  };

  const languageColors: Record<string, string> = {
    Java: 'text-red-500',
    PHP: 'text-purple-600',
    'C#': 'text-blue-600',
    Python: 'text-yellow-400',
    JavaScript: 'text-yellow-300',
    HTML: 'text-orange-500',
    CSS: 'text-blue-400',
    React: 'text-cyan-400',
    Angular: 'text-red-600',
    'Node.js': 'text-green-500',
    Express: 'text-gray-400',
    MySQL: 'text-blue-700',
    PostgreSQL: 'text-blue-800',
    NoSQL: 'text-green-700',
    Linux: 'text-gray-600',
    Git: 'text-red-600',
    Docker: 'text-blue-500',
    Azure: 'text-blue-700',
  };

  const prompt = <span className="text-green-400 font-bold select-none">$ </span>;

  // Typing effect
  const typeText = useCallback(
    (text: string, speed = 40) => {
      setIsTyping(true);
      let i = 0;
      setTypedText('');

      const typing = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typing);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typing);
    },
    []
  );

  useEffect(() => {
    if (currentSection === 'welcome') {
      typeText('Wwelcome to A-013\nInitializing system...\n');
      const timer = setTimeout(() => {
        setShowContent(true);
        playSound('startup');
        setCurrentSection('portfolio');
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
      setTypedText('');
    }
  }, [currentSection, playSound, typeText]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCharging) {
        setBatteryLevel((prev) => Math.max(0, prev - 1));
      } else {
        setBatteryLevel((prev) => Math.min(100, prev + 2));
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [isCharging, setBatteryLevel]);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedText, showContent]);

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

  const colorLang = (langs: string[]) =>
    langs.map((lang, i) => (
      <span key={i} className={languageColors[lang] || 'text-green-300'}>
        {lang}
        {i !== langs.length - 1 ? ', ' : ''}
      </span>
    ));

  const renderContent = () => {
    switch (currentSection) {
      case 'welcome':
        return (
          <pre className={`whitespace-pre-wrap font-mono text-green-400 leading-relaxed`}>
            {typedText}
            <span className={`blinking-cursor`}>█</span>
          </pre>
        );

      case 'portfolio':
        return (
          <>
            <p className="font-mono text-yellow-400 mb-3">{prompt}Select a section below:</p>
            <div className="flex flex-col space-y-2">
              {['Contact', 'Skills', 'Education', 'Experience', 'Projects'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentSection(item.toLowerCase() as Section);
                    playSound('click');
                  }}
                  className="text-yellow-300 font-mono text-left px-3 py-1 rounded hover:bg-yellow-700/30 transition duration-200 border border-yellow-600"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {prompt} {item}
                </button>
              ))}
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <p className={`font-mono mb-2 ${sectionColors['contact']}`}>{prompt}Contact Details:</p>
            <p className="font-mono text-blue-400 pl-4">Name: Thayaparan Senthooran</p>
            <p className="font-mono text-blue-400 pl-4">Location: Noisy-le-Grand</p>
            <p className="font-mono text-blue-400 pl-4">
              Email:{' '}
              <a
                href="mailto:senthooran.thayaparan.pro@gmail.com"
                className="underline hover:text-blue-600 transition"
              >
                senthooran.thayaparan.pro@gmail.com
              </a>
            </p>
            <p className="font-mono text-blue-400 pl-4">Phone: 07 82 18 26 57</p>
            <p className="font-mono text-blue-400 pl-4">
              GitHub:{' '}
              <a
                href="https://github.com/xsentoo"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition"
              >
                github.com/xsentoo
              </a>
            </p>
            <p className="font-mono text-blue-400 pl-4">
              LinkedIn:{' '}
              <a
                href="https://linkedin.com/in/senthooran-thayaparan"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition"
              >
                senthooran-thayaparan
              </a>
            </p>
          </>
        );

      case 'skills':
        return (
          <>
            <p className={`font-mono mb-3 ${sectionColors['skills']}`}>{prompt}Skills Overview:</p>
            <ul className="font-mono list-disc pl-8 space-y-1">
              <li>
                <strong>Languages:</strong> {colorLang(['Java', 'PHP', 'C#', 'Python', 'JavaScript', 'HTML', 'CSS'])}
              </li>
              <li>
                <strong>Frontend:</strong> {colorLang(['HTML', 'CSS', 'React', 'Angular'])}
              </li>
              <li>
                <strong>Backend:</strong> {colorLang(['Node.js', 'Java', 'PHP', 'C#', 'Python', 'Express', 'API REST'])}
              </li>
              <li>
                <strong>Databases:</strong> {colorLang(['MySQL', 'PostgreSQL', 'NoSQL'])}
              </li>
              <li>
                <strong>Tools:</strong> {colorLang(['Linux', 'Git', 'Docker', 'Azure'])}
              </li>
              <li>
                <strong>Methods:</strong> <span className="text-purple-300">Agile, Code Review, Documentation</span>
              </li>
              <li>
                <strong>Soft Skills:</strong>{' '}
                <span className="text-purple-300">Autonomy, Problem Solving, Teamwork</span>
              </li>
            </ul>
          </>
        );

      case 'education':
        return (
          <>
            <p className={`font-mono mb-3 ${sectionColors['education']}`}>{prompt}Education Background:</p>
            <ul className="font-mono list-disc pl-8 space-y-2 text-pink-300">
              <li>
                <strong>Master Dev Manager Full Stack</strong>, EFREI — 2025 – 2027
              </li>
              <li>
                <strong>Bachelor 3 Développement Informatique</strong>, YNOV PARIS — 2024 – 2025
              </li>
              <li>
                <strong>BTS SIO SLAM</strong>, LYCÉE RENÉ DESCARTES Champs Sur Marne — 2022 – 2024
              </li>
            </ul>
          </>
        );

      case 'experience':
        return (
          <>
            <p className={`font-mono mb-3 ${sectionColors['experience']}`}>{prompt}Professional Experience:</p>
            <div className="space-y-5 text-red-400 font-mono pl-6">
              <div>
                <h3 className="font-semibold text-red-300">Film by Janar (Freelance)</h3>
                <p>Jan 2025 – Present</p>
                <ul className="list-disc pl-6">
                  <li>
                    Developed a platform to discover creations, book services and contact the team.
                  </li>
                  <li>Booking management with automated notifications.</li>
                  <li>Technologies: HTML, CSS, JavaScript (React), Node.js (Express), Firebase.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-300">ÖPM, Athis-Mons</h3>
                <p>Jan 2024 – Mar 2024</p>
                <ul className="list-disc pl-6">
                  <li>Evolutionary maintenance of an internal C# application.</li>
                  <li>Contributed to new feature development.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-300">Studio Cheeky, Paris</h3>
                <p>Dec 2023 – Jan 2024</p>
                <ul className="list-disc pl-6">
                  <li>Designed and developed a React app for order tracking.</li>
                </ul>
              </div>
            </div>
          </>
        );

      case 'projects':
        return (
          <>
            <p className={`font-mono mb-3 ${sectionColors['projects']}`}>{prompt}Projects Overview:</p>
            <ul className="font-mono list-disc pl-8 space-y-3 text-cyan-300">
              <li>
                <strong>Gamified Fitness App</strong> — Mobile app where users create avatars that evolve with
                physical performance.
              </li>
              <li>
                <strong>React Portfolio</strong> — Personal portfolio site built with React featuring smooth animations.
              </li>
              <li>
                <strong>CI/CD Pipelines</strong> — Setup continuous integration pipelines with GitLab CI/CD and Jenkins.
              </li>
            </ul>
          </>
        );

      default:
        return null;
    }
  };

  // Get current time for status bar
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  return (
    <div
      className="relative flex flex-col h-full w-full max-w-4xl mx-auto rounded-lg bg-black overflow-hidden"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        letterSpacing: '0.08em',
      }}
    >
      {/* Scanline Animation Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/scanline.png')] opacity-10 animate-scanline" />

      {/* Header with buttons and nav */}
      <div className="flex items-center justify-between p-4 border-b border-green-600 bg-black/80 select-none">
        <div className="flex items-center space-x-3">
          {currentSection !== 'welcome' && (
            <button
              onClick={() => {
                setCurrentSection('welcome');
                setShowContent(false);
                playSound('click');
                setTimeout(() => setShowContent(true), 300);
              }}
              className="text-green-400 hover:text-green-600 font-mono px-4 py-1 border border-green-400 rounded transition duration-200 shadow-[0_0_5px_rgba(0,255,0,0.7)]"
              aria-label="Back to Main"
            >
              &larr; Back to Main
            </button>
          )}

          {currentSection !== 'welcome' && (
            <>
              <button
                onClick={() => handleNavigation('prev')}
                className="p-2 hover:text-yellow-400 transition duration-200"
                aria-label="Précédent"
              >
                <ChevronDown className="rotate-90" size={24} />
              </button>
              <button
                onClick={() => handleNavigation('next')}
                className="p-2 hover:text-yellow-400 transition duration-200"
                aria-label="Suivant"
              >
                <ChevronDown className="-rotate-90" size={24} />
              </button>
            </>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex -center space-x-4 font-mono text-green-400 text-sm select-none">
          <div className="flex items-center space-x-1">
            <span>Batterie:</span>
            <div className="w-24 h-4 border border-green-400 rounded overflow-hidden relative bg-black">
              <div
                className={`h-full bg-green-500 transition-all duration-500`}
                style={{ width: `${batteryLevel}%` }}
              />
              {isCharging && (
                <div className="absolute inset-0 flex justify-center items-center text-green-300 font-bold animate-pulse">
                  ⚡
                </div>
              )}
            </div>
            <span>{batteryLevel}%</span>
          </div>
          
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto bg-black bg-opacity-80 text-green-300 text-sm leading-relaxed font-mono
        scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-black"
        style={{ minHeight: 320 }}
      >
        {showContent ? renderContent() : <p className="text-center text-gray-600">Chargement...</p>}
      </div>

      {/* Footer prompt */}
      <div className="flex items-center p-4 border-t border-green-600 bg-black/90 font-mono text-green-400 select-none">
        {prompt}
        <span className={`blinking-cursor ml-1`}>█</span>
      </div>

      {/* Styles */}
      <style>{`
        .blinking-cursor {
          animation: blink 1.2s step-start infinite;
        }
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          50.1%, 100% {
            opacity: 0;
          }
        }
        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
        .animate-scanline {
          animation: scanline 7s linear infinite;
        }
        .shadow-neon {
          box-shadow:
            0 0 10px #0f0,
            0 0 20px #0f0,
            0 0 40px #0f0,
            inset 0 0 5px #0f0;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
