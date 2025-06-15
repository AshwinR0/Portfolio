import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShoppingCart, MessageCircle, TrendingUp, ExternalLink } from 'lucide-react';

interface ProjectGoalsProps {
  isDarkMode: boolean;
}

const ProjectGoals: React.FC<ProjectGoalsProps> = ({ isDarkMode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  const projects = [
    {
      title: 'Recruitment Platform',
      icon: Users,
      description: 'Full-stack recruiting solution with AI-powered matching',
      tools: ['React', 'Node.js', 'PostgreSQL', 'AI/ML'],
      impact: '+30% hiring efficiency',
      color: 'from-blue-600 to-blue-800',
      link: '#'
    },
    {
      title: 'Auction Application',
      icon: ShoppingCart,
      description: 'Real-time bidding platform with live updates',
      tools: ['React', 'WebSocket', 'MongoDB', 'Express'],
      impact: '1M+ active users',
      color: 'from-purple-600 to-purple-800',
      link: '#'
    },
    {
      title: 'Chatbot Plugin',
      icon: MessageCircle,
      description: 'AI-powered customer support integration',
      tools: ['TypeScript', 'NLP', 'REST API', 'Docker'],
      impact: '25% support reduction',
      color: 'from-green-600 to-green-800',
      link: '#'
    },
    {
      title: 'Prediction Model',
      icon: TrendingUp,
      description: 'Machine learning analytics dashboard',
      tools: ['Python', 'React', 'FastAPI', 'ML'],
      impact: '85% accuracy rate',
      color: 'from-orange-600 to-orange-800',
      link: '#'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project) => {
        if (project) {
          ScrollTrigger.create({
            trigger: project,
            start: 'top 85%',
            onEnter: () => {
              // Goal buildup animation
              const tl = gsap.timeline();
              
              // Ball trajectory (invisible)
              const card = project.querySelector('.project-card');
              const impact = project.querySelector('.impact-badge');
              
              tl.fromTo(card,
                { opacity: 0, y: 100, rotateY: -45, scale: 0.8 },
                { opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 1.2, ease: 'back.out(1.4)' }
              )
              .fromTo(impact,
                { opacity: 0, scale: 0, rotation: -180 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' },
                '-=0.4'
              )
              .to(card, {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
              });

              // Goal celebration effect
              const celebration = project.querySelector('.celebration');
              if (celebration) {
                gsap.fromTo(celebration.children,
                  { opacity: 0, scale: 0, y: 20 },
                  { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    delay: 1,
                    ease: 'back.out(2)'
                  }
                );
              }
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-indigo-950' 
          : 'bg-gradient-to-b from-blue-50 to-indigo-100'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Goal Replays
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Project Highlights & Impact
          </p>
          <div className="flex justify-center mt-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full">
              <span className="text-white font-semibold">⚽ 4 GOALS SCORED</span>
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                ref={el => { if (el) projectRefs.current[index] = el; }}
                className="relative"
              >
                {/* Ball path (invisible helper for animation) */}
                <div className="ball-path absolute inset-0 pointer-events-none" />
                
                {/* Project card */}
                <div className={`project-card bg-gradient-to-br ${project.color} p-6 rounded-3xl shadow-2xl border border-white border-opacity-20 group hover:scale-105 transition-transform duration-300`}>
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <a 
                      href={project.link}
                      className="text-white hover:text-yellow-300 transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-white text-opacity-90 mb-4">{project.description}</p>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map((tool, toolIndex) => (
                      <span 
                        key={toolIndex}
                        className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs text-white font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Impact badge */}
                  <div className="impact-badge bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm inline-block">
                    🎯 {project.impact}
                  </div>
                </div>

                {/* Celebration particles */}
                <div className="celebration absolute -top-4 -right-4 pointer-events-none">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full ml-2" />
                  <div className="w-4 h-4 bg-red-400 rounded-full -ml-1 -mt-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Match statistics */}
        <div className={`mt-16 p-8 rounded-3xl border transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gray-900 border-indigo-400' 
            : 'bg-white border-indigo-500 shadow-xl'
        }`}>
          <h4 className={`text-2xl font-bold text-center mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Match Statistics</h4>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Project Success</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Features Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">1M+</div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Users Impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">45%</div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Performance Gain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGoals;