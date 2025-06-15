import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Code, TestTube, Rocket } from 'lucide-react';

interface LockerRoomProps {
  isDarkMode: boolean;
}

const LockerRoom: React.FC<LockerRoomProps> = ({ isDarkMode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chalkboardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  const philosophy = [
    {
      step: 'Plan',
      icon: Target,
      description: 'Strategic thinking and requirement analysis',
      color: 'text-blue-400 border-blue-400'
    },
    {
      step: 'Build',
      icon: Code,
      description: 'Clean, scalable code development',
      color: 'text-green-400 border-green-400'
    },
    {
      step: 'Test',
      icon: TestTube,
      description: 'Comprehensive testing and quality assurance',
      color: 'text-yellow-400 border-yellow-400'
    },
    {
      step: 'Deploy',
      icon: Rocket,
      description: 'Efficient deployment and monitoring',
      color: 'text-red-400 border-red-400'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chalkboard animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(chalkboardRef.current,
            { opacity: 0, rotateY: -45, scale: 0.8 },
            { opacity: 1, rotateY: 0, scale: 1, duration: 1.5, ease: 'back.out(1.4)' }
          );
        }
      });

      // Steps animation with drawing effect
      stepsRef.current.forEach((step, index) => {
        if (step) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            onEnter: () => {
              const tl = gsap.timeline();
              
              // Step card entrance
              tl.fromTo(step,
                { opacity: 0, y: 50, rotateX: 45 },
                { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'back.out(1.4)' }
              );

              // Connect lines drawing effect
              if (index < philosophy.length - 1) {
                const connector = step.parentElement?.querySelector(`[data-connector="${index}"]`);
                if (connector) {
                  tl.fromTo(connector,
                    { scaleX: 0, opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
                    '-=0.3'
                  );
                }
              }
            }
          });
        }
      });

      // Floating animation for philosophy cards
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.to(step, {
            y: -8,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [philosophy.length]);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-indigo-950 to-gray-900' 
          : 'bg-gradient-to-b from-indigo-100 to-blue-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Locker Room
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-indigo-200' : 'text-indigo-700'
          }`}>
            Development Philosophy & Process
          </p>
        </div>

        {/* Chalkboard */}
        <div 
          ref={chalkboardRef}
          className={`p-8 rounded-3xl shadow-2xl border-4 mb-12 transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-gray-100 border-gray-300'
          }`}
          style={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)' 
              : 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
            boxShadow: isDarkMode 
              ? 'inset 0 0 20px rgba(0,0,0,0.5)' 
              : 'inset 0 0 20px rgba(0,0,0,0.1)'
          }}
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Game Plan</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              My development methodology
            </p>
          </div>

          {/* Philosophy steps */}
          <div className="relative">
            {/* Connection lines */}
            {philosophy.slice(0, -1).map((_, index) => (
              <div
                key={`connector-${index}`}
                data-connector={index}
                className={`absolute top-1/2 w-full h-0.5 transform -translate-y-1/2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-transparent via-gray-400 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-gray-500 to-transparent'
                }`}
                style={{
                  left: `${(index + 1) * 25}%`,
                  width: '25%',
                  transformOrigin: 'left center'
                }}
              />
            ))}

            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {philosophy.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={el => { if (el) stepsRef.current[index] = el; }}
                    className={`p-6 rounded-2xl border-2 ${item.color} group hover:scale-105 transition-transform duration-300 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:bg-gray-500 transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-8 h-8 ${item.color.split(' ')[0]}`} />
                      </div>
                      <h4 className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{item.step}</h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Philosophy details */}
        <div className={`p-8 rounded-3xl border transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gray-800 border-indigo-400' 
            : 'bg-white border-indigo-500 shadow-xl'
        }`}>
          <h4 className={`text-2xl font-bold text-center mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Coaching Notes</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="text-lg font-semibold text-indigo-400 mb-3">Technical Excellence</h5>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Clean, maintainable code architecture</li>
                <li>• Performance-first development approach</li>
                <li>• Comprehensive testing strategies</li>
                <li>• Continuous learning and adaptation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-green-400 mb-3">Team Collaboration</h5>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Agile development methodologies</li>
                <li>• Clear communication and documentation</li>
                <li>• Code reviews and knowledge sharing</li>
                <li>• Mentoring and skill development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockerRoom;