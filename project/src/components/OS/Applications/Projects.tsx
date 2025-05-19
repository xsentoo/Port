import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "FitnessAnim",
      description: "A gamified mobile application for fitness training, making workouts more interactive and motivating. Includes a performance tracking system with personalized challenges.",
      tech: ["React Native", "Node.js", "Express.js", "Android Studio"],
      period: "October 2024 - 2025",
      team: "Team of 4"
    },
    {
      title: "VOTE MY MUSIC",
      description: "Personal project enabling users to vote for their favorite music and add their own songs for community feedback.",
      tech: ["C#", "Figma"],
      period: "2024 - 2025",
      team: "Personal Project"
    },
    {
      title: "WEELSONG6",
      description: "A web platform for Route 66 enthusiasts featuring a budget calculator, social network for sharing photos and videos, and an interactive map showing points of interest.",
      tech: ["React", "Node.js", "PostgreSQL", "Google Maps API", "OpenWeatherMap"],
      period: "August 2024 - 2026",
      team: "Team of 3"
    }
  ];

  return (
    <div className="font-mono text-sm">
      <h2 className="text-green-400 text-lg mb-4 border-b border-green-800 pb-2">My Projects</h2>
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800/70 p-4 rounded border border-gray-700 hover:border-green-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-yellow-300 font-bold">{project.title}</h3>
              <span className="text-xs text-gray-400">{project.period}</span>
            </div>
            <p className="text-gray-300 mb-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="bg-gray-700 text-xs text-cyan-300 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="text-xs text-gray-400 mt-2">
              {project.team}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;