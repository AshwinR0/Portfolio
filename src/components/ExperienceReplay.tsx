import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building, Users, Zap, Shield, TestTube } from 'lucide-react';

const ExperienceReplay: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scoreboardRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<HTMLDivElement[]>([]);

  const experiences = [
    {
      company: 'QBurst Technologies',
      role: 'Front-End Developer',
      period: '2022 - Present',
      highlights: [
        { icon: Users, text: 'Built reusable UI components with React + Redux', impact: '+40% dev efficiency' },
        { icon: Zap, text: 'Performance optimizations with lazy loading', impact: '+60% page speed' },
        { icon: Shield, text: 'Chatbot plugin development', impact: '25% drop in support tickets' },
        { icon: TestTube, text: 'Code quality automation with ESLint, Prettier', impact: '90% fewer bugs' }
      ]
    },
    {
      company: 'Cognizant',
      role: 'Software Engineer',
      period: '2020 - 2022',
      highlights: [
        { icon: Building, text: 'Enterprise web applications', impact: '+30% user engagement' },
        { icon: TestTube, text: 'Testing with Vitest', impact: '75% code coverage' },
        { icon: Users, text: 'Cross-functional team collaboration', impact: '50% faster delivery' },
        { icon: Zap, text: 'Performance monitoring & optimization', impact: '+45% load times' }
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scoreboard animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(scoreboardRef.current,
            { opacity: 0, y: -50, rotateX: -90 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'back.out(1.7)' }
          );
        }
      });

      // Experience cards animation
      experienceRefs.current.forEach((card, index) => {
        if (card) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
              // Card entrance
              gsap.fromTo(card,
                { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 45 },
                { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'back.out(1.2)' }
              );

              // Highlight animations
              const highlights = card.querySelectorAll('.highlight-item');
              highlights.forEach((highlight, highlightIndex) => {
                gsap.fromTo(highlight,
                  { opacity: 0, y: 30, scale: 0.8 },
                  { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 0.6, 
                    delay: 0.5 + highlightIndex * 0.2,
                    ease: 'back.out(1.4)'
                  }
                );
              });
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
      className="min-h-screen bg-gradient-to-b from-green-950 to-gray-900 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Scoreboard header */}
        <div 
          ref={scoreboardRef}
          className="bg-gray-900 rounded-2xl p-6 mb-16 shadow-2xl border border-green-400"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Midfield Mastery
            </h2>
            <p className="text-xl text-green-200 mb-4">Professional Experience Highlights</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">4+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience cards */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={el => { if (el) experienceRefs.current[index] = el; }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Company info */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                  <p className="text-green-200 text-lg mb-2">{exp.role}</p>
                  <p className="text-green-300 text-sm">{exp.period}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="lg:w-2/3 grid md:grid-cols-2 gap-4">
                {exp.highlights.map((highlight, highlightIndex) => {
                  const IconComponent = highlight.icon;
                  return (
                    <div
                      key={highlightIndex}
                      className="highlight-item bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-green-400 transition-colors duration-300 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm mb-2">{highlight.text}</p>
                          <div className="text-green-400 text-xs font-semibold">
                            {highlight.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Match commentary */}
        <div className="mt-16 bg-gray-900 p-6 rounded-2xl border border-green-400">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-green-400 mb-2">Match Commentary</h4>
            <p className="text-gray-300 max-w-3xl mx-auto">
              "Outstanding performance in the midfield! The player has shown exceptional 
              technical skills and leadership, consistently delivering results that impact 
              the entire team's performance. A true game-changer in the development arena."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceReplay;