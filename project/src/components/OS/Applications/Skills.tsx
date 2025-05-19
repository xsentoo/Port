import React from 'react';
import { Code, Database, Layout, Server } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout size={18} />,
      color: "text-green-400",
      skills: [
        { name: "HTML/CSS/React/Angular", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "Responsive Design", level: 85 },
        { name: "UI/UX Design", level: 80 }
      ]
    },
    {
      title: "Backend",
      icon: <Server size={18} />,
      color: "text-blue-400",
      skills: [
        { name: "Node.js/Express", level: 85 },
        { name: "Java/PHP/C#/Python", level: 80 },
        { name: "API REST", level: 85 },
        { name: "Firebase", level: 75 }
      ]
    },
    {
      title: "Database & Tools",
      icon: <Database size={18} />,
      color: "text-purple-400",
      skills: [
        { name: "MySQL/PostgreSQL", level: 85 },
        { name: "NoSQL", level: 75 },
        { name: "Git/Docker", level: 80 },
        { name: "Microsoft Azure", level: 70 }
      ]
    },
    {
      title: "Soft Skills",
      icon: <Code size={18} />,
      color: "text-yellow-400",
      skills: [
        { name: "Agile Methodology", level: 85 },
        { name: "Code Review", level: 80 },
        { name: "Documentation", level: 85 },
        { name: "Team Collaboration", level: 90 }
      ]
    }
  ];

  return (
    <div className="font-mono text-sm">
      <h2 className="text-green-400 text-lg mb-4 border-b border-green-800 pb-2">Skills & Expertise</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-gray-800/70 p-4 rounded border border-gray-700">
            <div className={`flex items-center gap-2 mb-3 ${category.color}`}>
              {category.icon}
              <h3 className="font-bold">{category.title}</h3>
            </div>
            
            <div className="space-y-3">
              {category.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400 text-xs">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getColorForCategory(category.title)}`} 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getColorForCategory(category: string): string {
  switch(category) {
    case 'Frontend':
      return 'bg-green-500';
    case 'Backend':
      return 'bg-blue-500';
    case 'Database & Tools':
      return 'bg-purple-500';
    case 'Soft Skills':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
}

export default Skills;