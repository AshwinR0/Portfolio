import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Code, Database, Settings, Zap, Globe, GitBranch } from 'lucide-react';

const SkillsFormation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  const skills = [
    { name: 'React', icon: Code, level: 95, position: { x: 50, y: 20 } },
    { name: 'TypeScript', icon: Code, level: 90, position: { x: 30, y: 35 } },
    { name: 'JavaScript', icon: Zap, level: 95, position: { x: 70, y: 35 } },
    { name: 'Tailwind', icon: Globe, level: 85, position: { x: 20, y: 55 } },
    { name: 'FastAPI', icon: Settings, level: 80, position: { x: 50, y: 50 } },
    { name: 'Git', icon: GitBranch, level: 90, position: { x: 80, y: 55 } },
    { name: 'PostgreSQL', icon: Database, level: 75, position: { x: 35, y: 75 } },
    { name: 'MongoDB', icon: Database, level: 70, position: { x: 65, y: 75 } }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(skillsRef.current, { opacity: 0, scale: 0, y: 50 });
      
      // Field entrance animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          // Field background animation
          gsap.fromTo(fieldRef.current, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
          );

          // Skills formation animation with motion paths
          skillsRef.current.forEach((skill, index) => {
            if (skill) {
              const delay = index * 0.2;
              
              // Animate skill appearance
              gsap.to(skill, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: delay + 0.5,
                ease: 'back.out(1.7)'
              });

              // Add floating animation
              gsap.to(skill, {
                y: -5,
                duration: 2 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                delay: delay + 1
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
      className="min-h-screen bg-gradient-to-b from-gray-900 to-green-950 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            First Touch
          </h2>
          <p className="text-xl text-green-200">
            Skills & Tools Formation
          </p>
          <div className="w-24 h-1 bg-green-400 mx-auto mt-4" />
        </div>

        {/* Football field */}
        <div 
          ref={fieldRef}
          className="relative bg-gradient-to-b from-green-600 to-green-700 rounded-3xl p-8 shadow-2xl"
          style={{ aspectRatio: '16/10' }}
        >
          {/* Field markings */}
          <div className="absolute inset-4 border-2 border-white border-opacity-40 rounded-xl">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white bg-opacity-40" />
            <div className="absolute left-1/2 top-1/2 w-16 h-16 border-2 border-white border-opacity-40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Skills as players */}
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                ref={el => { if (el) skillsRef.current[index] = el; }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${skill.position.x}%`,
                  top: `${skill.position.y}%`
                }}
              >
                <div className="relative">
                  {/* Player circle */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  
                  {/* Skill level indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-green-900">
                    {Math.floor(skill.level / 10)}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                      {skill.name} - {skill.level}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commentary */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            "A perfectly balanced formation with strong technical abilities across the field. 
            The midfield is controlled by React and TypeScript, while the defense is anchored by 
            reliable database technologies."
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsFormation;