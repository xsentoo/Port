import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface TerminalProps {
  batteryLevel: number;
  setBatteryLevel: React.Dispatch<React.SetStateAction<number>>;
  isCharging: boolean;
}

type Section = 'welcome' | 'portfolio' | 'contact' | 'skills' | 'education' | 'experience' | 'projects'| 'aboutme';

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
    aboutme: 'text-orange-400',
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
      typeText('Wwelcome to SenthoOs\nInitializing system...\n');
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
    const sections: Section[] = ['portfolio', 'contact', 'skills', 'education', 'experience', 'projects' , 'aboutme'];
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
        {['Contact', 'Skills', 'Education', 'Experience', 'Projects','About Me'].map((item, index) => (
          <button
            key={item}
            onClick={() => {
              setCurrentSection(item.toLowerCase().replace(' ', '') as Section);
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
          <p className="font-mono text-blue-400 pl-4">
            <strong>Name:</strong> Thayaparan Senthooran
          </p>
          <p className="font-mono text-blue-400 pl-4">
            <strong>Location:</strong> Noisy-le-Grand, Île-de-France, France
          </p>
          <p className="font-mono text-blue-400 pl-4">
            <strong>Email:</strong>{' '}
            <a
              href="mailto:senthooran.thayaparan.pro@gmail.com"
              className="underline hover:text-blue-600 transition"
            >
              senthooran.thayaparan.pro@gmail.com
            </a>
          </p>
          <p className="font-mono text-blue-400 pl-4">
            <strong>Phone:</strong> +33 7 82 18 26 57 (available from 9am to 7pm CET)
          </p>
          <p className="font-mono text-blue-400 pl-4">
            <strong>GitHub:</strong>{' '}
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
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://linkedin.com/in/senthooran-thayaparan"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 transition"
            >
              senthooran-thayaparan
            </a>
          </p>
          <p className="font-mono text-blue-400 pl-4 mt-3">
            <em>Feel free to reach out for collaborations, freelance opportunities, or just to connect!</em>
          </p>
        </>
      );

    case 'skills':
      return (
        <>
          <p className={`font-mono mb-3 ${sectionColors['skills']}`}>{prompt}Skills Overview:</p>
          <ul className="font-mono list-disc pl-8 space-y-2">
            <li>
              <strong>Programming Languages:</strong>{' '}
              {colorLang(['Java', 'PHP', 'C#', 'Python', 'JavaScript', 'HTML', 'CSS'])}
              <br />
              Extensive experience writing clean, maintainable code, including OOP, functional programming, and asynchronous patterns.
            </li>
            <li>
              <strong>Frontend Technologies:</strong>{' '}
              {colorLang(['HTML', 'CSS', 'React', 'Angular'])}
              <br />
              Proficient in building responsive UI/UX, implementing animations, and accessibility best practices.
            </li>
            <li>
              <strong>Backend Technologies:</strong>{' '}
              {colorLang(['Node.js', 'Java', 'PHP', 'C#', 'Python', 'Express', 'API REST'])}
              <br />
              Skilled in RESTful API design, microservices architecture, and server-side application development.
            </li>
            <li>
              <strong>Databases:</strong>{' '}
              {colorLang(['MySQL', 'PostgreSQL', 'NoSQL'])}
              <br />
              Experience with relational and document-based databases, data modeling, and query optimization.
            </li>
            <li>
              <strong>DevOps & Tools:</strong>{' '}
              {colorLang(['Linux', 'Git', 'Docker', 'Azure'])}
              <br />
              Familiar with containerization, version control, cloud deployment, CI/CD pipelines, and infrastructure automation.
            </li>
            <li>
              <strong>Development Methods:</strong>{' '}
              <span className="text-purple-300">Agile methodologies (Scrum), code review, unit/integration testing, documentation</span>
            </li>
            <li>
              <strong>Soft Skills:</strong>{' '}
              <span className="text-purple-300">
                Strong autonomy, effective problem-solving, adaptability, communication, and teamwork.
              </span>
            </li>
          </ul>
        </>
      );

    case 'education':
  return (
    <>
      <p className={`font-mono mb-3 ${sectionColors['education']}`}>{prompt}Education Background:</p>
      <ul className="font-mono list-disc pl-8 space-y-6">
        <li>
          <h3 className="font-semibold text-pink-500">Master Dev Manager Full Stack</h3>
          <p className="text-pink-400 italic mb-1">EFREI — <span className="text-pink-300">2025 – 2027</span></p>
          <p className="text-pink-200">
            Specialized in Full Stack Development, Agile Project Management, Cloud Computing, and DevOps practices.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-pink-600">Bachelor 3 Développement Informatique</h3>
          <p className="text-pink-500 italic mb-1">YNOV PARIS — <span className="text-pink-400">2024 – 2025</span></p>
          <p className="text-pink-300">
            Focused on software development fundamentals, web technologies, and practical projects.
          </p>
        </li>
        <li>
          <h3 className="font-semibold text-pink-700">BTS SIO SLAM</h3>
          <p className="text-pink-600 italic mb-1">LYCÉE RENÉ DESCARTES Champs Sur Marne — <span className="text-pink-500">2022 – 2024</span></p>
          <p className="text-pink-400">
            Training in software solutions development, algorithmics, and application lifecycle management.
          </p>
        </li>
      </ul>
    </>
  );
  case 'aboutme':
  return (
    <>
      <p className={`font-mono mb-3 ${sectionColors['aboutme']}`}>{prompt}About Me:</p>
      <p className="font-mono text-green-300 pl-4">
        Passionate full-stack developer with experience in building scalable web applications, mobile apps, and deploying cloud-native solutions. Enthusiastic about continuous learning and sharing knowledge through collaboration and open-source projects.
      </p>
      <p className="font-mono text-green-300 pl-4 mt-2">
        Skilled in JavaScript, React, Node.js, and DevOps practices such as Docker and CI/CD pipelines. Strong focus on clean code, performance, and user experience.
      </p>
    </>
  );


   case 'experience':
  return (
    <>
      <p className={`font-mono mb-3 text-yellow-500`}>{prompt}Professional Experience:</p>
      <div className="space-y-8 pl-6 font-mono">
        {/* Experience 1 */}
        <div>
          <h3 className="font-semibold text-red-600">Fitness Anim (Freelance)</h3>
          <p className="text-orange-400">2024</p>
          <ul className="list-disc pl-6 text-orange-300">
            <li>Developed a gamified fitness mobile app where users create avatars that evolve based on their physical performance.</li>
            <li>Implemented user profiles, performance tracking, and gamification mechanics to boost engagement.</li>
            <li>Deployed the app on both the Apple App Store and Google Play Store in 2026.</li>
            <li>Technologies used: React Native, Redux, REST API, animations.</li>
          </ul>
        </div>

        {/* Experience 2 */}
        <div>
          <h3 className="font-semibold text-blue-700">Film by Janar (Freelance)</h3>
          <p className="text-blue-400">Jan 2025 – Present</p>
          <ul className="list-disc pl-6 text-blue-300">
            <li>Built a comprehensive web platform for discovering artworks, booking services, and contacting teams.</li>
            <li>Managed booking system with automated notifications and calendar sync.</li>
            <li>Technologies: React, Node.js, Firebase, HTML, CSS, JS.</li>
            <li>Worked closely with client to refine UI/UX for multi-device support.</li>
          </ul>
        </div>

        {/* Experience 3 */}
        <div>
          <h3 className="font-semibold text-green-700">ÖPM, Athis-Mons</h3>
          <p className="text-green-400">Jan 2024 – Mar 2024</p>
          <ul className="list-disc pl-6 text-green-300">
            <li>Designed and developed an e-commerce website.</li>
            <li>Implemented a user-friendly and responsive interface to enhance customer experience.</li>
            <li>Developed key functionalities such as shopping cart and shopping list download.</li>
            <li>Technologies used: HTML, CSS, JavaScript, and PHP.</li>
          </ul>
        </div>

        {/* Experience 4 */}
        
      </div>
    </>
  );


case 'projects':
  return (
    <>
      <p className="font-mono mb-3 text-yellow-500">{prompt}Projects Overview:</p>
      <ul className="font-mono list-disc pl-8 space-y-6">
        <li className="text-red-400">
          <strong>VOTE MY MUSIC | PERSONAL PROJECT</strong> (2024 – 2025)<br />
          <span className="text-orange-300">
            • Developed an application allowing users to vote for their favorite songs, highlighting the most popular ones within the app.<br />
            • Enabled users to add their own songs to gather feedback.<br />
            • Languages and tools used: C# and Figma.
          </span><br />
          <a href="https://github.com/xsentoo/VoteMyMusic" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline">GitHub Repository</a>
        </li>
        <li className="text-blue-400">
          <strong>WEELSON66 | Team Project (3 people)</strong> (Aug 2024 – 2026)<br />
          <span className="text-blue-300">
            • Developed a website for Route 66 enthusiasts.<br />
            • Budget calculator: estimated travel costs.<br />
            • Social network features: sharing photos, videos, and albums.<br />
            • Interactive map displaying stages and points of interest.<br />
            • Technologies used: React, Node.js, PostgreSQL, Google Maps API, and OpenWeatherMap.
          </span><br />
          <a href="https://github.com/xsentoo/WheelsOn66" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">GitHub Repository</a>
        </li>
        <li className="text-green-400">
          <strong>WATERMELON MERGE GAME</strong> (2024)<br />
          <span className="text-green-300">
            • Created a casual merge puzzle game where players combine watermelons to achieve higher scores.<br />
            • Developed using JavaScript with focus on game mechanics and user interaction.<br />
            • Implemented smooth animations and responsive design for web playability.
          </span><br />
          <a href="https://github.com/xsentoo/WatermeloneGame" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">GitHub Repository</a>
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
